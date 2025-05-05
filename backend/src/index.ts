import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = new Hono()

// Apply CORS middleware
app.use('*', cors())

// Root route
app.get('/', (c) => {
  return c.text('Todo API Server')
})

// GET - Read all todos
app.get('/todo', async (c) => {
  try {
    const todos = await prisma.todo.findMany()
    return c.json(todos)
  } catch (error) {
    console.error('Error fetching todos:', error)
    return c.json({ error: 'Failed to fetch todos' }, 500)
  }
})

// GET - Read a single todo by ID
app.get('/todo/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const todo = await prisma.todo.findUnique({
      where: { id: Number(id) }
    })
    
    if (!todo) {
      return c.json({ error: 'Todo not found' }, 404)
    }
    
    return c.json(todo)
  } catch (error) {
    console.error('Error fetching todo:', error)
    return c.json({ error: 'Failed to fetch todo' }, 500)
  }
})

// POST - Create a new todo
app.post('/todo', async (c) => {
  try {
    const body = await c.req.json()
    
    if (!body.title) {
      return c.json({ error: 'Title is required' }, 400)
    }
    
    const newTodo = await prisma.todo.create({
      data: {
        title: body.title
      }
    })
    
    return c.json(newTodo, 201)
  } catch (error) {
    console.error('Error creating todo:', error)
    return c.json({ error: 'Failed to create todo' }, 500)
  }
})


// app.put('/todo/:id', async (c) => {
//   try {
//     const id = c.req.param('id')
//     const body = await c.req.json()
    
//     // Check if todo exists
//     const existingTodo = await prisma.todo.findUnique({
//       where: { id: Number(id) }
//     })
    
//     if (!existingTodo) {
//       return c.json({ error: 'Todo not found' }, 404)
//     }
    
//     const updatedTodo = await prisma.todo.update({
//       where: { id: Number(id) },
//       data: {
//         title: body.title !== undefined ? body.title : existingTodo.title,
//         completed: body.completed !== undefined ? body.completed : existingTodo.completed,
//         description: body.description !== undefined ? body.description : existingTodo.description
//       }
//     })
    
//     return c.json(updatedTodo)
//   } catch (error) {
//     console.error('Error updating todo:', error)
//     return c.json({ error: 'Failed to update todo' }, 500)
//   }
// })

app.patch('/update/todo/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json()

    const updatedTodo = await prisma.todo.update({
      where: { id: Number(id) },
      data: {
        title: body.title,
        completed: body.true
      }
    })

    return c.json(updatedTodo)
  } catch (error) {
    console.error('Error updating todo:', error)
    return c.json({ error: 'Failed to update todo' }, 500)
  }
})


//DELETE - Delete a todo
app.delete('/todo/:id', async (c) => {
  try {
    const id = c.req.param('id')
    
    // Check if todo exists
    const existingTodo = await prisma.todo.findUnique({
      where: { id: Number(id) }
    })
    
    if (!existingTodo) {
      return c.json({ error: 'Todo not found' }, 404)
    }
    
    await prisma.todo.delete({
      where: { id: Number(id) }
    })
    
    return c.json({ message: 'Todo deleted successfully' })
  } catch (error) {
    console.error('Error deleting todo:', error)
    return c.json({ error: 'Failed to delete todo' }, 500)
  }
})

serve({
  fetch: app.fetch,
  port: 8000
}, (info) => {
  console.log(`Todo API Server is running on http://localhost:${info.port}`)
})