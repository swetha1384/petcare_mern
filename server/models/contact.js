const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name : 'String',
  email : 'String',
  review : 'String',

});

const ContactModel = mongoose.model('contact', contactSchema);

module.exports = ContactModel;
