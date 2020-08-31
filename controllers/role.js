const uuid = require('uuid');
const Role = require('../models').Role;

module.exports = {
  list(req, res) {
    const {page, size} = req.params
    return Role
      .findAndCountAll({
        include: [],
        order: [
          ['createdAt', 'DESC'],
        ],
        offset: (page - 1) * size, limit: size
      })
      .then((users) => {
        res.status(200).send({
          success: true,
          items: users.rows,
          totalCount: users.count
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
    return Role.findOne({
      where: {
        role_id: req.params.role_id}
    })
      .then((result) => {
        if (!result) {
          return res.status(404).send({
            success: false,
            message: 'User Not Found',
          });
        }
        return res.status(200).send({
          success: true,
          role: result
        });
      })
      .catch((error) => res.status(400).send(error));
  },
  add(req, res) {
    return Role
      .create({
        role_id: uuid.v4(),
        role_name:req.body.role_name,
        user_create_id:req.body.user_create_id
      })
      .then((role) => {
        res.status(201).send({
          success: true,
          role
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
    return Role
      .destroy({
        where: {
          role_id: req.params.user_id}
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
