const express = require('express');
const usersController = require('./users-controller');

const router = express.Router();

// Get list of users
router.get('/', usersController.getUsers);

// Create a new user
router.post('/', usersController.createUser);

// Get user detail
router.get('/:id', usersController.getUser);

// Update user
router.put('/:id', usersController.updateUser);

// Change password
router.put('/:id/change-password', usersController.changePassword);

// Delete user
router.delete('/:id', usersController.deleteUser);

module.exports = router;
