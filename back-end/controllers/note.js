import prisma from '../database.js'

export const getNotes = async (req, res) => {
  try {
    const notes = await prisma.note.findMany({
      where: {userId: req.userId}
    })

    if (notes.length == 0) {
      return res.status(200).json({
        status: 'success',
        message: 'No notes found. Try to create one first',
        notes
      })
    }

    res.status(200).json({
      status: "success",
      notes
    })
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
}

export const getNote = async (req, res) => {
  try {
    const note = await prisma.note.findFirst({
      where: {id: req.params.id, userId: req.userId}
    })

    if (!note) {
      return res.status(200).json({
        status: 'error',
        message: 'No note found'
      })
    }

    res.status(200).json({
      status: 'success',
      note
    })
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
}

export const createNote = async (req, res) => {
  const {title, content, tags} = req.body
  try {
    const note = await prisma.note.create({
      data: {
        title,
        content,
        tags,
        userId: req.userId
      }
    })

    res.status(201).json({
      status: 'success',
      message: "Note created successfully",
      note
    })
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
}

export const updateNote = async (req, res) => {
  const {title, content, tags} = req.body
  try {
    const note = await prisma.note.update({
      where: {id: req.params.id, userId: req.userId},
      data: {
        title,
        content,
        tags
      }
    })

    if (!note) {
      return res.status(200).json({
        status: 'error',
        message: 'No note found'
      })
    }

    res.status(200).json({
      status: 'success',
      message: 'Note updated successfully',
      note
    })
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
}

export const pinNote = async (req, res) => {
  const {isPinned} = req.body
  try {
    const note = await prisma.note.update({
      where: {id: req.params.id, userId: req.userId},
      data: {
        isPinned
      }
    })

    if (!note) {
      return res.status(200).json({
        status: 'error',
        message: 'No note found'
      })
    }

    res.status(200).json({
      status: 'success',
      message: 'Note updated successfully',
      note
    })
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
}

export const deleteNote = async (req, res) => {
  try {
    const note = await prisma.note.delete({
      where: {id: req.params.id, userId: req.userId}
    })

    if (!note) {
      return res.status(200).json({
        status: 'error',
        message: 'No note found'
      })
    }

    res.status(200).json({
      status: 'success',
      message: 'Note deleted successfully'
    })
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
}

export const searchNote = async (req, res) => {
  const {searchQuery} = req.query

  if (!searchQuery) {
    return res.status(400).json({
      status: 'error',
      message: 'Search query is required'
    })
  }
  try {
    const notes = await prisma.note.findMany({
      where: {
        userId: req.userId,
        OR: [
          { title: {contains: searchQuery, mode: 'insensitive'}},
          { content: {contains: searchQuery, mode: 'insensitive'}}
        ]
      }
    })

    if (notes.length == 0) {
      return res.status(200).json({
        status: 'success',
        message: 'No notes found matching the search query. Try something else'
      })
    }

    res.status(200).json({
      status: 'success',
      message: "Notes matching the search query retrieved successfully",
      notes
    })
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
}