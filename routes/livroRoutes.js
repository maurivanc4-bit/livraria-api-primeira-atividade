const { Router } = require('express');
const controller = require('../controllers/LivroController');
const { autenticarToken, exigirRole } = require('../middlewares/authMiddleware');
const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Livros
 *     description: Consulta e cadastro de livros e comentários
 */

/**
 * @swagger
 * /api/v1/livros:
 *   get:
 *     tags: [Livros]
 *     summary: Listar livros
 *     responses:
 *       200:
 *         description: Lista de livros.
 *       500:
 *         description: Erro interno ao consultar os dados.
 */
router.get('/', (req, res, next) => controller.index(req, res, next));

/**
 * @swagger
 * /api/v1/livros/{id}:
 *   get:
 *     tags: [Livros]
 *     summary: Buscar livro por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         example: 1
 *     responses:
 *       200:
 *         description: Livro encontrado.
 *       404:
 *         description: Livro não localizado.
 */
router.get('/:id', (req, res, next) => controller.show(req, res, next));

/**
 * @swagger
 * /api/v1/livros:
 *   post:
 *     tags: [Livros]
 *     summary: Cadastrar livro (ADMIN)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/LivroEntrada' }
 *           example:
 *             titulo: A Hora da Estrela
 *             ano: 1977
 *             autor_id: 1
 *     responses:
 *       201:
 *         description: Livro cadastrado.
 *       400:
 *         description: Dados obrigatórios ausentes ou inválidos.
 *       401:
 *         description: Token ausente, inválido ou expirado.
 *       403:
 *         description: Apenas ADMIN pode cadastrar livros.
 */
router.post('/', autenticarToken, exigirRole('ADMIN'), (req, res, next) => controller.store(req, res, next));

/**
 * @swagger
 * /api/v1/livros/{id}/comentarios:
 *   post:
 *     tags: [Livros]
 *     summary: Adicionar comentário
 *     description: Permitido a usuários autenticados USER ou ADMIN.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ComentarioEntrada' }
 *           example:
 *             texto: Uma leitura marcante.
 *     responses:
 *       201:
 *         description: Comentário criado.
 *       400:
 *         description: Texto do comentário vazio ou inválido.
 *       401:
 *         description: Token ausente, inválido ou expirado.
 *       404:
 *         description: Livro não localizado.
 */
router.post('/:id/comentarios', autenticarToken, (req, res, next) => controller.storeComment(req, res, next));

module.exports = router;
