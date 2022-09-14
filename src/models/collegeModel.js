const mongoose = require("mongoose");

const CollegeModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Please provide a name",
      trim: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: "Please provide a fullName",
      trim: true,
    },
    logoLink: {
      type: String,
      required: "Please provide a logoLink",
      trim: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("College", CollegeModel);
