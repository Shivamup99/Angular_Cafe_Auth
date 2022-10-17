import express from 'express'
const PORT = process.env.PORT || 8080
import cors from 'cors'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import categoryRouter from './routes/category.js'
import productRouter from './routes/products.js'
import dashboard from './routes/dashboard.js'
const app = express()
app.use(express.json())
app.use(cors())
app.use('/api',authRouter)
app.use('/api',userRouter)
app.use('/api',categoryRouter)
app.use('/api',productRouter)
app.use('/api',dashboard)

app.listen(PORT,()=>{
    console.log('Cnected')
})