const express = require('express');
const router = express.Router();

const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const auth = require('./components/auth/auth-route'); // Pastikan ini benar

router.use('/books', books);
router.use('/users', users);
router.use('/authentication', auth);

module.exports = router;
