// controllers/favoriteController.js
const Favorite = require('../models/favoriteModal');

const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorites' });
  }
};

const addFavorite = async (req, res) => {
  const { country } = req.body;

  try {
    const favorite = new Favorite({
      user: req.user._id,
      country,
    });

    const savedFavorite = await favorite.save();
    res.status(201).json(savedFavorite);
  } catch (error) {
    res.status(500).json({ message: 'Error adding favorite' });
  }
};

const removeFavorite = async (req, res) => {
  const { id } = req.params;

  try {
    const favorite = await Favorite.findById(id);

    if (favorite && favorite.user.toString() === req.user._id.toString()) {
      await favorite.remove();
      res.json({ message: 'Favorite removed' });
    } else {
      res.status(404).json({ message: 'Favorite not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error removing favorite' });
  }
};

module.exports = { getFavorites, addFavorite, removeFavorite };
