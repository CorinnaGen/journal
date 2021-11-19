var express = require('express');
var router = express.Router();
const db = require("../model/helper");
var bcrypt = require("bcrypt");
const saltRounds = 10;
require("dotenv").config();
var jwt = require("jsonwebtoken");

//this I need for the login endpoint
const supersecret = process.env.SUPER_SECRET;

//REGISTRATION ENDPOINT

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    await db(
      `INSERT INTO users (username, email, password) VALUES ("${username}", "${email}", "${hash}")`
    );

    res.send({ message: "Registration done!" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

//LOGIN ENDPOINT





router.get('/', function(req, res, next) {
  res.send('');
});

module.exports = router;
