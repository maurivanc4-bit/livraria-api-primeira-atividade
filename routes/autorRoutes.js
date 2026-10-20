const { Router } = require('express');
const controller = require('../controllers/AutorController');
const { autenticarToken, exigirRole } = require('../middlewares/authMiddleware');
const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Autores
 *     description: Consulta e cadastro de autores
 */

/**
 * @swagger
 * /api/v1/autores:
 *   get:
 *     tags: [Autores]
 *     summary: Listar autores
 *     responses:
 *       200:
 *         description: Lista de autores.
 */
router.get('/', (req, res, next) => controller.index(req, res, next));

/**
 * @swagger
 * /api/v1/autores:
 *   post:
 *     tags: [Autores]
 *     summary: Cadastrar autor (ADMIN)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Autor' }
 *           example:
 *             nome: Clarice Lispector
 *             nacionalidade: Brasileira
 *     responses:
 *       201:
 *         description: Autor cadastrado.
 *       400:
 *         description: Nome do autor obrigatório.
 *       401:
 *         description: Token ausente, inválido ou expirado.
 *       403:
 *         description: Apenas ADMIN pode cadastrar autores.
 */
router.post('/', autenticarToken, exigirRole('ADMIN'), (req, res, next) => controller.store(req, res, next));

module.exports = router;
