import { useState, useEffect } from 'react'
import axios from 'axios'

// Backend ka URL — ek jagah rakho
const API = `${import.meta.env.VITE_API_URL}/api/todos`

// Auth header — har request ke saath
const headers = { Authorization: 'any-token-123' }

export default function App() {

  // ─── State ────────────────────────────────────
  const [todos, setTodos]   = useState([])   // todos ki list
  const [title, setTitle]   = useState('')   // input box ki value
  const [loading, setLoading] = useState(true) // data aa raha hai?

  // ─── Page load pe todos fetch karo ────────────
  useEffect(() => {
    fetchTodos()
  }, [])  // [] = sirf ek baar — page load pe

  // ─── GET — saare todos lao ────────────────────
  const fetchTodos = async () => {
    try {
      const res = await axios.get(API)
      setTodos(res.data)     // state update — UI refresh
    } catch (err) {
      console.log('Error:', err.message)
    } finally {
      setLoading(false)
    }
  }

  // ─── POST — naya todo banao ───────────────────
  const addTodo = async () => {
    if (!title.trim()) return  // khaali mat bhejo

    try {
      const res = await axios.post(API, { title }, { headers })
      setTodos([res.data, ...todos])  // naya todo list ke upar add
      setTitle('')                    // input box khaali karo
    } catch (err) {
      console.log('Error:', err.message)
    }
  }

  // ─── PUT — done toggle karo ───────────────────
  const toggleDone = async (id, done) => {
    try {
      const res = await axios.put(`${API}/${id}`, { done: !done }, { headers })
      setTodos(todos.map(t => t._id === id ? res.data : t))
    } catch (err) {
      console.log('Error:', err.message)
    }
  }

  // ─── DELETE — todo hatao ──────────────────────
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API}/${id}`, { headers })
      setTodos(todos.filter(t => t._id !== id))  // list se hata do
    } catch (err) {
      console.log('Error:', err.message)
    }
  }

  // ─── UI ───────────────────────────────────────
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📝 Todo App</h1>

      {/* Input box */}
      <div style={styles.inputRow}>
        <input
          style={styles.input}
          placeholder="Kya karna hai?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
        />
        <button style={styles.addBtn} onClick={addTodo}>
          Add
        </button>
      </div>

      {/* Todo list */}
      {loading ? (
        <p style={{ color: '#888' }}>Loading...</p>
      ) : todos.length === 0 ? (
        <p style={{ color: '#888' }}>Koi todo nahi hai — add karo!</p>
      ) : (
        todos.map(todo => (
          <div key={todo._id} style={styles.todoCard}>

            {/* Title */}
            <span style={{
              ...styles.todoTitle,
              textDecoration: todo.done ? 'line-through' : 'none',
              color: todo.done ? '#888' : '#000'
            }}>
              {todo.title}
            </span>

            {/* Buttons */}
            <div style={styles.btnRow}>
              <button
                style={todo.done ? styles.undoBtn : styles.doneBtn}
                onClick={() => toggleDone(todo._id, todo.done)}
              >
                {todo.done ? 'Undo' : 'Done'}
              </button>
              <button
                style={styles.delBtn}
                onClick={() => deleteTodo(todo._id)}
              >
                Delete
              </button>
            </div>

          </div>
        ))
      )}
    </div>
  )
}

// ─── Styles ───────────────────────────────────────
const styles = {
  container: {
    maxWidth: '500px', margin: '40px auto',
    padding: '0 20px', fontFamily: 'sans-serif'
  },
  heading: { fontSize: '24px', marginBottom: '20px' },
  inputRow: { display: 'flex', gap: '10px', marginBottom: '20px' },
  input: {
    flex: 1, padding: '10px 14px', fontSize: '14px',
    border: '1px solid #ddd', borderRadius: '8px', outline: 'none'
  },
  addBtn: {
    padding: '10px 20px', background: '#3b82f6',
    color: '#fff', border: 'none', borderRadius: '8px',
    fontSize: '14px', cursor: 'pointer'
  },
  todoCard: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '12px 16px', border: '1px solid #eee',
    borderRadius: '8px', marginBottom: '8px'
  },
  todoTitle: { fontSize: '14px', flex: 1 },
  btnRow: { display: 'flex', gap: '8px' },
  doneBtn: {
    padding: '6px 12px', background: '#22c55e',
    color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer'
  },
  undoBtn: {
    padding: '6px 12px', background: '#f59e0b',
    color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer'
  },
  delBtn: {
    padding: '6px 12px', background: '#ef4444',
    color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer'
  }
}