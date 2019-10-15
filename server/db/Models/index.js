const User = require('./User');
const ContactMessage = require('./ContactMessage');

User.hasMany(ContactMessage);
ContactMessage.belongsTo(User);

module.exports = {
    User,
    ContactMessage,
};
