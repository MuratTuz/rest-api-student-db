const express = require('express');
const router = express.Router();

const service = require('../services/student-service');
const utility = require('../services/utility');

router.get('/', async function(req, res, next) {
  //#swagger.tags = ['Student']
  //#swagger.description = 'GET all students'
  const studentList = await service.getAllStudents();

  if (studentList) {
    /*
    #swagger.responses[200] = {
     schema: [{ $ref: '#/definitions/Student' }],
     description: 'An array of the all students'
    }
   */
    res.send(studentList)
  }
  // #swagger.responses[404]
  else res.sendStatus(404);
  
});

router.get('/name/:name', async function (req, res, next) {
  //#swagger.tags = ['Student']
  //#swagger.description = 'GET student by firstname or lastname'
  const name = req.params.name;
  /*
  #swagger.parameters['name'] = {
    in: 'path',
    description: 'Student name existed in the database',
    required: true,
    type: 'string'
  }
  */
  const student = await service.getStudentByName(name);

  if (student) {
    /*
    #swagger.responses[200] = {
     schema: { $ref: '#/definitions/Student' },
     description: 'Student requested by id'
    }
   */
    res.send(student)
  }
  // #swagger.responses[404]
  else res.sendStatus(404);
});

router.get('/id/:id', async function (req, res, next) {
  //#swagger.tags = ['Student']
  //#swagger.description = 'GET student by id'
  const id = Number(req.params.name);
  /*
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'Student name existed in the database',
    required: true,
    type: 'integer'
  }
  */
  const student = await service.getStudentById(id);

  if (student) {
    /*
    #swagger.responses[200] = {
     schema: { $ref: '#/definitions/Student' },
     description: 'Student requested by id'
    }
   */
    res.send(student)
  }
  // #swagger.responses[404]
  else res.sendStatus(404);
});

router.post('/', async function (req, res, next) {
  /*
  #swagger.tags = ['Student']
  #swagger.description = 'Register a new student'
   */
  const newStudent = req.body;
  /*
  #swagger.parameters['newStudent'] = {
      in: 'body',
      description: "New student data",
      required: true,
      type: 'object',
      schema:{
      "firstname": "Tom",
      "lastname": "Clement",
      "classname": "B2",
      "age": 7
      }
    } 
  */
    
  console.log('reouter ',req)
  const result = await service.registerStudent(newStudent);

  if (!utility.isEmpty(result)){   
    /*
    #swagger.responses[201] = {
     schema: { $ref: '#/definitions/Student' },
     description: 'New registered student'
    }
   */ 
  res.status(201).send(newStudent);
  }
  // #swagger.responses[412]
  else res.status(412).send('There exists already a student with the same first and last name');
});

router.put('/:id', async function (req, res, next) {
  /*
    #swagger.tags = ['Student']
    #swagger.description = 'Update a stundet data'
  */
  const studentId = Number(req.params.id);
  /* 
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Student id existed in the database',
      required: true,
      type: 'integer'
    }
  */
  const newStudent = req.body;
  /* 
  #swagger.parameters['newStudent'] = {
    in: 'body',
    description: 'New data for updating an existed student',
    required: true,
    type: 'object',
    schema:{
          "firstname": "Tom",
          "lastname": "Clement",
          "classname": "B2",
          "age": 7
      }
  } 
  */

  console.log(req.params)
  console.log(req.body)

  const updatedStudent = await service.updateStudentById(studentId, newStudent);
  /*
  #swagger.responses[201] = {
    schema: { $ref: '#/definitions/Student' },
    description: 'Updated student'
  }
  */ 
  if (!utility.isEmpty(updatedStudent)) res.status(201).send(updatedStudent)
  // #swagger.responses[404]
  else res.sendStatus(404);
});

router.delete('/:id', async function (req, res, next) {
  //#swagger.tags = ['Student']
  //#swagger.description = 'DELETE a student by id '
  const id = Number(req.params.id);
  /*
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'Student id existed in the database',
    required: true,
    type: 'integer'
  }
  */
  const result = await service.deleteStudentById(id);
  // #swagger.responses[200]
  // #swagger.description = 'The student is deleted'
  if (result) res.status(200).send(result)
  // #swagger.responses[404]
  else res.sendStatus(404);
});


module.exports = router;
