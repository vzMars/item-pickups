module.exports = {
  getLogin: async (req, res) => {
    res.render('login', { title: 'Login' });
  },
  postLogin: async (req, res) => {
    res.json('login');
  },
  logout: async (req, res) => {
    res.json('logout');
  },
  getSignup: (req, res) => {
    res.render('signup', { title: 'Signup' });
  },
  postSignup: async (req, res) => {
    res.json('signup');
  },
};
