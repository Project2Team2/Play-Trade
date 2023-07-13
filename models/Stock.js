// stock model
// price, amount of shares owned
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Stock extends Model{}

Stock.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          symbol: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate:{
            isDecimal: true
            }
        },
        // shares_owned: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     validate:{
        //         isInt: true
        //     }
        // },
        /* user_id:{
            type: DataTypes.INTEGER,
            references:{
                model: 'user',
                key: 'id'
            }
        } */
         
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'stock',
      }
)
module.exports = Stock;