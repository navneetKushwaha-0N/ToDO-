import mongoose from 'mongoose'

const toDoSchema = new mongoose.Schema({

    title :{
        type : String,
        required: [ true, "Zaruri hai Janab" ],
        trim : true
    },

    done: {
        type : Boolean,
        default : false
    }

    },
    { timestamp : true}

)

export default mongoose.model('ToDo',  toDoSchema)