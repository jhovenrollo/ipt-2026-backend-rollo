const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: false
    }
);

const db = {};
db.sequelize = sequelize;
db.Account = require('../accounts/account.model')(sequelize);
db.RefreshToken = require('../accounts/refresh-token.model')(sequelize);

// Relations
db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
db.RefreshToken.belongsTo(db.Account);

sequelize.sync({ alter: true })
    .then(() => console.log('Database synced'))
    .catch(err => console.error('DB sync error:', err));

module.exports = db;