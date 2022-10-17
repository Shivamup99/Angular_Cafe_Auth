import db from "../connection/db.js"
export const fetchUsers =(req,res)=>{
    const q = 'select id,name,email,contact,status from users where role="user"'
    db.query(q,(err,data)=>{
        if(!err){
            res.status(200).json(data)
        } else{
            res.status(500).json(err)
        }
    })
}

export const fetchUser = (req,res)=>{

}

export const updateUser = (req,res)=>{
    const q = 'update users set status=? where id=?'
    db.query(q,[req.body.status,req.body.id],(err,data)=>{
        if(!err){
            if(data.affectedRows===0){
                res.status(404).json({message:'User id does not exist'})
            }
            return res.status(200).json({message:'User updated successfully'})
        } else{
            res.status(500).json(err)
        }
    })
}





export const deleteUser = (req,res)=>{

}