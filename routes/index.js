const express = require('express');
const router = express.Router();

const studentRouter = require('./student-router');


/* GET home page. */
router.get('/students', studentRouter);

module.exports = router;
