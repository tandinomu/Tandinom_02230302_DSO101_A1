"use client";

import { useState, useEffect } from 'react';
import SimpleTodoItem from '@/components/SimpleTodoItem';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  description?: string; // Optional field to match your API schema
}

// API base URL - change this to match your backend URL
const API_URL = 'http://localhost:8000';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch todos from API
  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/todo`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      
      const data = await response.json();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Error loading todos. Please try again later.');
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchTodos();
  }, []);

  // Add a new todo
  const addTodo = async () => {
    if (!newTask.trim()) return;
    
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/todo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTask }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add todo');
      }
      
      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
      setNewTask('');
      setError(null);
    } catch (err) {
      setError('Error adding task. Please try again.');
      console.error('Add todo error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a todo
  const deleteTodo = async (id: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/todo/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
      
      setTodos(todos.filter(todo => todo.id !== id));
      setError(null);
    } catch (err) {
      setError('Error deleting task. Please try again.');
      console.error('Delete todo error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle todo completion status
  const toggleTodo = async (id: number) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (!todoToUpdate) return;
      
      setIsLoading(true);
      const response = await fetch(`${API_URL}/todo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...todoToUpdate,
          completed: !todoToUpdate.completed
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
      
      const updatedTodo = await response.json();
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
      setError(null);
    } catch (err) {
      setError('Error updating task. Please try again.');
      console.error('Toggle todo error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Edit todo title
  const editTodo = async (id: number, title: string) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (!todoToUpdate) return;
      
      setIsLoading(true);
      const response = await fetch(`${API_URL}/todo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...todoToUpdate,
          title: title
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
      
      const updatedTodo = await response.json();
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
      setError(null);
    } catch (err) {
      setError('Error updating task. Please try again.');
      console.error('Edit todo error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div>
      <header className="header">
        <h1 className="todo-title">ToDo App</h1>
      </header>
      
      <div className="todo-container">
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Eat Lunch"
            className="task-input"
            disabled={isLoading}
          />
          <button 
            onClick={addTodo} 
            className="add-button"
            disabled={isLoading || !newTask.trim()}
          >
            {isLoading ? 'Loading...' : 'Add Task'}
          </button>
        </div>
        
        {error && (
          <div className="error-message mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <div className="task-table">
          <div className="table-header">
            <div>#</div>
            <div>Tasks</div>
            <div>Status</div>
            <div>Actions</div>
          </div>
          
          {isLoading && todos.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              Loading tasks...
            </div>
          ) : (
            <>
              {todos.map((todo, index) => (
                <SimpleTodoItem 
                  key={todo.id}
                  todo={todo}
                  index={index}
                  onDelete={deleteTodo}
                  onToggle={toggleTodo}
                  onEdit={editTodo}
                />
              ))}
              
              {todos.length === 0 && (
                <div className="p-4 text-center text-gray-500">
                  No tasks yet. Add your first task above!
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}