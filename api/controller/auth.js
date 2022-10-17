import db from '../connection/db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

export const register = async(req,res)=>{
   const q="select * from users where email=?"
    db.query(q,[req.body.email],(err,data)=>{
        if(!err){
            if(data.length<=0){
                let salt = bcrypt.genSaltSync(10)
                let hash = bcrypt.hashSync(req.body.password,salt)

               const q="insert into users(name,email,contact,password,status,role) values (?,?,?,?,'false','user')"
                db.query(q,[req.body.name,req.body.email,req.body.contact,hash],(err,result)=>{
                    if(!err){
                        res.status(200).json({message:'user registerd successfully'})
                    } else{
                        res.status(500).json(err)
                    }
                })
            } else{
                res.status(400).json({message:'email already exist'})
            }
        } else{
           res.status(500).json(err)
        }
    })
}

export const login =async(req,res)=>{
    const q = 'select * from users where email =?';
    db.query(q,[req.body.email],(err,data)=>{
        const isPasswordCheck = bcrypt.compareSync(req.body.password , data[0].password);
        if(err){
            res.status(500).json({message:'something went wrong try after some time'})
           
            } else{
                if(data.length===0){
                    res.status(401).json({message:'Incorrect user detail'})
                } else if(!isPasswordCheck){
                    res.status(400).json({message:'wrong username or password'})
                } else if(data[0].status==='false'){
                    res.status(401).json({message:'wait for Admin approval'})
                } else if(isPasswordCheck){
                    const response = {email:data[0].email,role:data[0].role}
                    const accessToken = jwt.sign(response,process.env.SECRET_KEY,{expiresIn:'3d'})
                    res.status(200).json({token:accessToken,message:'logedin successfully'})
            }
        }
    })
}

export const changePassword =(req,res)=>{
    const user = req.body
    const email = res.locals.email

    console.log(email)
    const q = 'select * from users where email=? and password=?'
    
    db.query(q,[email,user.oldPassword],(err,result)=>{
        console.log(result)
        const salt = bcrypt.genSaltSync(10)
        const hased = bcrypt.hashSync(user.newPassword,salt)
        const checkPass = bcrypt.compareSync(user.oldPassword , result[0].password)
        if(!err){
            if(result.length <=0 ){
                res.status(400).json({message:'Inncorrect old password'})
            } else if(checkPass){
                var q= "update users set password=? where email=?"
                db.query(q,[hased,email],(err,result)=>{
                    if(!err){
                        res.status(200).json({message:'Password updated successfully'})
                    } else{
                        res.status(500).json(err)
                    }
                })
            }
        } else{
            res.status(500).json({message:'somthing went wrong try again'})
        }
    })
}

export const checkToken=(req,res)=>{
    res.status(200).json({message:'true'})
} 

// emplement to send mail

var transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
})

export const forgetPassword = (req,res)=>{
    const q = 'select email , password from users where email=?'
    db.query(q,[req.body.email],(err,data)=>{
        if(!err){
            if(data.length===0){
                res.status(200).json({message:'password sent successfully to your email'})
            } else{
                var mailOptions = {
                    from: process.env.EMAIL,
                    to: data[0].email,
                    subject:'Password by Cafe Management System',
                    html:'<p><b>Your Login details for Cafe Management System </b>'+data[0].email+'<br><b>Password: </b>'+data[0].password+'<br><a href="http://localhost:4200/">Click here to reset password</a></p>'
                };
                transporter.sendMail(mailOptions,function(err,info){
                    if(err){
                        console.log(err)
                    } else{
                        console.log('Email sent:' + info.response)
                    }
                });

                res.status(200).json({message:'password sent successfully to your email'})
            }
        } else{
            res.status(500).json(err)
        }
    })
}