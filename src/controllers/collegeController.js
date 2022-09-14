const College = require("../models/collegeModel");

const isValidString = function (data) {
  if (typeof data != "string" || data.trim().length == 0) {
    return false;
  }
  return true;
};

const createCollege = async function (req, res) {
  try {
    // Checking if the request body is empty or not
    if (Object.keys(req.body).length === 0)
      return res.status(400).send({ status: false, msg: "Required data" });

    const requiredFields = ["name", "fullName", "logoLink"];

    // Checking if the required fields are present or not
    for (field of requiredFields) {
      if (!req["body"].hasOwnProperty(field))
        return res
          .status(400)
          .send({ status: false, msg: `Please provide ${field}` });
    }

    // Checking if the value is a valid string or not
    for (field of requiredFields) {
      if (!isValidString(req.body[field]))
        return res
          .status(400)
          .send({ status: false, msg: `Please provide a valid ${field}` });
    }

    //Checking if there is no field other than the specified
    for (key in req.body) {
      if (!requiredFields.includes(key))
        return res.status(400).send({
          status: false,
          msg: `Fields can only be among these: ${requiredFields.join(", ")}`,
        });
    }

    // Storing req.body in requestBody variable
    const requestBody = req.body;

    // Checking if the college name already exists or not
    const checkName = await College.findOne({ name: requestBody.name.trim() });
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
