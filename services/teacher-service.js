

const teacherRepository = require('../persistency/repositories/teacher-repository');
const utility = require('./utility');

exports.getAllTeachers = async () => {
    return await teacherRepository.getAll()
}

exports.getTeacherByName = async (name) => {
    return await teacherRepository.getByName(name)
}

exports.getTeacherById = async (id) => {
    return await teacherRepository.getById(id)
}

exports.registerTeacher = async (newTeacher) => {
    if (utility.isTeacherExist(newTeacher)) {
        console.log('service : ',newTeacher)
        return await teacherRepository.register(newTeacher)
    } else {
        return {}
    }
}

exports.updateTeacherById = async (teacherId, newTeacher) => {
    if (utility.isTeacherExist(newTeacher)) {
        return await teacherRepository.update(teacherId, newTeacher)
    } else {
        return {}
    }
}

exports.deleteTeacherById = async (teacherId) => {
    return await teacherRepository.delete(teacherId)
}