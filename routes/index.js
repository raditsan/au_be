var express = require('express');
var router = express.Router();

const userController = require('../controllers').user;
const roleController = require('../controllers').role;
const menuController = require('../controllers').menu;
const menuDetailController = require('../controllers').menu_details;

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
router.delete('/api/role/:role_id', roleController.delete);

router.get('/api/menu/page/:page/size/:size', menuController.list);
router.get('/api/menu-data/page/:page/size/:size', menuController.listMenu);
router.get('/api/menu/:menu_id', menuController.getById);
router.post('/api/menu', menuController.add);
router.delete('/api/menu/:menu_id', menuController.delete);

router.get('/api/menu-detail/page/:page/size/:size', menuDetailController.list);
router.get('/api/menu-detail/:menu_detail_id', menuDetailController.getById);
router.post('/api/menu-detail', menuDetailController.add);
router.delete('/api/menu-detail/:menu_detail_id', menuDetailController.delete);

module.exports = router;
