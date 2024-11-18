// Importa a biblioteca mysql2 para interagir com o banco de dados MySQL
const mysql = require('mysql2');

// Configuração da conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',  // Endereço do servidor do banco de dados (aqui está configurado para localhost)
  user: 'root',       // Usuário do banco de dados (substitua conforme sua configuração)
  password: '',       // Senha do usuário (substitua conforme sua configuração)
  database: 'cadastro_db'  // Nome do banco de dados (substitua com o nome do seu banco)
});

// Estabelece a conexão com o banco de dados
db.connect((err) => {
  if (err) {
    // Se houver erro ao conectar, exibe a mensagem de erro no console
    console.error('Erro ao conectar ao banco de dados: ' + err.stack);
    return;
  }
  // Se a conexão for bem-sucedida, exibe a mensagem no console
  console.log('Conectado ao banco de dados MySQL!');
});

// Funções para interagir com o banco de dados

// Função para cadastrar um novo usuário
const cadastrarUsuario = (cpf, nome, idade, endereco, callback) => {
  // Definindo a consulta SQL para inserir um novo usuário na tabela 'usuarios'
  const query = 'INSERT INTO usuarios (cpf, nome, idade, endereco) VALUES (?, ?, ?, ?)';
  
  // Executa a consulta SQL, passando os dados como parâmetros
  db.query(query, [cpf, nome, idade, endereco], (err, result) => {
    // Chama o callback, retornando o erro (se houver) e o resultado da consulta
    callback(err, result);
  });
};

// Função para consultar todos os usuários cadastrados
const consultarUsuarios = (callback) => {
  // Definindo a consulta SQL para selecionar todos os registros da tabela 'usuarios'
  const query = 'SELECT * FROM usuarios';
  
  // Executa a consulta SQL
  db.query(query, (err, results) => {
    // Chama o callback, retornando o erro (se houver) e os resultados da consulta
    callback(err, results);
  });
};

// Função para atualizar os dados de um usuário específico
const atualizarUsuario = (cpf, nome, idade, endereco, callback) => {
  // Definindo a consulta SQL para atualizar os dados de um usuário na tabela 'usuarios'
  const query = 'UPDATE usuarios SET cpf = ?, nome = ?, idade = ?, endereco = ? WHERE id = ?';
  
  // Executa a consulta SQL, passando os dados atualizados e o id do usuário
  db.query(query, [cpf, nome, idade, endereco,], (err, result) => {
    // Chama o callback, retornando o erro (se houver) e o resultado da atualização
    callback(err, result);
  });
};

// Função para excluir um usuário específico
const excluirUsuario = (cpf, callback) => {
  // Definindo a consulta SQL para excluir um usuário da tabela 'usuarios' baseado no id
  const query = 'DELETE FROM usuarios WHERE id = ?';
  
  // Executa a consulta SQL, passando o id do usuário a ser excluído
  db.query(query, [cpf], (err, result) => {
    // Chama o callback, retornando o erro (se houver) e o resultado da exclusão
    callback(err, result);
  });
};

// Exporta as funções para que possam ser usadas em outras partes do código
module.exports = {
  cadastrarUsuario,  // Exporta a função para cadastrar usuário
  consultarUsuarios, // Exporta a função para consultar todos os usuários
  atualizarUsuario,  // Exporta a função para atualizar um usuário
  excluirUsuario     // Exporta a função para excluir um usuário
};
