const uuid = require('uuid');
const Menu = require('../models').MenuDetail;

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
        menu_detail_id: req.params.menu_detail_id}
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
        menu_detail_id: uuid.v4(),
        menu_id:req.body.menu_id,
        role_id:req.body.role_id
      })
      .then((results) => {
        res.status(201).send({
          success: true,
          menuDetail: results
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
          menu_detail_id: req.params.menu_detail_id}
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
};
