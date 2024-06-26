const mongoose = require('mongoose');
const waitPort = require('wait-port');

module.exports = async function() {
  let params = {
    host: 'mongo',
    port: 27017, 
    output: 'silent',
    timeout: 30000
  };

  const open = await waitPort(params);
  if(open) {
    console.log('Banco de dados está pronto. Iniciando a aplicação...');

    try {
      await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Conexão com o banco de dados estabelecida com sucesso.');
      return mongoose;
    } catch (err) {
      console.error('Não foi possível conectar ao banco de dados:', err);
      process.exit(1);
    }

  } else {
    console.log('Não foi possível conectar ao banco de dados. Encerrando...');
    process.exit(1);
  }
};