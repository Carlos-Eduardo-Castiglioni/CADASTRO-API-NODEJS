const express = require('express');
const router = express.Router();
const cadastroController = require('../controller/cadastroController');

// Rota para cadastrar um novo usuário
router.post('/cadastrar', cadastroController.cadastrarUsuario);

// Rota para consultar todos os usuários
router.get('/consultar', cadastroController.consultarUsuarios);

// Rota para atualizar um usuário pelo ID
router.put('/atualizar/:cpf', cadastroController.atualizarUsuario);

// Rota para excluir um usuário pelo ID
router.delete('/excluir/:cpf', cadastroController.excluirUsuario);

module.exports = router;
