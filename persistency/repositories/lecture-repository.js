

const db = require('../models'); // no need to assert models/index.js
const { Op } = require("sequelize");

exports.getAll = async () => {
    // if { raw: true } this object is used inside findAll then we get unfiltered results
    // that toJSON() func. inside movie model does not make sense.
    return await db.Lecture.findAll({
        include: {
            model: db.Teacher, // outer left join
            as: 'The Responsible',
            attributes: ['firstname', 'lastname']
        },
        attributes: ['id','name'],
        order: [
            ['id', 'DESC']
        ]
    });
}

exports.getById = async (id) => {
    return await db.Lecture.findOne({
        include: {
            model: db.Teacher,
            required: true, // inner join
            as: 'The Responsible',
            attributes: ['firstname', 'lastname']
        },
        where: { id }
    })
}

// find lecture by  name
exports.getByName = async (name) => {
    return await db.Lecture.findAll({
        include: {
            model: db.Teacher, // outer left join since there is requeired:true
            as: 'The Responsible',
            attributes: ['firstname', 'lastname']
        },
        where: { name }
    });
}

exports.register = async ({ name }) => {
    const[lecture, created] = await db.Lecture.findOrCreate({
        // if there exists a lecture which has the same name existed in database, so that refuse it
        where: { name },
        defaults: { name } 
        });
    if (created) {
        return lecture;
    } else {
        return {}
        } 
}

exports.update = async (id, { name }) => {    
    const numberOfRow = await db.Lecture.update({ name }, {
    where: { id }
    });
    // Affected row's number
    if (numberOfRow) return await db.Lecture.findOne({ where: { id } });
    else return {}
}

exports.delete = async (id) => {
    const lecture = await db.Lecture.findOne({ where: { id } });
    if (lecture !== null) {
        await db.Lecture.destroy({ where: { id } });
        return { 'The lecture register has been deleted': lecture };
    } else {
        return {}
    }

}
