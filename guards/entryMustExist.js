const db = require("../model/helper");

async function entryMustExist(req, res, next) {
	try {
		const { id } = req.params;
		const results = await db(`SELECT * FROM journal_entries WHERE id = ${id};`);

		if (!results.data.length) {
			return res.status(404).send({ message: "Entry not found" });
		}
		req.entry = results.data[0];
		next();
	} catch (err) {
		res.status(500).send(err);
	}
}

module.exports = entryMustExist;
