const express = require('express');
const { getHistory, addHistory } = require('../controllers/historyController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', protect, getHistory);
router.post('/', protect, addHistory);

module.exports = router;
