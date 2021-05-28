

const db = require('../models'); // no need to assert models/index.js
const { Op } = require("sequelize");

const includeWithoutJoinTable = 
         [
            {
            model: db.Lecture, // outer left join
            as: 'Courses',
            through: {  // not to show join table
                attributes: []
            },
            attributes: ['name']
        },
        {
            model: db.Teacher, // outer left join
            as: 'Teachers',
            through: { // not to show join table
                attributes: []
            },
            attributes: ['firstname', 'lastname'],
            }
        ];
        

exports.getAll = async () => {
    // if { raw: true } this object is used inside findAll then we get unfiltered results
    // that toJSON() func. inside movie model does not make sense.
    return await db.Student.findAll({
        include: includeWithoutJoinTable,
        attributes: ['id','firstname', 'lastname', 'classname', 'age'],
        order: [
            ['id', 'DESC']
        ]
    });
}

exports.getById = async (id) => {
    return await db.Student.findOne({
        include: includeWithoutJoinTable,
        where: { id }
    })
}

// find student for firstname or lastname
exports.getByName = async (name) => {
    const firstname = name;
    const lastname = name;
    return await db.Student.findAll({
        include: includeWithoutJoinTable,
        where: {
            [Op.or]: [
                { firstname },
                { lastname }
            ]
        }
    });
}

exports.register = async ({ firstname, lastname, classname, age }) => {
    const[student, created] = await db.Student.findOrCreate({
        // if there exists a student who has the same name existed in database, so that refuse it
        where: {
            [Op.and]: [ 
                { firstname },
                { lastname }
            ]
        },
        defaults: { firstname, lastname, classname, age }
        });
    if (created) {
        return student;
    } else {
        return {}
        } 
}

exports.update = async (id, {firstname, lastname, classname, age}) => {    
    const numberOfRow = await db.Student.update({firstname, lastname, classname, age}, {
    where: { id }
    });
    // Affected row's number
    if (numberOfRow) return await db.Student.findOne({ where: { id } });
    else return {}
}

exports.delete = async (id) => {
    const student = await db.Student.findOne({ where: { id } });
    if (student !== null) {
        await db.Student.destroy({ where: { id } });
        return { 'The student register has been deleted': student };
    } else {
        return {}
    }

}
