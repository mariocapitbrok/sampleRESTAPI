// app.js
const express = require("express")
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()
const app = express()
app.use(express.json())

// Create a new user
app.post("/users", async (req, res) => {
  const { username, email } = req.body
  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
      },
    })
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: "Could not create user" })
  }
})

// Get a list of all users
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: "Could not fetch users" })
  }
})

// Get a single user by ID
app.get("/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id)
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })
    if (!user) {
      res.status(404).json({ error: "User not found" })
    } else {
      res.json(user)
    }
  } catch (error) {
    res.status(500).json({ error: "Could not fetch user" })
  }
})

// Update a user by ID
app.put("/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id)
  const { username, email } = req.body
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        username,
        email,
      },
    })
    res.json(updatedUser)
  } catch (error) {
    res.status(500).json({ error: "Could not update user" })
  }
})

// Delete a user by ID
app.delete("/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id)
  try {
    await prisma.user.delete({
      where: { id: userId },
    })
    res.json({ message: "User deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: "Could not delete user" })
  }
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
