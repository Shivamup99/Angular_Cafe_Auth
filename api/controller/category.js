import db from "../connection/db.js"

export const createCategory = (req,res)=>{
    const q = 'select * from category where name=?'
    db.query(q,[req.body.name],(err,data)=>{
        if(!err) {
            if(data.length<=0){
                const q = 'insert into category (name) values (?)'
                db.query(q,[req.body.name],(err,result)=>{
                    if(!err){
                        res.status(200).json({message:'category created successfully'})
                    } else{
                        res.status(500).json(err)
                    }
                })
            } else{
                res.status(400).json({message:'category allready exist'})
            }
    } else{
        res.status(500).json(err)
    }
    
  })
}

export const fetchCategory = (req,res)=>{
    const q = 'select * from category order by name'
    db.query(q,(err,data)=>{
        if(!err){
            res.status(200).json(data)
        } else{
            res.status(400).json(err)
        }
    })
}

export const updateCategory = (req,res)=>{
    const q = 'update category set name=? where id=?'
    db.query(q,[req.body.name,req.body.id],(err,data)=>{
        if(!err){
            if(data.affectedRows===0){
                res.status(404).json({message:'category id does not exist'})
            }
            return res.status(200).json({message:'category updated successfully'})
        } else{
            res.status(500).json(err)
        }
    })
}