const mongoose=require('mongoose');
const attechedScheme=new mongoose.Schema(
    {
        name:{
            type:String,
            requirde:true,
            trim:true
        },
        email:{
            type:String,
            requirde:true,
            trim:true
        },
        registeredAi:{
            type:Date,
            dafault:Date.now
        }
    }
);
const eventSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            requirde:true,
            trim:true
        },
        description:{
            type:String,
            requirde:true,
            trim:true
        },
        location:{
            type:String,
            requirde:true,
            trim:true
        },
        date:{
           type:Date,
            requirde:true,
        },
        attendees:[attechedScheme]
    },
    {
        timestamps:true
    }
);
const Event=mongoose.model('Event',eventSchema)
module.exports=Event;
                                            


















