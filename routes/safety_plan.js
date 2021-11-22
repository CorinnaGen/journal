var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const spMustExist = require("../guards/spMustExist");
const userMustLoggedIn = require("../guards/userMustLoggedIn");

router.get("/", userMustLoggedIn, async (req, res) => {
	
	try {
		const results = await db("SELECT * FROM safety_plan;");
		res.send(results.data);
	} catch (err) {
		res.status(500).send(err);
	}
});
router.get("/:id", userMustLoggedIn, spMustExist, async (req, res) => {
	try {
		const { id } = req.params;
		const results = await db(`SELECT * FROM safety_plan WHERE id = ${id};`);
		res.send(results.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.post("/", userMustLoggedIn, async function (req, res, next) {
	try {
		const { date } = req.body;
		await db(`INSERT INTO safety_plan (date) VALUE ("${date}");`);
		const results = await db("SELECT * FROM safety_plan;");
		res.send(results.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.put("/:id",userMustLoggedIn, spMustExist, async function (req, res, next) {
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

router.delete("/:id",userMustLoggedIn, spMustExist, async function (req, res, next) {
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
