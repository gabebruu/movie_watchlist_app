// a pasta lib é para bibliotecas de código reutilizáveis
// relacionadas à configuração e conexão com o banco de dados
// aqui na mongodb se configura a conexão com o MongoDB Atlas

import mongoose from 'mongoose'; // esse primeiro imoport é obrigatório para usar o mongoose 
const MONGODB_URI = process.env.MONGODB_URI; // essa constante lê a variável de ambiente do ficheiro .env

if (!MONGODB_URI) { // o if verifica se a variável de ambiente está definida, 
  throw new Error('Por favor define a variável MONGODB_URI no ficheiro .env'); // se não estiver definida, lança um erro
}

let cached = global.mongoose; // essa variável armazena a conexão em cache para evitar múltiplas conexões

if (!cached) { // o if verifica se a conexão em cache já existe 
  cached = global.mongoose = { conn: null, promise: null }; // se não existir, inicializa o cache com conn e promise como null 
}

async function connectDB() { //essa função assíncrona conecta ao banco de dados MongoDB Atlas 
  if (cached.conn) return cached.conn; // se a conexão em cache já existir, retorna-a imediatamente

  if (!cached.promise) { // se a conexão em cache não existir, cria uma nova promessa de conexão
    const opts = { bufferCommands: false }; // a constante opts define opções para a conexão, desativando o buffer de comandos, o buffer de comandos é uma funcionalidade do mongoose que armazena comandos quando a conexão está indisponível
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => { // a promessa conecta ao MongoDB Atlas usando a URI e as opções definidas
      console.log('Conectado ao MongoDB Atlas'); //
      return mongoose; // quando a conexão é bem-sucedida, registra uma mensagem no console e retorna o objeto mongoose conectado
    });
  }

  try { // o bloco try-catch tenta aguardar a promessa de conexão e armazenar o resultado na conexão em cache
    cached.conn = await cached.promise; // se a conexão falhar, a promessa em cache é redefinida para null e o erro é lançado
  } catch (e) { // captura qualquer erro que ocorra durante a conexão
    cached.promise = null; // redefine a promessa em cache para null em caso de erro
    throw e; // lança o erro para ser tratado em outro lugar
  }

  return cached.conn; // retorna a conexão em cache estabelecida
}

export default connectDB; // exporta a função connectDB para que possa ser usada em outras partes da aplicação