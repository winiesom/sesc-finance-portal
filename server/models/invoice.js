'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  invoice.init({
    account_id: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    type: DataTypes.INTEGER,
    reference: DataTypes.STRING,
    paid: DataTypes.BOOLEAN,
    book_id: DataTypes.INTEGER,
    course_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'invoice',
  });
  return invoice;
};