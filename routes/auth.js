const express = require("express")
var router = express.Router();
const userModel = require("../models/users.model");
var bcrypt = require("bcrypt")
var jwt = require("jsonwebtoken")


module.exports = router;