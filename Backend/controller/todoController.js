import Todo from '../model/dbModel.js'

// GET
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 })
    res.json(todos)
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
}

// POST
const createTodo = async (req, res) => {
  try {
    const { title } = req.body
    if (!title) {
      return res.status(400).json({ msg: 'Title bhejo bhai' })
    }
    const todo = await Todo.create({ title })
    res.status(201).json(todo)
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
}

// PUT
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params
    const todo = await Todo.findByIdAndUpdate(id, { ...req.body }, { returnDocument: 'after' })
    if (!todo) {
      return res.status(404).json({ msg: 'Todo mila hi nahi' })
    }
    res.json(todo)
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
}

// DELETE
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params
    const todo = await Todo.findByIdAndDelete(id)
    if (!todo) {
      return res.status(404).json({ msg: 'Todo mila hi nahi' })
    }
    res.json({ msg: `"${todo.title}" delete ho gaya` })
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
}

export { getTodos, createTodo, updateTodo, deleteTodo }