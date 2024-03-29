const FileSchema = {
    user:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    mimetype:{
        type:String
    },
    buffer:{
        type:Buffer,
        required:true
    },
    size:{
        type:Number,
        required:true
    }
}