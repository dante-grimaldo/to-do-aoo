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
                <button
                  onClick={() => togglePin(todo.id)}>
                    
                  {todo.pin !== true && (
                   <Pin className="w-3 h-3" />
                  
                )}
                {todo.pin === true && (
                   <PinOff className="w-3 h-3" />
                  
                )}

                </button>

                {/* Todo Text */}
                <div className="flex-1">
                  {editingId === todo.id ? (
                    <div className="flex gap-2">
                      <input
                        type="text" // Type:
                        value={editText} // Matches it to the hook and tells react this is no normal input, its the goddam edittext
                        onChange={(e) => setEditText(e.target.value)} //capture keystrokes
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