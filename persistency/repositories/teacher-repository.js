

const db = require('../models'); // no need to assert models/index.js
const { Op } = require("sequelize");

exports.getAll = async () => {
    // if { raw: true } this object is used inside findAll then we get unfiltered results
    // that toJSON() func. inside movie model does not make sense.
    return await db.Teacher.findAll({
        include: {
            model: db.Lecture, // outer left join
            as: 'Specialty',
            attributes: ['name']
        },
        attributes: ['id','firstname', 'lastname'],
        order: [
            ['id', 'DESC']
        ]
    });
}

exports.getById = async (id) => {
    return await db.Teacher.findOne({
        include: {
            model: db.Lecture,
            required: true, // inner join
            as: 'Specialty',
            attributes: ['name']
        },
        where: { id }
    })
}

// find teacher for firstname or lastname
exports.getByName = async (name) => {
    const firstname = name;
    const lastname = name;
    return await db.Teacher.findAll({
        include: {
            model: db.Lecture, // outer left join
            as: 'Specialty',
            attributes: ['name']
        },
    where: {
        [Op.or]: [
            { firstname },
            { lastname }
        ]
    }
});
}

exports.register = async ({ firstname, lastname, lecture_id }) => {
    const lecture = await db.Lecture.findOne({ where: { id } })
    // if there is no lecture associated to a teacher yet then register the teacher
    if (!lecture) {
        const[teacher, created] = await db.Teacher.findOrCreate({
        // if there exists a teacher who has the same name existed in database, so that refuse it
        where: {
            [Op.and]: [ 
                { firstname },
                { lastname }
            ]
        },
        defaults: { firstname, lastname, lecture_id } 
        });
        if (created) return teacher
        else return {}
    }
    else return {}
}

exports.update = async (id, { firstname, lastname, lecture_id }) => {
    const lecture = await db.Lecture.findOne({ where: { id } })
    // if there is no lecture associated to a teacher yet then register the teacher
    if (!lecture) {
        const numberOfRow = await db.Teacher.update({ firstname, lastname, lecture_id }, {
        where: { id }
        });
        // Affected row's number
        if (numberOfRow) return await db.Teacher.findOne({ where: { id } })
        else return {}
    }
    else return {}
}

exports.delete = async (id) => {
    const teacher = await db.Teacher.findOne({ where: { id } });
    if (teacher !== null) {
        await db.Teacher.destroy({ where: { id } });
        return { 'The teacher register has been deleted': teacher };
    } else {
        return {}
    }

}
