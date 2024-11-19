// Importa o modelo que contém as funções para interagir com o banco de dados
const Usuario = require('../model/cadastroModel');


// Função para cadastrar um novo usuário
const cadastrarUsuario = (req, res) => {
// Extrai os dados enviados no corpo da requisição (JSON)
const { cpf, nome, idade, endereco } = req.body;

// Verifica se todos os campos obrigatórios foram preenchidos
if (!cpf || !nome || !idade || !endereco) {
    // Se algum campo estiver faltando, retorna um erro
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
}

// Chama a função do modelo para cadastrar o usuário no banco de dados
Usuario.cadastrarUsuario(cpf, nome, idade, endereco, (err, result) => {
    if (err) {
    // Caso ocorra um erro ao tentar cadastrar, retorna erro 500 (Erro interno do servidor)
    return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
    // Se o cadastro for bem-sucedido, retorna uma resposta com código 201 (Criado)
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', id: result.insertId });
});
};

// Função para consultar todos os usuários cadastrados
const consultarUsuarios = (req, res) => {
// Chama a função do modelo para recuperar todos os usuários cadastrados
Usuario.consultarUsuarios((err, results) => {
    if (err) {
    // Se ocorrer um erro na consulta, retorna erro 500 (Erro interno do servidor)
    return res.status(500).json({ error: 'Erro ao consultar usuários' });
    }
    // Se a consulta for bem-sucedida, retorna os dados dos usuários em formato JSON
    res.status(200).json(results);
});
};

// Função para atualizar os dados de um usuário
const atualizarUsuario = (req, res) => {
// Extrai os dados do usuário enviados no corpo da requisição (JSON)
const { cpf, nome, idade, endereco } = req.body;

// Chama a função do modelo para atualizar os dados do usuário no banco
Usuario.atualizarUsuario(id, cpf, nome, idade, endereco, (err, result) => {
    if (err) {
    // Se ocorrer um erro ao tentar atualizar, retorna erro 500 (Erro interno do servidor)
    return res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
    // Se nenhum usuário foi afetado, significa que o ID não existe no banco
    if (result.affectedRows === 0) {
    // Retorna erro 404 (Não encontrado) se o usuário não for encontrado
    return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    // Se a atualização for bem-sucedida, retorna uma mensagem de sucesso
    res.status(200).json({ message: 'Usuário atualizado com sucesso' });
});
};

// Função para excluir um usuário
const excluirUsuario = (req, res) => {
// Extrai o ID do usuário da URL da requisição
const { cpf } = req.params;

// Chama a função do modelo para excluir o usuário no banco de dados
Usuario.excluirUsuario(cpf, (err, result) => {
    if (err) {
    // Se ocorrer um erro ao tentar excluir, retorna erro 500 (Erro interno do servidor)
    return res.status(500).json({ error: 'Erro ao excluir usuário' });
    }
    // Se nenhum usuário foi afetado, significa que o ID não existe no banco
    if (result.affectedRows === 0) {
    // Retorna erro 404 (Não encontrado) se o usuário não for encontrado
    return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    // Se a exclusão for bem-sucedida, retorna uma mensagem de sucesso
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
});
};

// Exporta as funções para serem usadas em outros arquivos, como as rotas
module.exports = {
cadastrarUsuario,
consultarUsuarios,
atualizarUsuario,
excluirUsuario
};
