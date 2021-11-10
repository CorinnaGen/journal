const db = require("../model/helper");

async function resourceMustExist(req, res, next) {
	try {
		const { id } = req.params;
		const { sp_id } = req.params;
		const results = await db(
			`SELECT * FROM sp_resources WHERE id = ${id} and sp_id = ${sp_id};`
		);

		if (!results.data.length) {
			return res.status(404).send({ message: "resource not found" });
		}
		req.resource = results.data[0];
		next();
	} catch (err) {
		res.status(500).send(err);
	}
}

module.exports = resourceMustExist;

// SELECT * FROM sp_resources WHERE id = 1 and sp_id = 1;
