

const express = require('express');
const router = express.Router();

const studentRouter = require('./student-router');
const teacherRouter = require('./teacher-router');
const lectureRouter = require('./lecture-router');

router.use('/students', studentRouter);
router.use('/teachers', teacherRouter);
router.use('/lectures', lectureRouter);

module.exports = router;
