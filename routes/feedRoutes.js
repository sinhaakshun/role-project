const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const feedController = require('../controllers/feedController');

const router = express.Router();

//router.use(authMiddleware);


router.post('/create',authMiddleware, feedController.createFeed);


router.put('/update/:id',authMiddleware,  feedController.updateFeed);


router.delete('/delete/:id',authMiddleware, feedController.deleteFeed);


module.exports = router;
