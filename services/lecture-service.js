

const lectureRepository = require('../persistency/repositories/lecture-repository');
const utility = require('./utility');

exports.getAllLectures = async () => {
    return await lectureRepository.getAll()
}

exports.getLectureByName = async (name) => {
    return await lectureRepository.getByName(name)
}

exports.getLectureById = async (id) => {
    return await lectureRepository.getById(id)
}

exports.registerLecture = async (newLecture) => {
    if (utility.isLectureExist(newLecture)) {
        return await lectureRepository.register(newLecture)
    } else {
        return {}
    }
}

exports.updateLectureById = async (lectureId, newLecture) => {
    if (utility.isLectureExist(newLecture)) {
        return await lectureRepository.update(lectureId, newLecture)
    } else {
        return {}
    }
}

exports.deleteLectureById = async (lectureId) => {
    return await lectureRepository.delete(lectureId)
}