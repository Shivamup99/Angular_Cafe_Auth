import express from 'express'
import { deleteUser, fetchUser, fetchUsers, updateUser } from '../controller/user.js';
import auth from '../services/auth.js';
import checkRoles from '../services/checkRoles.js';

const router = express.Router()

router.get('/users',auth,checkRoles,fetchUsers)
router.get('/users/:id',auth,fetchUser)
router.put('/users',auth,checkRoles,updateUser)
router.delete('/users/:id',auth,deleteUser)

export default router;