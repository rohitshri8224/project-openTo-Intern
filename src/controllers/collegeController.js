const College = require("../models/collegeModel");

const isValidString = function (data) {
	if (typeof data != "string" || data.trim().length == 0) {
		return false;
	}
	return true;
};

const createCollege = async function (req, res) {
	try {
		// Checking if the request body is not empty
		if (Object.keys(req.body).length === 0)
			return res.status(400).send({ status: false, msg: "Required data" });

		// Checking if the required fields are present or not
		const requiredFields = ["name", "fullName", "logoLink"];
		for (field of requiredFields) {
			if (!req["body"].hasOwnProperty(field))
				return res
					.status(400)
					.send({ status: false, msg: `Please provide ${field}` });
		}

		// Checking if the value is a valid string or not
		// for (key in req.body) {
		// 	if (!isValidString(req.body[key]))
		//   console.log(`${key} is ${isValidString(key)}`)
		// 		return res
		// 			.status(400)
		// 			.send({ status: false, msg: `Please provide a valid ${key}` });
		// }

		if (!isValidString(req.body.name))
			return res
				.status(400)
				.send({ status: false, msg: `Please provide a valid name` });

		if (!isValidString(req.body.fullName))
			return res
				.status(400)
				.send({ status: false, msg: `Please provide a valid fullName` });

		if (!isValidString(req.body.logoLink))
			return res
				.status(400)
				.send({ status: false, msg: `Please provide a valid logoLink` });

		const requestBody = req.body;

		// Checking if the college name already exists or not
		const checkName = await College.findOne({ name: requestBody.name });
		if (checkName)
			return res
				.status(400)
				.send({ status: false, msg: "Name already present" });

		// Creating a new college
		const createNewCollege = await College.create(requestBody);
		res.status(201).send({ status: true, data: createNewCollege });
	} catch (error) {
		res.status(500).send({ status: false, msg: error.message });
	}
};

module.exports = { createCollege };
