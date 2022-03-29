var express = require("express");
var router = express.Router();
var authentication_mdl = require("../middlewares/authentication");
var session_store;

router.get("/paket", authentication_mdl.is_login, function (req, res, next) {
    req.getConnection(function (err, connection) {
        var query = connection.query(
            "SELECT * FROM menu WHERE Kategori = 'paket'",
            function (err, rows) {
                if (err) var errornya = ("Error Selecting : %s ", err);
                req.flash("msg_error", errornya);
                res.render("menu/new", {
                    title: "Paket",
                    data: rows,
                    session_store: req.session,
                });
            }
        );
        //console.log(query.sql);
    });
});

router.get("/sup", authentication_mdl.is_login, function (req, res, next) {
    req.getConnection(function (err, connection) {
        var query = connection.query(
            "SELECT * FROM menu WHERE Kategori = 'sup'",
            function (err, rows) {
                if (err) var errornya = ("Error Selecting : %s ", err);
                req.flash("msg_error", errornya);
                res.render("menu/new", {
                    title: "Sup",
                    data: rows,
                    session_store: req.session,
                });
            }
        );
        //console.log(query.sql);
    });
});

router.get("/seafood", authentication_mdl.is_login, function (req, res, next) {
    req.getConnection(function (err, connection) {
        var query = connection.query(
            "SELECT * FROM menu WHERE Kategori = 'seafood'",
            function (err, rows) {
                if (err) var errornya = ("Error Selecting : %s ", err);
                req.flash("msg_error", errornya);
                res.render("menu/new", {
                    title: "Seafood",
                    data: rows,
                    session_store: req.session,
                });
            }
        );
        //console.log(query.sql);
    });
});

router.get("/makanan", authentication_mdl.is_login, function (req, res, next) {
    req.getConnection(function (err, connection) {
        var query = connection.query(
            "SELECT * FROM menu WHERE Kategori = 'sayur'",
            function (err, rows) {
                if (err) var errornya = ("Error Selecting : %s ", err);
                req.flash("msg_error", errornya);
                res.render("menu/new", {
                    title: "Sayur",
                    data: rows,
                    session_store: req.session,
                });
            }
        );
        //console.log(query.sql);
    });
});

router.get("/minuman", authentication_mdl.is_login, function (req, res, next) {
    req.getConnection(function (err, connection) {
        var query = connection.query(
            "SELECT * FROM menu WHERE Kategori = 'minuman'",
            function (err, rows) {
                if (err) var errornya = ("Error Selecting : %s ", err);
                req.flash("msg_error", errornya);
                res.render("menu/new", {
                    title: "Minuman",
                    data: rows,
                    session_store: req.session,
                });
            }
        );
        //console.log(query.sql);
    });
});

router.get("/snack", authentication_mdl.is_login, function (req, res, next) {
    req.getConnection(function (err, connection) {
        var query = connection.query(
            "SELECT * FROM menu WHERE Kategori = 'snack'",
            function (err, rows) {
                if (err) var errornya = ("Error Selecting : %s ", err);
                req.flash("msg_error", errornya);
                res.render("menu/new", {
                    title: "Snack",
                    data: rows,
                    session_store: req.session,
                });
            }
        );
        //console.log(query.sql);
    });
});

module.exports = router;