var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const resourceMustExist = require("../guards/resourceMustExist");
const { text } = require("express");

// router.get("/", (req, res) => {
// 	res.send("this is a test");
// })

router.get("/resources", async function (req, res, next) {
	try {
		const results = await db("SELECT * FROM sp_resources;");
		res.send(results.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.get("/identifiers", async function (req, res, next) {
	try {
		const results = await db("SELECT * FROM sp_identifiers;");
		res.send(results.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.get("/:sp_id/resources", async function (req, res, next) {
	try {
		const { sp_id } = req.params;
		const results = await db(
			`SELECT * FROM sp_resources WHERE sp_id = ${sp_id};`
		);
		res.send(results.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.get(
	"/:sp_id/resources/:id",
	resourceMustExist,
	async function (req, res, next) {
		try {
			const { id } = req.params;
			const { sp_id } = req.params;

			const results = await db(
				`SELECT * FROM sp_resources WHERE id ="${id}" AND sp_id = ${sp_id};`
			);
			res.send(results.data);
		} catch (err) {
			res.status(500).send(err);
		}
	}
);

router.post("/:sp_id/resources", async function (req, res, next) {
	try {
		const { sp_id } = req.params;
		const { name, info, type } = req.body;
		await db(
			`INSERT INTO sp_resources (name, info, type, sp_id) VALUES ("${name}","${info}","${type}",${sp_id});`
		);
		const results = await db("SELECT * FROM sp_resources;");
		res.send(results.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.put(
	"/:sp_id/resources/:id",
	resourceMustExist,
	async function (req, res, next) {
		try {
			const { id } = req.params;
			const { name, info, type } = req.body;

			if (name) {
				await db(`UPDATE sp_resources SET name = "${name}" WHERE id ="${id}";`);
			}
			if (info) {
				await db(`UPDATE sp_resources SET info = "${info}" WHERE id ="${id}";`);
			}
			if (type) {
				await db(`UPDATE sp_resources SET type = "${type}" WHERE id ="${id}";`);
			}

			const results = await db(`SELECT * FROM sp_resources WHERE id ="${id}";`);
			res.send(results.data);
		} catch (err) {
			res.status(500).send(err);
		}
	}
);

router.delete(
	"/:sp_id/resources/:id",
	resourceMustExist,
	async function (req, res, next) {
		try {
			const { sp_id } = req.params;
			const { id } = req.params;

			await db(
				`DELETE FROM sp_resources WHERE id = "${id}" and sp_id = "${sp_id}";`
			);
			const results = await db("SELECT * FROM sp_resources;");
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

// insert into sp_identifiers (type, text, sp_id) values ("ebwbhj", "tewjhfbh", 1);
// insert into sp_identifiers (type, text, sp_id) values ("behjbw", "s hqwbehfbheko", 2);
