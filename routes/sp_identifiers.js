var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const identifierMustExist = require("../guards/identifierMustExist");

router.get("/identifiers", async function (req, res, next) {
	try {
		const results = await db("SELECT * FROM sp_identifiers;");
		res.send(results.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.get("/:sp_id/identifiers", async function (req, res, next) {
	try {
		const { sp_id } = req.params;
		const results = await db(
			`SELECT * FROM sp_identifiers WHERE sp_id = ${sp_id};`
		);
		res.send(results.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.get(
	"/:sp_id/identifiers/:id",
	identifierMustExist,
	async function (req, res, next) {
		try {
			const { id } = req.params;
			const { sp_id } = req.params;

			const results = await db(
				`SELECT * FROM sp_identifiers WHERE id ="${id}" AND sp_id = ${sp_id};`
			);
			res.send(results.data);
		} catch (err) {
			res.status(500).send(err);
		}
	}
);

router.post("/:sp_id/identifiers", async function (req, res, next) {
	try {
		const { sp_id } = req.params;
		const { type, text } = req.body;
		await db(
			`INSERT INTO sp_identifiers (type, text, sp_id) VALUES ("${type}","${text}", ${sp_id});`
		);
		const results = await db("SELECT * FROM sp_identifiers;");
		res.send(results.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.put(
	"/:sp_id/identifiers/:id",
	identifierMustExist,
	async function (req, res, next) {
		try {
			const { id } = req.params;
			const { type, text } = req.body;

			if (type) {
				await db(
					`UPDATE sp_identifiers SET type = "${type}" WHERE id ="${id}";`
				);
			}
			if (text) {
				await db(
					`UPDATE sp_identifiers SET info = "${text}" WHERE id ="${id}";`
				);
			}
			const results = await db(
				`SELECT * FROM sp_identifiers WHERE id ="${id}";`
			);
			res.send(results.data);
		} catch (err) {
			res.status(500).send(err);
		}
	}
);

router.delete(
	"/:sp_id/identifiers/:id",
	identifierMustExist,
	async function (req, res, next) {
		try {
			const { sp_id } = req.params;
			const { id } = req.params;

			await db(
				`DELETE FROM sp_identifiers WHERE id = "${id}" AND sp_id=${sp_id};`
			);
			const results = await db("SELECT * FROM sp_identifiers;");
			res.send(results.data);
		} catch (err) {
			res.status(500).send(err);
		}
	}
);

module.exports = router;

// mysql> insert into sp_resources (name, info, type, sp_id) values ("third name", "third email", 1, 1);

// insert into sp_resources (name, info, type, sp_id) values ("first friend", "friend1 email", 2, 2)
// insert into sp_resources (name, info, type, sp_id) values ("second friend", "friend2 email", 2, 2)
// insert into sp_resources (name, info, type, sp_id) values ("third friend", "friend3 email", 2, 2);
