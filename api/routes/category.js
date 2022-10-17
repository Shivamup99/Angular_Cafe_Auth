import express from 'express'
import { createCategory, fetchCategory, updateCategory } from '../controller/category.js'
import auth from '../services/auth.js'
import checkRoles from '../services/checkRoles.js'

const router = express.Router()

router.post('/category',auth,checkRoles,createCategory)
router.get('/category',auth,checkRoles,fetchCategory)
router.put('/category',auth,checkRoles,updateCategory)

export default router