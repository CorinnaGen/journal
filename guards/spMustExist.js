const db = require("../model/helper");

async function spMustExist(req, res, next) {
	try {
		const { id } = req.params;
		const results = await db(`SELECT * FROM safety_plan WHERE id = ${id};`);

		if (!results.data.length) {
			return res.status(404).send({ message: "safety plan not found" });
		}
		req.resource = results.data[0];
		next();
	} catch (err) {
		res.status(500).send(err);
	}
}

module.exports = spMustExist;
