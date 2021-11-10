var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const spMustExist = require("../guards/spMustExist");

router.get("/", async (req, res) => {
	try {
		const results = await db("SELECT * FROM safety_plan;");
		res.send(results.data);
	} catch (err) {
		res.status(500).send(err);
	}
});
router.get("/:id", spMustExist, async (req, res) => {
	try {
		const { id } = req.params;
		const results = await db(`SELECT * FROM safety_plan WHERE id = ${id};`);
		res.send(results.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.post("/", async function (req, res, next) {
	try {
		const { date } = req.body;
		await db(`INSERT INTO safety_plan (date) VALUE ("${date}");`);
		const results = await db("SELECT * FROM safety_plan;");
		res.send(results.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.put("/:id", spMustExist, async function (req, res, next) {
	try {
		const { id } = req.params;
		const { date } = req.body;

		if (date) {
			await db(`UPDATE safety_plan SET date = "${date}" WHERE id ="${id}";`);
		}

		const results = await db(`SELECT * FROM safety_plan WHERE id ="${id}";`);
		res.send(results.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.delete("/:id", spMustExist, async function (req, res, next) {
	try {
		const { id } = req.params;
		await db(`DELETE FROM safety_plan WHERE id = "${id}";`);
		const results = await db("SELECT * FROM safety_plan;");
		res.send(results.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = router;
