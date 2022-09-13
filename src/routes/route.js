const express = require("express");
const router = express.Router();
const controllers = require("../controllers/collegeController");

router.get("/test", (req, res) => {
	res.send("Successful test");
});

router.post("/functionup/colleges", controllers.createCollege);

module.exports = router;
