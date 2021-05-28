'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Student, { through: 'murat_student_teacher', foreignKey: 'teacher_id' })
      this.belongsTo(models.Lecture, { as:'Specialty', foreignKey: 'lecture_id'})
    }
  };
  Teacher.init({
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
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        len: [2, 25]
      }
    },
    lastname: {
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
    tableName: 'murat_teachers',
    modelName: 'Teacher'
  });
  return Teacher;
  };