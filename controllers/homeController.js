module.exports = {
  getIndex: (req, res) => {
    res.render('index', { user: req.user, title: 'ItemPickups' });
  },
};
