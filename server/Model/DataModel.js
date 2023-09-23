const mongoose=require('mongoose');

const eventSchema = new mongoose.Schema({
    startTime:{ type:String},
    endTime: { type:String},
    subject: { type:String},
});

// const scheduleSchema=new mongoose.Schema({
//     day:{ type:String},
//     tasks:[eventSchema]
// });
const TableSchema=new mongoose.Schema({
    Sun:{
        type:[eventSchema],
        default:[]
    },
    Mon:{
        type:[eventSchema],
        default:[]
    },
    Tue:{
        type:[eventSchema],
        default:[]
    },
    Wed:{
        type:[eventSchema],
        default:[]
    },
    Thurs:{
        type:[eventSchema],
        default:[]
    },
    Fri:{
        type:[eventSchema],
        default:[]
    },
    Sat:{
        type:[eventSchema],
        default:[]
    }
});
// const Schedule=mongoose.model("Schedule",scheduleSchema);

// module.exports= Schedule;
const Table=mongoose.model("Table",TableSchema);

module.exports= Table;