import jwt from 'jsonwebtoken'

function auth(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token===null){
        return res.status(401).json({message:'you are not authenticated'})
    }

    jwt.verify(token,process.env.SECRET_KEY,(err,data)=>{
        if(err) return res.status(403).json({message:'you are not authorized'})
        res.locals = data
        next()
    })
}

export default auth