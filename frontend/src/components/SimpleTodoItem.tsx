"use client";

import { useState } from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  index: number;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit: (id: number, title: string) => void;
}

const SimpleTodoItem: React.FC<TodoItemProps> = ({ todo, index, onDelete, onToggle, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleEdit = () => {
    if (!editTitle.trim()) return;
    onEdit(todo.id, editTitle);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  return (
    <div className="task-row">
      <div>{index + 1}</div>
      
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            autoFocus
          />
        </div>
      ) : (
        <div className={todo.completed ? 'completed' : ''}>
          {todo.title}
        </div>
      )}
      
      <div>
        <div className="checkbox-container">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="checkbox-input"
          />
          {todo.completed ? 'Done' : 'Pending'}
        </div>
      </div>
      
      <div>
        {isEditing ? (
          <>
            <button onClick={handleEdit} className="action-button">
              Save
            </button>
            <button onClick={handleCancel} className="action-button">
              Cancel
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => setIsEditing(true)} 
              className="action-button"
              title="Edit task"
            >
              ✎
            </button>
            <button 
              onClick={() => onDelete(todo.id)} 
              className="action-button"
              title="Delete task"
            >
              ✗
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SimpleTodoItem;