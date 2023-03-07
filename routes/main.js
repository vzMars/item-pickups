const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const itemController = require('../controllers/itemController');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/', homeController.getIndex);
router.get('/explore', ensureAuth, itemController.getExplore);
router.get('/profile/:id', ensureAuth, itemController.getProfile);
router.get('/favorites', ensureAuth, itemController.getFavorites);
router.get('/logout', ensureAuth, authController.logout);

router.get('/login', ensureGuest, authController.getLogin);
router.post('/login', ensureGuest, authController.postLogin);
router.get('/signup', ensureGuest, authController.getSignup);
router.post('/signup', ensureGuest, authController.postSignup);

module.exports = router;
