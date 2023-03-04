module.exports = {
  getLogin: async (req, res) => {
    res.render('login', { user: req.user, title: 'Login' });
  },
  postLogin: async (req, res) => {
    res.json('login');
  },
  logout: async (req, res) => {
    res.json('logout');
  },
  getSignup: (req, res) => {
    res.render('signup', { user: req.user, title: 'Signup' });
  },
  postSignup: async (req, res) => {
    res.json('signup');
  },
};
