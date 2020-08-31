var express = require('express');
var router = express.Router();

const userController = require('../controllers').user;
const roleController = require('../controllers').role;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* User Router  */
router.get('/api/user/page/:page/size/:size', userController.list);
router.get('/api/user/:user_id', userController.getById);
router.post('/api/user', userController.add);
router.delete('/api/user/:user_id', userController.delete);

router.get('/api/role/page/:page/size/:size', roleController.list);
router.get('/api/role/:role_id', roleController.getById);
router.post('/api/role', roleController.add);
router.delete('/api/role/:user_id', roleController.delete);

module.exports = router;
