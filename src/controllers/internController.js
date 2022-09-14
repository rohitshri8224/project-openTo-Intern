const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel");

const isValidEmail = function (data) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(data);
};
//

const isValidString = function (data) {
  if (typeof data != "string" || data.trim().length == 0) {
    return false;
  }
  return true;
};

const createIntern = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length === 0) {
      return res
        .status(400)
        .send({ status: false, msg: "required data in the body" });
    }
    const requiredFields = ["name", "email", "mobile", "collegeName"];
    for (field of requiredFields) {
      if (!data.hasOwnProperty(field)) {
        return res
          .status(400)
          .send({ status: false, msg: `please provide this ${field}` });
      }
    }
    for (key in data) {
      if (!requiredFields.includes(key))
        return res.status(400).send({
          status: false,
          msg: `keys must be among this ${requiredFields.join(",")}`,
        });
    }
    for (field of requiredFields)
      if (!isValidString(data[field])) {
        return res
          .status(400)
          .send({ status: false, msg: `${field} is required` });
      }
    if (!isValidEmail(data.email.trim())) {
      return res.status(400).send({ status: false, msg: "email is invalid" });
    }

    let unique = ["email", "mobile"];
    for (field of unique) {
      let emp = {};
      emp[field] = data[field];
      console.log(emp);
      let document = await internModel.findOne(emp);
      if (document) {
        return res
          .status(400)
          .send({ status: false, msg: `${field} is already taken` });
      }
    }

    let collegeData = await collegeModel.findOne({ name: data.collegeName });
    data.collegeId = collegeData._id;
    delete data["collegeName"];
    let createInterns = await internModel.create(data);
    res.status(201).send({ status: true, data: createInterns });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports = { createIntern };
