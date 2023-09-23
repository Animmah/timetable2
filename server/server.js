const express=require('express');
const mongoose=require('mongoose');
const Schedule=require('./Model/DataModel');
const cors=require('cors');
const app = express();
require('dotenv').config();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }));
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>console.log("Connected to DB"))
  .catch((err)=>console.log(err));  

app.get("/",async (req,res)=>{
    try{
        const data=await Schedule.find();
        res.json(data[0]);
    }
    catch(err){
        res.send(500).json({err: 'failed to fetch'});
    }
});
app.post("/",async (req,res)=>{
    try{
        const Day=req.body.day;
        const task={
            startTime:req.body.startTime+' '+req.body.startAM,
            endTime:req.body.endTime+' '+req.body.endAM,
            subject:req.body.subject
        };
        const schedule= await Schedule.findOne({});
        // if(!schedule){
        //     const newData={
        //         day:Day,
        //         tasks:[task]
        //     }
        //     const newS = await Schedule.create(newData);
        // }
        console.log(Day);
        schedule[Day].push(task);
        schedule[Day].sort((task1, task2) => {
            const startTime1 = new Date('1970-01-01 ' + task1.startTime);
            const startTime2 = new Date('1970-01-01 ' + task2.startTime);

            return startTime1 - startTime2;
        });
        await schedule.save();
        res.status(201).json({message:"done"});
    }
    catch(err){
        res.status(500).json({err:'failed to push'});
    }
});
app.post("/delete",async(req,res)=>{
    console.log("reaached");
    try{
        const {day,index}=req.body;
        const schedule= await Schedule.findOne({});
        
        schedule[day].splice(index,1);
        await schedule.save();
        res.status(201).json({message:'deleted'});
    }
    catch(err){
        res.status(500).json({err:'cannot delete'});
    }
});
app.listen(4000,()=>{
    console.log("Yosh!");
});