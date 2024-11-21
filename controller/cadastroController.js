const Usuario = require('../model/cadastroModel');

// Função para cadastrar um novo usuário
const cadastrarUsuario = (req, res) => {
  const { cpf, nome, idade, endereco } = req.body;

  if (!cpf || !nome || !idade || !endereco) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  Usuario.cadastrarUsuario(cpf, nome, idade, endereco, (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar usuário:', err);  // Log de erro
      return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', id: result.insertId });
  });
};

// Função para consultar todos os usuários cadastrados
const consultarUsuarios = (req, res) => {
  Usuario.consultarUsuarios((err, results) => {
    if (err) {
      console.error('Erro ao consultar usuários:', err);  // Log de erro
      return res.status(500).json({ error: 'Erro ao consultar usuários' });
    }
    res.status(200).json(results);
  });
};

// Função para atualizar os dados de um usuário
const atualizarUsuario = (req, res) => {
  const { nome, idade, endereco } = req.body;
  const cpf = req.params.cpf;  // Extrai o CPF dos parâmetros da URL

  console.log('Atualizando usuário com CPF:', cpf);  // Log de debug
  console.log('Dados recebidos:', req.body);  // Log de debug

  if (!nome || !idade || !endereco) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  Usuario.atualizarUsuario(cpf, nome, idade, endereco, (err, result) => {
    if (err) {
      console.error('Erro ao atualizar usuário:', err);  // Log de erro
      return res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.status(200).json({ message: 'Usuário atualizado com sucesso' });
  });
};

// Função para excluir um usuário
const excluirUsuario = (req, res) => {
  const cpf = req.params.cpf;

  console.log('Excluindo usuário com CPF:', cpf);  // Log de debug

  Usuario.excluirUsuario(cpf, (err, result) => {
    if (err) {
      console.error('Erro ao excluir usuário:', err);  // Log de erro
      return res.status(500).json({ error: 'Erro ao excluir usuário' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  });
};

module.exports = {
  cadastrarUsuario,
  consultarUsuarios,
  atualizarUsuario,
  excluirUsuario
};
