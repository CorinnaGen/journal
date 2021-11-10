const db = require("../model/helper");

async function identifierMustExist(req, res, next) {
	try {
		const { id } = req.params;
		const { sp_id } = req.params;

		const results = await db(
			`SELECT * FROM sp_identifiers WHERE id = ${id} and sp_id = ${sp_id};`
		);

		if (!results.data.length) {
			return res.status(404).send({ message: "identifier not found" });
		}
		req.identifier = results.data[0];
		next();
	} catch (err) {
		res.status(500).send(err);
	}
}

module.exports = identifierMustExist;
