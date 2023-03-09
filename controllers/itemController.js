const cloudinary = require('../middleware/cloudinary');
const Item = require('../models/Item');
const User = require('../models/User');
const mongoose = require('mongoose');

module.exports = {
  getExplore: async (req, res) => {
    try {
      const items = await Item.find().populate('user', 'displayname').sort({
        createdAt: -1,
      });

      res.render('items', {
        items,
        user: req.user,
        title: 'ItemPickups',
      });
    } catch (error) {
      return res.render('404', {
        user: req.user,
        title: '404',
        error: err.message,
      });
    }
  },
  getProfile: async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
        throw Error('User Not Found!');
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

      res.render('items', {
        items,
        user: req.user,
        title: user.displayname,
      });
    } catch (err) {
      return res.render('404', {
        user: req.user,
        title: '404',
        error: err.message,
      });
    }
  },
  getFavorites: async (req, res) => {
    try {
      const items = await Item.find({ likes: req.user.id })
        .populate('user', 'displayname')
        .sort({
          createdAt: -1,
        });

      res.render('items', {
        items,
        user: req.user,
        title: `${req.user.displayname}'s Favorites`,
      });
    } catch (err) {
      console.log(err.message);
    }
  },
  getItem: async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
        throw Error('Item Not Found!');
      }

      const item = await Item.findById(id).populate('user', 'displayname');

      if (!item) {
        throw Error('Item Not Found!');
      }

      res.render('item', {
        item,
        user: req.user,
        title: `${item.user.displayname} - ${item.title}`,
      });
    } catch (err) {
      return res.render('404', {
        user: req.user,
        title: '404',
        error: err.message,
      });
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

      res.redirect(`/profile/${req.user._id}`);
    } catch (err) {
      req.flash('error', err.message);
      return res.redirect('/item/add');
    }
  },
  likeItem: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Item.findById(id);

      if (item.likes.includes(req.user.id)) {
        item.likes = item.likes.filter(
          (like) => like.valueOf() !== req.user.id
        );
      } else {
        item.likes.push(req.user.id);
      }

      await item.save();
      res.redirect('back');
    } catch (err) {
      console.log(err.message);
    }
  },
  deleteItem: async (req, res) => {
    try {
      const { id } = req.params;
      let item = await Item.findById(id);

      await cloudinary.uploader.destroy(item.cloudinaryId);
      await item.deleteOne();

      res.redirect(`/profile/${req.user._id}`);
    } catch (error) {
      res.redirect(`/profile/${req.user._id}`);
    }
  },
};
