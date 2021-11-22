var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const entryMustExist = require("../guards/entryMustExist");
const userMustLoggedIn = require("../guards/userMustLoggedIn");

/* GET journal entries listing. */
router.get("/", userMustLoggedIn, async function (req, res, next) {
	try {
		const results = await db(`SELECT * FROM journal_entries WHERE user_id=${req.user_id};`);
		res.send(results.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.get("/:id",userMustLoggedIn, entryMustExist, function (req, res, next) {
	res.send(req.entry);
});

router.post("/", userMustLoggedIn, async function (req, res, next) {
	try {
		const { date, title, mood, entry_text, moment_of_joy } = req.body;
		await db(
			`INSERT INTO journal_entries (date, title, mood, entry_text, moment_of_joy, user_id) 
			VALUES ("${date}","${title}","${mood}","${entry_text}","${moment_of_joy}",${req.user_id});`
		);
		console.log(req.user_id);
		const results = await db(`SELECT * FROM journal_entries WHERE user_id=${req.user_id};`);
		res.send(results.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.delete("/:id", userMustLoggedIn, entryMustExist, async function (req, res, next) {
	try {
		await db(`DELETE FROM journal_entries WHERE id = "${req.entry.id}";`);
		const results = await db(
			`SELECT * FROM journal_entries WHERE id = "${req.entry.id}";`
		);
		res.send(results.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.put("/:id", userMustLoggedIn, entryMustExist, async function (req, res, next) {
	try {
		const { title, entry_text, moment_of_joy, mood, date } = req.body;
		const { id } = req.params;

		if (entry_text) {
			await db(
				`UPDATE journal_entries SET entry_text = "${entry_text}" WHERE id ="${id}";`
			);
		}
		if (moment_of_joy) {
			await db(
				`UPDATE journal_entries SET moment_of_joy = "${moment_of_joy}" WHERE id ="${id}";`
			);
		}
		if (mood) {
			await db(
				`UPDATE journal_entries SET mood = "${mood}" WHERE id ="${id}";`
			);
		}
		if (title) {
			await db(
				`UPDATE journal_entries SET title = "${title}" WHERE id ="${id}";`
			);
		}
		if (date) {
			await db(
				`UPDATE journal_entries SET date = "${date}" WHERE id ="${id}";`
			);
		}

		const results = await db(`SELECT * FROM journal_entries WHERE id = ${id};`);
		res.send(results.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = router;
