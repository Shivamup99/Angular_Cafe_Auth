import express from 'express'
import { createProduct, deleteProduct, fetchAproduct, fetchCatproduct, fetchProduct, updateProduct, updateStatus } from '../controller/products.js'
import auth from '../services/auth.js'
import checkRoles from '../services/checkRoles.js'

const router = express.Router()

router.get('/products',fetchProduct)
router.post('/products',auth,checkRoles,createProduct)
router.get('/products/:id',fetchAproduct)
router.get('/products/cat/:id',auth,fetchCatproduct)
router.put('/products',auth,checkRoles,updateProduct)
router.delete('/products/:id',auth,checkRoles,deleteProduct)
router.patch('/products',auth,checkRoles,updateStatus)

export default router