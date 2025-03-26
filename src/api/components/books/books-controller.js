const booksService = require('./books-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getBooks(req, res, next) {
  try {
    const books = await booksService.getBooks();
    return res.status(200).json(books);
  } catch (error) {
    return next(error);
  }
}

async function getBook(req, res, next) {
  try {
    const { id } = req.params;
    const book = await booksService.getBookById(id);

    if (!book) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Book not found');
    }

    return res.status(200).json(book);
  } catch (error) {
    return next(error);
  }
}

async function createBook(req, res, next) {
  try {
    const { title } = req.body;

    if (!title) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Title is required');
    }

    const book = await booksService.createBook(title);
    return res.status(201).json(book);
  } catch (error) {
    return next(error);
  }
}

async function updateBook(req, res, next) {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!title) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Title is required');
    }

    const updatedBook = await booksService.updateBook(id, title);

    if (!updatedBook) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Book not found');
    }

    return res.status(200).json(updatedBook);
  } catch (error) {
    return next(error);
  }
}

async function deleteBook(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = await booksService.deleteBook(id);

    if (!deleted) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Book not found');
    }

    return res.status(200).json({ message: 'Book deleted' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
