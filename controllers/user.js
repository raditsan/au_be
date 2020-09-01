const uuid = require('uuid');
const User = require('../models').User;

module.exports = {
  list(req, res) {
    const {page, size} = req.params
    console.log('req.body', req.params)
    return User
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
    return User.findOne({
      where: {
        user_id: req.params.user_id}
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            success: false,
            message: 'Data Not Found',
          });
        }
        return res.status(200).send({
          success: true,
          user: user
        });
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return User
      .create({
        user_id: uuid.v4(),
        full_name:req.body.full_name,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password,
        role_id:req.body.role_id,
        phone_number:req.body.phone_number,
        flag_active:req.body.flag_active,
        flag_block:req.body.flag_block,
        user_create_id:req.body.user_create_id
      })
      .then((user) => {
        res.status(201).send({
          success: true,
          user
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
    return User
      .destroy({
        where: {
          user_id: req.params.user_id}
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
