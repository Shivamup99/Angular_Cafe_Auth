import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

var db = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASENAME
})

db.connect((err)=>{
    if(err){
        console.log(err)
    } else{
        console.log('Connected')
    }
})

export default db;