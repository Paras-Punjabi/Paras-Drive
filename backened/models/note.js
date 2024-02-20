const Note = {
    user:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }, 
    date:{
        type:String,
        default:new Date()
    }
}

