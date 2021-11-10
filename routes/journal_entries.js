var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const entryMustExist = require("../guards/entryMustExist");

/* GET journal entries listing. */
router.get("/", async function (req, res, next) {
	try {
		const results = await db("SELECT * FROM journal_entries;");
		res.send(results.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.get("/momentsOfJoy", async function (req, res, next) {
	try {
		const results = await db(
			"SELECT date, moment_of_joy FROM journal_entries;"
		);
		res.send(results.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.get("/:id", entryMustExist, function (req, res, next) {
	res.send(req.entry);
});

router.post("/", async function (req, res, next) {
	try {
		const { date, title, mood, entry_text, moment_of_joy } = req.body;
		await db(
			`INSERT INTO journal_entries (date, title, mood, entry_text, moment_of_joy) VALUES ("${date}","${title}","${mood}","${entry_text}","${moment_of_joy}");`
		);
		const results = await db("SELECT * FROM journal_entries;");
		res.send(results.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.delete("/:id", entryMustExist, async function (req, res, next) {
	try {
		await db(`DELETE FROM journal_entries WHERE id = "${req.entry.id}";`);
		const results = await db("SELECT * FROM journal_entries;");
		res.send(results.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.put("/:id", entryMustExist, async function (req, res, next) {
	try {
		const { title, entry_text, moment_of_joy, mood } = req.body;

		if (entry_text) {
			await db(
				`UPDATE journal_entries SET entry_text = "${entry_text}" WHERE id ="${req.entry.id}";`
			);
		}
		if (moment_of_joy) {
			await db(
				`UPDATE journal_entries SET moment_of_joy = "${moment_of_joy}" WHERE id ="${req.entry.id}";`
			);
		}
		if (mood) {
			await db(
				`UPDATE journal_entries SET mood = "${mood}" WHERE id ="${req.entry.id}";`
			);
		}
		if (title) {
			await db(
				`UPDATE journal_entries SET title = "${title}" WHERE id ="${req.entry.id}";`
			);
		}

		const results = await db("SELECT * FROM journal_entries;");
		res.send(results.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = router;

// UPDATE journal_entries SET entry_text = "updating entry text", moment_of_joy = "updating moment of joy" WHERE entry_id=4;

// {"date": "11/22",
// "title" : "First time in a while...",
// "moment_of_joy" :"making this work",
// "mood" : "Thrilled",
// "entry_text" : "This is the life"
// }