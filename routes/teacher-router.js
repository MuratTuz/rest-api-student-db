const express = require('express');
const router = express.Router();

const service = require('../services/teacher-service');
const utility = require('../services/utility');

router.get('/', async function(req, res, next) {
  //#swagger.tags = ['Teacher']
  //#swagger.description = 'GET all teachers'
  const teacherList = await service.getAllTeachers();

  if (teacherList) {
    /*
    #swagger.responses[200] = {
     schema: [{ $ref: '#/definitions/Teacher' }],
     description: 'An array of the all teachers'
    }
   */
    res.send(teacherList)
  }
  // #swagger.responses[404]
  else res.sendStatus(404);
  
});

router.get('/name/:name', async function (req, res, next) {
  //#swagger.tags = ['Teacher']
  //#swagger.description = 'GET teacher by firstname or lastname'
  const name = req.params.name;
  /*
  #swagger.parameters['name'] = {
    in: 'path',
    description: 'Teacher name existed in the database',
    required: true,
    type: 'string'
  }
  */
  const teacher = await service.getTeacherByName(name);

  if (teacher) {
    /*
    #swagger.responses[200] = {
     schema: { $ref: '#/definitions/Teacher' },
     description: 'Teacher requested by id'
    }
   */
    res.send(teacher)
  }
  // #swagger.responses[404]
  else res.sendStatus(404);
});

router.get('/id/:id', async function (req, res, next) {
  //#swagger.tags = ['Teacher']
  //#swagger.description = 'GET teacher by id. If the theacher has no lecture associated then there is no result shown since it is inner join on Lecture table. /name/{teacher name} request shows all teachers regardless of lecture_id'
  const id = Number(req.params.id);
  /*
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'Teacher name existed in the database',
    required: true,
    type: 'integer'
  }
  */
  const teacher = await service.getTeacherById(id);

  if (teacher) {
    /*
    #swagger.responses[200] = {
     schema: { $ref: '#/definitions/Teacher' },
     description: 'Teacher requested by id'
    }
   */
    res.send(teacher)
  }
  // #swagger.responses[404]
  else res.status(404).send('Either it does not exists such teacher id or it has not got lecture_id since inner joined with Lecture table');
});

router.post('/', async function (req, res, next) {
  /*
  #swagger.tags = ['Teacher']
  #swagger.description = 'Register a new teacher'
   */
  const newTeacher = req.body;
  /*
  #swagger.parameters['newTeacher'] = {
      in: 'body',
      description: "New teacher data",
      required: true,
      type: 'object',
      schema:{
      "firstname": "David",
      "lastname": "Lopez",
      "lecture_id": 2
      }
    } 
  */
    
  const result = await service.registerTeacher(newTeacher);

  if (!utility.isEmpty(result)){   
    /*
    #swagger.responses[201] = {
     schema: { $ref: '#/definitions/Teacher' },
     description: 'New registered teacher'
    }
   */ 
  res.status(201).send(newTeacher);
  }
  // #swagger.responses[412]
  else res.status(412).send('Either there exists already a teacher with the same first and last name or there is a teacher who gives already the same lecture');
});

router.put('/:id', async function (req, res, next) {
  /*
    #swagger.tags = ['Teacher']
    #swagger.description = 'Update a teacher data'
  */
  const teacherId = Number(req.params.id);
  /* 
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Teacher id existed in the database',
      required: true,
      type: 'integer'
    }
  */
  const newTeacher = req.body;
  /* 
  #swagger.parameters['newTeacher'] = {
    in: 'body',
    description: 'New data for updating an existed teacher',
    required: true,
    type: 'object',
    schema:{
      "firstname": "David",
      "lastname": "Lopez",
      "lecture_id": 2
      }
  } 
  */
  const updatedTeacher = await service.updateTeacherById(teacherId, newTeacher);
  /*
  #swagger.responses[201] = {
    schema: { $ref: '#/definitions/Teacher' },
    description: 'Updated teacher'
  }
  */ 
  if (!utility.isEmpty(updatedTeacher)) res.status(201).send(updatedTeacher)
  // #swagger.responses[404]
  else res.status(404).send('Either there exists already a teacher with the same first and last name or there is a teacher who gives already the same lecture');
});

router.delete('/:id', async function (req, res, next) {
  //#swagger.tags = ['Teacher']
  //#swagger.description = 'DELETE a teacher by id '
  const id = Number(req.params.id);
  /*
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'Teacher id existed in the database',
    required: true,
    type: 'integer'
  }
  */
  const result = await service.deleteTeacherById(id);
  // #swagger.responses[200]
  // #swagger.description = 'The teacher is deleted'
  if (result) res.status(200).send(result)
  // #swagger.responses[404]
  else res.sendStatus(404);
});


module.exports = router;
