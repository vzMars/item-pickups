module.exports = {
  loginUser: async (req, res) => {
    res.json('login');
  },
  logoutUser: async (req, res) => {
    res.json('logout');
  },
  signupUser: async (req, res) => {
    res.json('signup');
  },
};
