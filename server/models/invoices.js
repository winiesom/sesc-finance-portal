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
    type: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    paid: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'invoice',
  });
  return invoice;
};