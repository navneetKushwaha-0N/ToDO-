
import express from 'express'

import authMiddleware from '../middleware/authMiddleware.js'

import{ getTodos, createTodo, updateTodo, deleteTodo} from '../controller/todoController.js'

const router = express.Router()
router.get('/', getTodos)
router.post('/', authMiddleware, createTodo)
router.put('/:id', authMiddleware ,updateTodo)
router.delete('/:id' ,authMiddleware, deleteTodo )


export default router;