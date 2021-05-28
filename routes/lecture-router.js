const express = require('express');
const router = express.Router();

const service = require('../services/lecture-service');
const utility = require('../services/utility');

router.get('/', async function(req, res, next) {
  //#swagger.tags = ['Lecture']
  //#swagger.description = 'GET all lectures with responsible people'
  const lectureList = await service.getAllLectures();

  if (lectureList) {
    /*
    #swagger.responses[200] = {
     schema: [{ $ref: '#/definitions/Lecture' }],
     description: 'An array of the all lectures'
    }
   */
    res.send(lectureList)
  }
  // #swagger.responses[404]
  else res.sendStatus(404);
  
});

router.get('/name/:name', async function (req, res, next) {
  //#swagger.tags = ['Lecture']
  //#swagger.description = 'GET lecture by firstname or lastname'
  const name = req.params.name;
  /*
  #swagger.parameters['name'] = {
    in: 'path',
    description: 'Lecture name existed in the database',
    required: true,
    type: 'string'
  }
  */
  const lecture = await service.getLectureByName(name);

  if (lecture) {
    /*
    #swagger.responses[200] = {
     schema: { $ref: '#/definitions/Lecture' },
     description: 'Lecture requested by id'
    }
   */
    res.send(lecture)
  }
  // #swagger.responses[404]
  else res.sendStatus(404);
});

router.get('/id/:id', async function (req, res, next) {
  //#swagger.tags = ['Lecture']
  //#swagger.description = 'GET lecture by id. If the lecture has no teacher associated then there is no result shown since it is inner join on Teacher table. /name/{lecture name} request shows all lectures regardless of teachers'
  const id = Number(req.params.id);
  /*
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'Lecture name existed in the database',
    required: true,
    type: 'integer'
  }
  */
  const lecture = await service.getLectureById(id);

  if (lecture) {
    /*
    #swagger.responses[200] = {
     schema: { $ref: '#/definitions/Lecture' },
     description: 'Lecture requested by id'
    }
   */
    res.send(lecture)
  }
  // #swagger.responses[404]
  else res.sendStatus(404);
});

router.post('/', async function (req, res, next) {
  /*
  #swagger.tags = ['Lecture']
  #swagger.description = 'Register a new lecture'
   */
  const newLecture = req.body;
  /*
  #swagger.parameters['newLecture'] = {
      in: 'body',
      description: "New lecture data",
      required: true,
      type: 'object',
      schema:{
      "name": "Mathematics"
      }
    } 
  */

  const result = await service.registerLecture(newLecture);

  if (!utility.isEmpty(result)){   
    /*
    #swagger.responses[201] = {
     schema: { $ref: '#/definitions/Lecture' },
     description: 'New registered lecture'
    }
   */ 
  res.status(201).send(newLecture);
  }
  // #swagger.responses[412]
  else res.status(412).send('There exists already a lecture with the same first and last name');
});

router.put('/:id', async function (req, res, next) {
  /*
    #swagger.tags = ['Lecture']
    #swagger.description = 'Update a stundet data'
  */
  const lectureId = Number(req.params.id);
  /* 
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Lecture id existed in the database',
      required: true,
      type: 'integer'
    }
  */
  const newLecture = req.body;
  /* 
    #swagger.parameters['newLecture'] = {
        in: 'body',
        description: 'New data for updating an existed lecture',
        required: true,
        type: 'object',
        schema:{
        "name": "Mathematics"
        }
    } 
  */
  const updatedLecture = await service.updateLectureById(lectureId, newLecture);
  /*
  #swagger.responses[201] = {
    schema: { $ref: '#/definitions/Lecture' },
    description: 'Updated lecture'
  }
  */ 
  if (!utility.isEmpty(updatedLecture)) res.status(201).send(updatedLecture)
  // #swagger.responses[404]
  else res.sendStatus(404);
});

router.delete('/:id', async function (req, res, next) {
  //#swagger.tags = ['Lecture']
  //#swagger.description = 'DELETE a lecture by id '
  const id = Number(req.params.id);
  /*
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'Lecture id existed in the database',
    required: true,
    type: 'integer'
  }
  */
  const result = await service.deleteLectureById(id);
  // #swagger.responses[200]
  // #swagger.description = 'The lecture is deleted'
  if (result) res.status(200).send(result)
  // #swagger.responses[404]
  else res.sendStatus(404);
});


module.exports = router;
