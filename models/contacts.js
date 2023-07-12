'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contacts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association 
      // Contacts.belongsTo(models.Users, {foreignKey: 'userID'})
    }
  }
  Contacts.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },  
    userID: DataTypes.INTEGER,
    contact: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Contacts',
  });

  Contacts.associate = (models) => {
    Contacts.belongsTo(models.Users, {
      foreignKey : 'userID',
      targetKey: 'id'
    })
  };

  return Contacts;
};