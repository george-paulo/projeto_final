const mongoose = require('mongoose');

const ConsultoriaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  texto: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Consultoria', ConsultoriaSchema);