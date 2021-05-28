

const studentRepository = require('../persistency/repositories/student-repository');
const utility = require('./utility');

exports.getAllStudents = async () => {
    return await studentRepository.getAll()
}

exports.getStudentByName = async (name) => {
    return await studentRepository.getByName(name)
}

exports.getStudentById = async (id) => {
    return await studentRepository.getById(id)
}

exports.registerStudent = async (newStudent) => {
    if (utility.isStudentExist(newStudent)) {
        return await studentRepository.register(newStudent)
    } else {
        return {}
    }
}

exports.updateStudentById = async (studentId, newStudent) => {
    if (utility.isStudentExist(newStudent)) {
        return await studentRepository.update(studentId, newStudent)
    } else {
        return {}
    }
}

exports.deleteStudentById = async (studentId) => {
    return await studentRepository.delete(studentId)
}