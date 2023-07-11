const User = require('./User');
const Stock = require('./Stock');
const OwnedStock = require('./OwnedStock');

// a stock belongs to a user
// this may need to be stock belongs to many user
// use the OwnedStock model as a through table


// Stock.belongsTo(User,{
//     foreignKey: 'user_id',
// })

// this sounds more practical
Stock.belongsToMany(User,{
    through: OwnedStock,
    foreignKey: 'stock_id'
/*     foreignKey: 'owner_id',
 */});

// a user can have many stocks
// this is 100% i checked the sequelize docs
User.belongsToMany(Stock,{
    through: OwnedStock,
    foreignKey: 'owner_id'
   
/*     foreignKey: 'user_id',
 */});

module.exports = { User, Stock, OwnedStock };
