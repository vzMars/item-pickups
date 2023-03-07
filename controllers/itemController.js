const cloudinary = require('../middleware/cloudinary');
const Item = require('../models/Item');
const User = require('../models/User');
const mongoose = require('mongoose');

module.exports = {
  getExplore: (req, res) => {
    res.render('explore', { user: req.user, title: 'ItemPickups' });
  },
  getProfile: async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
        throw Error(`User Not Found!`);
      }

      const user = await User.findById(id);

      if (!user) {
        throw Error('User Not Found!');
      }

      const items = await Item.find({ user: id })
        .populate('user', 'displayname')
        .sort({
          createdAt: -1,
        });

      res.render('profile', {
        items,
        user: req.user,
        title: req.user.displayname,
      });
    } catch (err) {
      return res.render('404', {
        user: req.user,
        title: req.user.displayname,
        error: err.message,
      });
    }
  },
  getFavorites: (req, res) => {
    res.render('favorites', { user: req.user, title: 'Favorite Items' });
  },
  getItem: async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
        throw Error(`Invalid Item ID`);
      }
      res.render('item', {
        user: req.user,
        title: 'item',
      });
    } catch (err) {
      console.log(err);
    }
  },
  addForm: (req, res) => {
    res.render('add', { user: req.user, title: 'Add Item' });
  },
  addItem: async (req, res) => {
    const { title, itemType, description } = req.body;
    try {
      if (!title || !itemType || !description || !req.file) {
        throw Error('All fields must be filled');
      }

      const result = await cloudinary.uploader.upload(req.file.path);

      await Item.create({
        title,
        itemType,
        description,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        user: req.user.id,
      });

      res.redirect('/profile');
    } catch (error) {
      req.flash('error', error.message);
      return res.redirect('/item/add');
    }
  },
};
