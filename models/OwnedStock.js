const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class OwnedStock extends Model{}

OwnedStock.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
        owner_id:{
            type: DataTypes.INTEGER,
            references:{
                model: 'user',
                key: 'id'
            }
        },
        stock_id:{
            type: DataTypes.INTEGER,
            references:{
                model: 'stock',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'ownedstock',
      }
)
module.exports = OwnedStock;