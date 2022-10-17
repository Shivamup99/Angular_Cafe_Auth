import express from 'express'
import { changePassword, checkToken, forgetPassword, login, register } from '../controller/auth.js'
import auth from '../services/auth.js';

const router = express.Router()

router.post('/auth/register',register);
router.post('/auth/login',login)
router.post('/auth/forgetPassword',forgetPassword)
router.get('/auth/checkToken',auth,checkToken)
router.post('/auth/changePassword',auth,changePassword)
export default router