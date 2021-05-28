

exports.isEmpty = (obj) => {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

exports.isStudentExist = ({ firstname, lastname, classname, age }) => {
    if (firstname && lastname && classname && age) {
        return true;
    } else {
        return false;
    }
}

exports.isTeacherExist = ({ firstname, lastname }) => {
    if (firstname && lastname) {
        return true;
    } else {
        return false;
    }
}

exports.isLectureExist = ({ name }) => {
    if (name) {
        return true;
    } else {
        return false;
    }
}
