const cloudinary = require('../middleware/cloudinary');
const Item = require('../models/Item');

module.exports = {
  getExplore: (req, res) => {
    res.render('explore', { user: req.user, title: 'ItemPickups' });
  },
  getProfile: async (req, res) => {
    try {
      const items = await Item.find({ user: req.user.id })
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
      console.log(err);
    }
  },
  getFavorites: (req, res) => {
    res.render('favorites', { user: req.user, title: 'Favorite Items' });
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
