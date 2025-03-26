const express = require('express');
const booksController = require('./books-controller'); // Pastikan path benar

const router = express.Router();

// Get list of books
router.get('/', booksController.getBooks);

// Get book by ID
router.get('/:id', booksController.getBook);

// Create a new book
router.post('/', booksController.createBook);

// Update book by ID
router.put('/:id', booksController.updateBook);

// Delete book by ID
router.delete('/:id', booksController.deleteBook);

module.exports = router;
