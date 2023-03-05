const User = require('../models/User');

module.exports = {
  getLogin: async (req, res) => {
    res.render('login', { user: req.user, title: 'Login' });
  },
  postLogin: async (req, res) => {
    res.json('login');
  },
  logout: async (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      req.session.destroy();
      res.redirect('/');
    });
  },
  getSignup: (req, res) => {
    res.render('signup', { user: req.user, title: 'Signup' });
  },
  postSignup: async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
      const user = await User.signup(username, email, password);
      req.logIn(user, (err) => {
        if (err) return next(err);
        res.redirect('/');
      });
    } catch (error) {
      req.flash('error', error.message);
      return res.redirect('/signup');
    }
  },
};
