const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

const router = express.Router();

//router.use(authMiddleware);
router.post('/create',authMiddleware, userController.createUser);

router.put('/update-role/:id', authMiddleware, userController.updateUserRole);

router.delete('/delete/:id',authMiddleware,  userController.deleteUser);

router.get('/getUserFeed', authMiddleware, userController.getFeedsForUser)

module.exports = router;