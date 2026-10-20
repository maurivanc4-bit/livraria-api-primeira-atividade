require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const authRoutes = require('./routes/authRoutes');
const livroRoutes = require('./routes/livroRoutes');
const autorRoutes = require('./routes/autorRoutes');
const errorHandler = require('./middlewares/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'API Livraria - Livros e Autores',
      version: '1.1.0',
      description: 'API REST com autenticação JWT, senhas BCrypt e autorização por perfil (RBAC). Cadastro público cria usuários USER. Para rotas protegidas, use Authorize e informe o token JWT.'
    },
    servers: [{ url: 'http://localhost:3000', description: 'Servidor local' }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', description: 'Informe somente o token JWT obtido no login.' }
      },
      schemas: {
        UsuarioCadastro: {
          type: 'object', required: ['nome', 'email', 'senha'],
          properties: {
            nome: { type: 'string', example: 'Maria Silva' },
            email: { type: 'string', format: 'email', example: 'maria@gmail.com' },
            senha: { type: 'string', format: 'password', minLength: 6, example: 'senha123' }
          }
        },
        Login: {
          type: 'object', required: ['email', 'senha'],
          properties: {
            email: { type: 'string', format: 'email', example: 'admin@livraria.com' },
            senha: { type: 'string', format: 'password', example: 'admin123' }
          }
        },
        Autor: {
          type: 'object', required: ['nome'],
          properties: { id: { type: 'integer', example: 1 }, nome: { type: 'string', example: 'Clarice Lispector' }, nacionalidade: { type: 'string', example: 'Brasileira' } }
        },
        LivroEntrada: {
          type: 'object', required: ['titulo', 'autor_id'],
          properties: { titulo: { type: 'string', example: 'A Hora da Estrela' }, ano: { type: 'integer', example: 1977 }, autor_id: { type: 'integer', example: 1 } }
        },
        ComentarioEntrada: {
          type: 'object', required: ['texto'],
          properties: { texto: { type: 'string', example: 'Uma leitura marcante.' } }
        },
        Erro: { type: 'object', properties: { erro: { type: 'string', example: 'Credenciais inválidas.' } } }
      }
    }
  },
  apis: ['./routes/*.js']
};
const openapiSpec = swaggerJsdoc(swaggerOptions);
app.get('/docs/api.json', (req, res) => res.json(openapiSpec));
app.get('/openapi.json', (req, res) => res.json(openapiSpec));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec, {
  swaggerOptions: { persistAuthorization: true }
}));

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/livros', livroRoutes);
app.use('/api/v1/autores', autorRoutes);
app.use(errorHandler);

if (require.main === module) {
  app.listen(PORT, () => console.log(`Livraria API rodando em http://localhost:${PORT} — documentação: /docs`));
}
module.exports = app;
