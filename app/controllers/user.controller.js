const User = require('../models').user
const bcrypt = require('bcryptjs')

exports.home = (req, res) => {
    res.locals = {
        title: 'Login Admin'
    };

    res.render('auth/login');
}

exports.login = (req, res) => {
    User
        .findOne({
            where: {
                username: req.body.username,
            },
        }).then(user => {
            if (!user) {
                return res.status(404).send({
                    status: false,
                    message: "Error",
                    data: {
                        username: req.body.username,
                        accessToken: null,
                    }
                })
            }

            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                return res.status(401).send({
                    status: false,
                    message: "Error",
                    data: {
                        username: req.body.username,
                        accessToken: null,
                    },
                })
            }

            sess = req.session;
            sess.username = user.username
            sess.id = user.id_user

            res.redirect('/')

        }).catch(err => {
            res.status(500).send({
                status: false,
                data: {
                    name: req.body.name,
                    accessToken: null,
                },
                errors: err
            })
        })
}

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        res.redirect('/');
    });
}