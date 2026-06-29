const multer=require("multer")
const storage=multer.diskStorage({
    destination:function(req,file,cb){//destination is paalce where file is stored
        cb(null,"Uploads/")
    },
    filename:function(req,file,cb){//name of file
        cb(null,file.fieldname+'-'+Date.now())
    }
})
const upload=multer({storage:storage})
module.exports=upload