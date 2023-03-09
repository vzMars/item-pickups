const errorHandler = (err, req, res, next) => {
  res.render('404', {
    user: req.user,
    title: '404',
    error: err.message,
  });
};

module.exports = errorHandler;
