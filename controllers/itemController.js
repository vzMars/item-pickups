module.exports = {
  getExplore: (req, res) => {
    res.render('explore', { user: req.user, title: 'ItemPickups' });
  },
  getProfile: (req, res) => {
    res.render('profile', { user: req.user, title: req.user.displayname });
  },
  getFavorites: (req, res) => {
    res.render('favorites', { user: req.user, title: 'Favorite Items' });
  },
  addForm: (req, res) => {
    res.render('add', { user: req.user, title: 'Add Item' });
  },
};
