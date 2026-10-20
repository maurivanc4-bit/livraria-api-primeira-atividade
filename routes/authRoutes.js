const { Router } = require('express');
const controller = require('../controllers/AuthController');
const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Autenticação
 *     description: Cadastro e login de usuários
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     tags: [Autenticação]
 *     summary: Cadastrar usuário
 *     description: Cadastro público. Por segurança, o perfil é sempre USER; o campo role enviado pelo cliente é ignorado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioCadastro'
 *           example:
 *             nome: Maria Silva
 *             email: maria@gmail.com
 *             senha: senha123
 *     responses:
 *       201:
 *         description: Usuário cadastrado sem expor o hash da senha.
 *       400:
 *         description: Campos inválidos ou ausentes.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Erro' }
 *       409:
 *         description: E-mail já cadastrado.
 */
router.post('/register', (req, res, next) => controller.register(req, res, next));

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags: [Autenticação]
 *     summary: Entrar e obter JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Login' }
 *           example:
 *             email: admin@livraria.com
 *             senha: admin123
 *     responses:
 *       200:
 *         description: Login realizado; copie o token e clique em Authorize.
 *       400:
 *         description: E-mail ou senha ausentes.
 *       401:
 *         description: Credenciais inválidas.
 */
router.post('/login', (req, res, next) => controller.login(req, res, next));

module.exports = router;
