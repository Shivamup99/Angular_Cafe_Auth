function checkRoles(req,res,next){
  if(res.locals.role==='user'){
    res.sendStatus(401)
  } else{
    next()
  }
}

export default checkRoles