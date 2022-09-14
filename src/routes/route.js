const express = require("express");
const router = express.Router();
const controllers = require("../controllers/collegeController");
const intern = require("../controllers/internController");

router.get("/test", (req, res) => {
  res.send("Successful test");
});

router.post("/functionup/colleges", controllers.createCollege);
router.post("/functionup/interns", intern.createIntern);
router.get("/functionup/collegeDetails", intern.getInterns);

module.exports = router;
