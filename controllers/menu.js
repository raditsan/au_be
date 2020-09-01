const uuid = require('uuid');
const Menu = require('../models').Menu;

module.exports = {
  list(req, res) {
    const {page, size} = req.params
    return Menu
      .findAndCountAll({
        include: [],
        order: [
          ['createdAt', 'DESC'],
        ],
        offset: (page - 1) * size, limit: size
      })
      .then((results) => {
        res.status(200).send({
          success: true,
          items: results.rows,
          totalCount: results.count
        })
      })
      .catch((error) => {
        res.status(400).send({
          success: false,
          message: error.message
        })
      });
  },
  //
  getById(req, res) {
    return Menu.findOne({
      where: {
        menu_id: req.params.menu_id}
    })
      .then((result) => {
        if (!result) {
          return res.status(404).send({
            success: false,
            message: 'Data Not Found',
          });
        }
        return res.status(200).send({
          success: true,
          menu: result
        });
      })
      .catch((error) => res.status(400).send(error));
  },
  add(req, res) {
    return Menu
      .create({
        menu_id: uuid.v4(),
        menu_name:req.body.menu_name,
        user_create_id:req.body.user_create_id,
        flag_show:req.body.flag_show,
        menu_category:req.body.menu_category,
      })
      .then((results) => {
        res.status(201).send({
          success: true,
          menu: results
        })
      })
      .catch((error) => res.status(400).send({
        success: false,
        message: error.message
      }));
  },

  // update(req, res) {
  //   return User
  //     .findByPk(req.params.id)
  //     .then(user => {
  //       if (!user) {
  //         return res.status(404).send({
  //           message: 'User Not Found',
  //         });
  //       }
  //       return user
  //         .update({
  //           name: req.body.name || user.name,
  //           nik: req.body.nik || user.nik,
  //           department_id: req.body.department_id || user.department_id,
  //         })
  //         .then(() => res.status(200).send(user))
  //         .catch((error) => res.status(400).send(error));
  //     })
  //     .catch((error) => res.status(400).send(error));
  // },
  delete(req, res) {
    return Menu
      .destroy({
        where: {
          menu_id: req.params.menu_id}
      })
      .then(rowDelete => {
        res.status(200).send({
          success: true,
          rowDelete,
        });
      })
      .catch((error) => res.status(400).send({
        success: false,
        message: error.message
      }));
  },
  async listMenu(req, res) {
    const {page, size} = req.params
    const menuGroup = await Menu.findAll({
      order: [
            ['menu_category', 'ASC'],
          ]
    })
    const categoryGroup = []
    menuGroup.forEach(({dataValues: item}) => {
      if (item.menu_category === null || item.menu_category === '') {
        categoryGroup.push({
          _tag: 'CSidebarNavItem',
          name: item.menu_name,
          to: '/dashboard',
          icon: 'cil-speedometer',
          badge: {
            color: 'info',
            text: 'NEW',
          }
        })
      } else {
        if (!categoryGroup.find(e => e._children && e._children.length > 0 && e._children[0] === item.menu_category)) {
          categoryGroup.push({
            _tag: 'CSidebarNavTitle',
            _children: [item.menu_category]
          })
        }

        categoryGroup.push({
          _tag: 'CSidebarNavItem',
          name: item.menu_name,
          to: '/theme/colors',
          icon: 'cil-drop',
        },)
      }
    })

    res.status(200).send({
      success: true,
      items: categoryGroup
    })
    // return Menu
    //   .findAndCountAll({
    //     include: [],
    //     order: [
    //       ['createdAt', 'DESC'],
    //     ],
    //     offset: (page - 1) * size, limit: size
    //   })
    //   .then((results) => {
    //     res.status(200).send({
    //       success: true,
    //       items: results.rows,
    //       totalCount: results.count
    //     })
    //   })
    //   .catch((error) => {
    //     res.status(400).send({
    //       success: false,
    //       message: error.message
    //     })
    //   });
  },
};
