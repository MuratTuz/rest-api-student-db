'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Lecture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Teacher, { as: 'The Responsible', foreignKey: 'lecture_id'})  // hasOne function create the foreignKey in Teacher model 
      this.belongsToMany(models.Student, { through: 'murat_student_lecture', foreignKey: 'lecture_id' })
    }
  };
  Lecture.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
      // Comments can only be added to columns in MySQL, MariaDB, PostgreSQL and MSSQL
      comment: 'This uuid is used as an extra id, so this is not a primary key or primary id'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        len: [2, 25]
      }
    }
  }, {
    sequelize,
    tableName: 'murat_lectures',
    modelName: 'Lecture'
  });
  return Lecture;
  };