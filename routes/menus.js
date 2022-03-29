var express = require("express");
var router = express.Router();
var http = require("http");
var fs = require("fs");
var fileUpload = require('express-fileupload');
var path = require('path');
var formidable = require("formidable");
var mv = require("mv");
var authentication_mdl = require("../middlewares/authentication");
var session_store;
/* GET Menu page. */

router.get('/', authentication_mdl.is_login, function (req, res, next) {
	req.getConnection(function (err, connection) {
		var query = connection.query('SELECT * FROM menu', function (err, rows) {
			if (err)
				var errornya = ("Error Selecting : %s ", err);
			req.flash('msg_error', errornya);
			res.render('menu/list', { title: "Menu", data: rows, session_store: req.session });
		});
		//console.log(query.sql);
	});
});

router.delete('/delete/(:id)', authentication_mdl.is_login, function (req, res, next) {
	req.getConnection(function (err, connection) {
		var menu = {
			id: req.params.id,
		}

		var delete_sql = 'delete from menu where ?';
		req.getConnection(function (err, connection) {
			var query = connection.query(delete_sql, menu, function (err, result) {
				if (err) {
					var errors_detail = ("Error Delete : %s ", err);
					req.flash('msg_error', errors_detail);
					res.redirect('/menus');
				}
				else {
					req.flash('msg_info', 'Delete menu Success');
					res.redirect('/menus');
				}
			});
		});
	});
});
router.get('/edit/(:id)', authentication_mdl.is_login, function (req, res, next) {
	req.getConnection(function (err, connection) {
		var query = connection.query('SELECT * FROM menu where id=' + req.params.id, function (err, rows) {
			if (err) {
				var errornya = ("Error Selecting : %s ", err);
				req.flash('msg_error', errors_detail);
				res.redirect('/menus');
			} else {
				if (rows.length <= 0) {
					req.flash('msg_error', "Menu can't be find!");
					res.redirect('/menus');
				}
				else {
					console.log(rows);
					res.render('menu/edit', {
						title: "Edit Menu",
						data: rows[0],
						session_store: req.session
					});

				}
			}

		});
	});
});
router.put('/edit/(:id)', authentication_mdl.is_login, function (req, res, next) {
	req.assert('menu', 'Please the menu').notEmpty();
	var errors = req.validationErrors();
	if (!errors) {
		v_menu = req.sanitize('menu').escape().trim();
		v_kategori = req.sanitize('kategori').escape().trim();
		v_harga = req.sanitize('harga').escape().trim();
		v_stok = req.sanitize('stok').escape().trim();

		if (!req.files) {
			var menu = {
				menu: v_menu,
				kategori: v_kategori,
				harga: v_harga,
				stok: v_stok,
			};
		} else {
			var file = req.files.gambar;
			var gambar = file.name;
			file.mimetype == "image/jpeg";
			file.mv("public/images/upload/" + gambar);

			var menu = {
				menu: v_menu,
				kategori: v_kategori,
				harga: v_harga,
				stok: v_stok,
				gambar: gambar,
			};
		}

		var update_sql = 'update menu SET ? where id = ' + req.params.id;
		req.getConnection(function (err, connection) {
			var query = connection.query(update_sql, menu, function (err, result) {
				if (err) {
					var errors_detail = ("Error Update : %s ", err);
					req.flash('msg_error', errors_detail);
					res.render('menu/edit',
						{
							menu: req.param('menu'),
							kategori: req.param('kategori'),
							harga: req.param('harga'),
							stok: req.param('stok'),
						});
				} else {
					req.flash('msg_info', 'Update menu success');
					res.redirect('/menus');
				}
			});
		});
	} else {

		console.log(errors);
		errors_detail = "<p>Sory there are error</p><ul>";
		for (i in errors) {
			error = errors[i];
			errors_detail += '<li>' + error.msg + '</li>';
		}
		errors_detail += "</ul>";
		req.flash('msg_error', errors_detail);
		res.redirect('/menus/edit/' + req.params.id);
	}
});

router.post('/add', authentication_mdl.is_login, function (req, res, next) {
	req.assert("menu", "Please the menu").notEmpty();
	var errors = req.validationErrors();
	if (!errors) {

		v_menu = req.sanitize('menu').escape().trim();
		v_kategori = req.sanitize('kategori').escape().trim();
		v_harga = req.sanitize('harga').escape().trim();
		v_stok = req.sanitize('stok').escape();

		var file = req.files.gambar;
		var gambar = file.name;
		file.mimetype == "image/jpeg";
		file.mv("public/images/upload/" + gambar);

		var menu = {
			menu: v_menu,
			kategori: v_kategori,
			harga: v_harga,
			stok: v_stok,
			gambar: gambar,
		};

		var insert_sql = 'INSERT INTO menu SET ?';
		req.getConnection(function (err, connection) {
			var query = connection.query(insert_sql, menu, function (err, result) {
				if (err) {
					var errors_detail = ("Error Insert : %s ", err);
					req.flash('msg_error', errors_detail);
					res.render('menu/add-menu',
						{
							menu: req.param('menu'),
							kategori: req.param('kategori'),
							harga: req.param('harga'),
							stok: req.param('stok'),
							gambar: req.param("gambar"),
							session_store: req.session,
						});
				} else {
					req.flash('msg_info', 'Create menu success');
					res.redirect('/menus');
				}
			});
		});
	} else {

		console.log(errors);
		errors_detail = "<p>Sory there are error</p><ul>";
		for (i in errors) {
			error = errors[i];
			errors_detail += '<li>' + error.msg + '</li>';
		}
		errors_detail += "</ul>";
		req.flash('msg_error', errors_detail);
		res.render('menu/add-menu',
			{
				menu: req.param('menu'),
				address: req.param('kategori'),
				harga: req.param('harga'),
				stok: req.param('stok'),
				gambar: req.param("gambar"),
				session_store: req.session
			});
	}

});

router.get('/add', authentication_mdl.is_login, function (req, res, next) {
	res.render('menu/add-menu',
		{
			title: 'Add New Menu',
			menu: '',
			kategori: '',
			harga: '',
			stok: '',
			gambar: '',
			session_store: req.session
		});
});

module.exports = router;
