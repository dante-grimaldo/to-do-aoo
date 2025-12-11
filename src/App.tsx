import { useState, useEffect } from 'react' 
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react' // Importar Iconos, lucide es una libreria de svgs

// Define the Todo interface
interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

// Define filter types
type FilterType = 'all' | 'active' | 'completed'

function App() {
  const [todos, setTodos] = useState<Todo[]>([]) //Holds all the todos in the localStorage. Find it in the applications tab in the console.
  const [newTodo, setNewTodo] = useState('') // Child of the above, holds the current todo you're writing
  const [filter, setFilter] = useState<FilterType>('all') //Manages the filter logic
  const [editingId, setEditingId] = useState<string | null>(null)//Grabs the correct note when hitting the edit button
  const [editText, setEditText] = useState('') //Edit function in itself, it holds the new text we will assign to the to-do

  // Load todos from localStorage on component mount = when it runs for the first time
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }))
        setTodos(parsedTodos)
      } catch (error) {
        console.error('Error parsing saved todos:', error)
      }
    }
  }, [])

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  // Generate unique ID
  const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2)

  // Add new todo
  const addTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim() === '') return

    const todo: Todo = {
      id: generateId(),
      text: newTodo.trim(),
      completed: false,
      createdAt: new Date()
    }

    setTodos(prev => [todo, ...prev])
    setNewTodo('')
  }

  // Toggle todo completion
  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const toggleTodo = ('Necesitamos el ID del todo k ya fue, y va a ser en string') => {
      'Vamos a cambiarle algo al pedo'(
        de lo que ya teniamos, o prev ( 'vamos a agarrar cada cosa' =>
          'si la cosa que andamos checando ahorita' == 'es igual que el ID del k ya fue'
      )





    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  // Delete todo
  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  // Start editing
  const startEditing = (id: string, currentText: string) => {
    setEditingId(id)
    setEditText(currentText)
  }

  // Save edit
  const saveEdit = () => {
    if (editingId && editText.trim() !== '') {
      setTodos(prev => prev.map(todo => 
        todo.id === editingId ? { ...todo, text: editText.trim() } : todo
      ))
    }
    setEditingId(null)
    setEditText('')
  }

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  // Clear all completed todos
  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed))
  }

  // Get filtered todos
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed
      case 'completed':
        return todo.completed
      default:
        return true
    }
  })

  // Get counts
  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.filter(todo => todo.completed).length

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Todo App</h1>
          <p className="text-gray-600">Stay organized and get things done</p>
        </div>

        {/* Add Todo Form */}
        <form onSubmit={addTodo} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-2 mb-6">
          {(['all', 'active', 'completed'] as FilterType[]).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                filter === filterType
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {filterType}
            </button>
          ))}
        </div>

        {/* Todo List */}
        {filteredTodos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {todos.length === 0 ? 'No todos yet. Add one above!' : 'No todos match this filter.'}
            </p>
          </div>
        ) : (
          <div className="space-y-2 mb-6">
            {filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-3 hover:shadow-sm transition-shadow"
              >
                {/* Checkbox */}
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    todo.completed
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300 hover:border-green-400'
                  }`}
                >
                  {todo.completed && <Check className="w-3 h-3" />}
                </button>

                {/* Todo Text */}
                <div className="flex-1">
                  {editingId === todo.id ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveEdit()
                          if (e.key === 'Escape') cancelEdit()
                        }}
                        className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                      <button
                        onClick={saveEdit}
                        className="p-1 text-green-600 hover:text-green-700"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="p-1 text-gray-600 hover:text-gray-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <span
                      onClick={() => startEditing(todo.id, todo.text)}
                      className={`cursor-pointer ${
                        todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
                      }`}
                    >
                      {todo.text}
                    </span>
                  )}
                </div>

                {/* Edit Button (only show when not editing) */}
                {editingId !== todo.id && (
                  <button
                    onClick={() => startEditing(todo.id, todo.text)}
                    className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                )}

                {/* Delete Button */}
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Footer with counts and clear button */}
        {todos.length > 0 && (
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div className="flex gap-4">
              <span>{activeCount} active</span>
              <span>{completedCount} completed</span>
            </div>
            {completedCount > 0 && (
              <button
                onClick={clearCompleted}
                className="text-red-600 hover:text-red-700 transition-colors"
              >
                Clear completed
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App