'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recension extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({User}) {
      // define association here
      // this.belongsTo(User, {foreignKey: 'userId', as: 'user'});
    }
  };
  Recension.init({
    recension: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    rodId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Recension',
  });
  return Recension;
};