const conn = require('../conn');
const Sequelize = require('sequelize');

const ContactMessage = conn.define('contactmessage', {
    message: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

module.exports = ContactMessage;
