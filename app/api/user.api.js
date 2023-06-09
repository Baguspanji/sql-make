const User = require("../models").user;
const bcrypt = require("bcryptjs");

const jwt = require("../../config/config_jwt");

exports.signUp = async (req, res) => {
    var body = req.body;
    body.password = bcrypt.hashSync(req.body.password, 12);

    const user = await User.findOne({
        where: {
            username: body.username,
        },
    });

    const email = await User.findOne({
        where: {
            email: body.email,
        },
    });

    if (user)
        return res.status(401).send({
            status: false,
            message: "Username already exist",
            data: {
                username: body.username,
                accessToken: null,
            },
        });

    if (email)
        return res.status(401).send({
            status: false,
            message: "Email already exist",
            data: {
                email: body.email,
                accessToken: null,
            },
        });

    try {
        const data = await User.create(body);

        res.status(200).send({
            status: true,
            message: "Register Success",
            data: {
                user: data,
                accessToken: null,
            },
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "Register Failed",
            data: {
                user: null,
                accessToken: null,
            },
            errors: error,
        });
    }
};

exports.signIn = async (req, res) => {
    const body = req.body;

    try {
        const user = await User.findOne({
            where: {
                username: body.username,
            },
        })

        if (!user) {
            return res.status(404).send({
                status: false,
                message: "Error user not found",
                data: {
                    username: body.username,
                    accessToken: null,
                },
            });
        }

        var passwordIsValid = bcrypt.compareSync(
            body.password,
            user.password
        );
        if (!passwordIsValid) {
            return res.status(401).send({
                status: false,
                message: "Error password is invalid",
                data: {
                    username: body.username,
                    accessToken: null,
                },
            });
        }

        var token = jwt.token({
            id: user.id,
            username: user.username,
            email: user.email,
            name: user.name,
        });

        user.password = undefined;

        res.status(200).send({
            status: true,
            message: "Login Success",
            data: {
                user,
                accessToken: token,
            },
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            data: {
                name: body.name,
                accessToken: null,
            },
            errors: error,
        });
    }
};

exports.findOne = async (req, res) => {
    const userData = req.user;

    try {
        const user = await User.findOne({
            where: {
                id: userData.id,
                username: userData.username,
                email: userData.email,
            },
            attributes: ["id", "username", "name", "email"],
        })

        res.status(200).send({
            status: true,
            message: "Get User Success",
            data: user,
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "error",
            data: null,
            errors: error,
        });
    }
};