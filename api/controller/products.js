import db from "../connection/db.js"

export const createProduct =(req,res)=>{
      const q = "INSERT INTO posts (`title`,`categoryid`,`desc`,`price`,`status`) VALUES (?,'true')";
      const values =[
          req.body.title,
          req.body.categoryid,
          req.body.desc,
          req.body.price
      ]
      db.query(q,[values],(err,data)=>{
          if(err) return res.status(500).json(err)
          return res.status(200).json('post has been created')
      })
  
     }

export const fetchProduct =(req,res)=>{
    const q = 'select p.id,p.title,p.desc,p.price,p.status,c.id as categoryid,c.name as categoryName from posts as p INNER JOIN category as c where p.categoryid=c.id';
    db.query(q,(err,data)=>{
        if(!err){
            res.status(200).json(data)
        } else{
            res.status(500).json(err)
        }
    })
}

export const fetchAproduct =(req,res)=>{
    const id = req.params.id 
    const q = "select * from posts where id = ?"
    db.query(q,[id],(err,data)=>{
        if(!err){
            res.status(200).json(data[0])
        } else{
            res.status(500).json(err)
        }
    })
}

export const fetchCatproduct =(req,res)=>{
    const id = req.params.id // this id is category id
    const q = "select id,title from posts where categoryid=? and status='true'"
    db.query(q,[id],(err,data)=>{
        if(!err){
            res.status(200).json(data)
        } else{
            res.status(500).json(err)
        }
    })
}

export const updateProduct =(req,res)=>{
    const q = 'update posts set `title`=?,`categoryid`=?,`desc`=?,`price`=? where `id`=?'
    db.query(q,[req.body.title,req.body.categoryid,req.body.desc,req.body.price,req.body.id],(err,data)=>{
        if(!err){
            if(data.affectedRows===0){
                res.status(401).json({message:'product not found'})
            } else{
                res.status(200).json({message:'product updated successfully'})
            }
        } else{
            res.status(500).json(err)
        }
    })
}

export const deleteProduct =(req,res)=>{
    const q = 'delete from posts where id=?'
    db.query(q,[req.params.id],(err,data)=>{
        if(!err){
            if(data.affectedRows===0){
                res.status(401).json({message:'product not found'})
            } else{
                res.status(200).json({message:'product deleted successfully'})
            }
        } else{
            res.status(500).json(err)
        }
    })
}

export const updateStatus = (req,res)=>{
    const q = 'update posts set status=? where id=?'
    db.query(q,[req.body.status,req.body.id],(err,data)=>{
        if(!err){
            if(data.affectedRows===0){
                res.status(404).json({message:'product id does not exist'})
            }
            return res.status(200).json({message:'product status updated successfully'})
        } else{
            res.status(500).json(err)
        }
    })
}