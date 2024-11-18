// Importa as dependências necessárias
const express = require('express');
const cadastroRoutes = require('./web/cadastroRoutes');  // Importa as rotas de usuário

// Cria a instância do aplicativo Express
const app = express();

// Usa express.json() para interpretar o corpo das requisições como JSON
app.use(express.json());  // express.json() substitui o body-parser para tratar dados JSON

// Usa as rotas de usuário com o prefixo '/api'
app.use('/api', cadastroRoutes);

// Configuração da porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);  // Exibe no console a porta em que o servidor está rodando
});
