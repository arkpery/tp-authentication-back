const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const Role = require("../constants").Role;
const bcrypt = require("bcrypt");

exports.userRegister = (req, res) => {
    const o = req.body;
    o.role = Role.User;
    let newUser = new User(o);

    bcrypt.hash(newUser.password, 10, (err, hash) => {
        if (err) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            });
        } else {
            newUser.password = hash;
            newUser.save((error, user) => {
                if (error) {
                    res.status(500);
                    console.log(error);
                    res.json({
                        message: "Erreur serveur."
                    });
                } else {
                    res.status(201);
                    res.json({
                        message: `Utilisateur crée : ${user.email}`
                    });
                }
            });
        }
    });
};

exports.adminRegister = (req, res) => {
    const o = req.body;
    o.role = Role.Admin;
    let newUser = new User(o);

    bcrypt.hash(newUser.password, 10, (err, hash) => {
        if (err) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            });
        } else {
            newUser.password = hash;
            newUser.save((error, user) => {
                if (error) {
                    res.status(500);
                    console.log(error);
                    res.json({
                        message: "Erreur serveur."
                    });
                } else {
                    res.status(201);
                    res.json({
                        message: `Utilisateur crée : ${user.email}`
                    });
                }
            });
        }
    });
};

exports.userRight = (req, res) => {
    const user = {
        role: req.user.role
    };

    console.log(user);
    res.json(user);
}

exports.userLogin = (req, res) => {
    // Rechercher l'utilisateur
    User.findOne({
        email: req.body.email
    }, (error, user) => {
        // Si l'utilisateur n'est pas trouvé
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            });
        }
        // Si l'utilisateur est trouvé
        else {
            // Si l'email et le mot de passe correspondent
            if (user != null) {
                if (user.email === req.body.email) {
                    bcrypt
                        .compare(req.body.password, user.password)
                        .then((result) => {
                            if (result) {
                                jwt.sign({
                                    user: {
                                        id: user._id,
                                        email: user.email,
                                        role: user.role
                                    }
                                }, process.env.JWT_KEY, {
                                    expiresIn: "30 days"
                                }, (error, token) => {
                                    if (error) {
                                        res.status(500);
                                        console.log(error);
                                        res.json({
                                            message: "Erreur serveur."
                                        });
                                    } else {
                                        res.status(200);
                                        res.json({
                                            token
                                        });
                                    }
                                });
                            } else {
                                res.status(403);
                                console.log(error);
                                res.json({
                                    message: "Authentification incorrect."
                                });
                            }
                        });
                } else {
                    res.status(403);
                    console.log(error);
                    res.json({
                        message: "Authentification incorrect."
                    });
                }
            }
            // Si l'email et le mot de passe ne correspondent pas
            else {
                res.status(403);
                console.log(error);
                res.json({
                    message: "Authentification incorrect."
                });
            }
        }
    });
}