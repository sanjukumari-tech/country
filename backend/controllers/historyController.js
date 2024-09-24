const History = require('../models/historyModel');

const getHistory = async (req, res) => {
  try {
    const history = await History.find({ user: req.user._id }).sort({ date: -1 }).limit(5);
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching search history' });
  }
};

const addHistory = async (req, res) => {
  const { search } = req.body;

  try {
    const existingHistory = await History.findOne({ user: req.user._id, search });

    if (existingHistory) {
      await existingHistory.remove();
    }

    const history = new History({
      user: req.user._id,
      search,
    });

    const savedHistory = await history.save();
    res.status(201).json(savedHistory);
  } catch (error) {
    res.status(500).json({ message: 'Error adding search history' });
  }
};

module.exports = { getHistory, addHistory };
