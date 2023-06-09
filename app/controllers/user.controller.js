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
                res.locals = {
                    title: 'Login Admin',
                    message: 'User tidak ditemukan'
                };

                return res.render('auth/login');
            }

            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                res.locals = {
                    title: 'Login Admin',
                    message: 'Password salah'
                };

                return res.render('auth/login');
            }

            sess = req.session;
            sess.username = user.username
            sess.id = user.id_user

            res.redirect('/')

        }).catch(err => {
            console.log(err);

            res.locals = {
                title: 'Login Admin',
                message: 'Username atau Password salah'
            };

            res.render('auth/login');
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