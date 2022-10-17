import express from 'express'
import { dashDetails } from '../controller/dashboard.js'
import auth from '../services/auth.js'

const router = express.Router()

router.get('/dashboard',auth,dashDetails)

export default router