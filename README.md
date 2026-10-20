# API Livraria — Livros e Autores

API REST desenvolvida em Node.js + Express, organizada em controllers, services, repositories, routes e middlewares.

## Requisitos
- Node.js 18 ou superior
- npm

## Instalação e execução
```bash
npm install
cp .env.example .env
npm start
```
No Windows PowerShell, se `cp` não funcionar, use `Copy-Item .env.example .env`.

Servidor: `http://localhost:3000`
- Swagger UI: `http://localhost:3000/docs`
- OpenAPI JSON: `http://localhost:3000/openapi.json` ou `http://localhost:3000/docs/api.json`
- Health check: `http://localhost:3000/health`

## Credenciais de laboratório
A base `database.txt` é criada automaticamente na primeira execução:
- ADMIN: `admin@livraria.com` / `admin123`
- USER: `leitor@gmail.com` / `leitor123`

As senhas são salvas usando BCrypt com fator de custo 10. O token JWT expira conforme `JWT_EXPIRES_IN` (padrão: 2h).

> A base `database.txt` é local e está no `.gitignore`. Para testar os usuários iniciais em um ambiente limpo, pare o servidor e apague `database.txt`; ela será recriada na próxima inicialização. Isso apaga os dados locais cadastrados.

## Testando autenticação no Swagger
1. Abra `/docs`.
2. Execute `POST /api/v1/auth/login` com uma das credenciais acima.
3. Copie apenas o valor de `token` da resposta.
4. Clique em **Authorize** e cole o token, sem escrever `Bearer ` (o Swagger adiciona o prefixo).
5. Teste as rotas protegidas.

## Matriz de acesso
| Endpoint | Acesso |
| --- | --- |
| `GET /api/v1/livros` | Público |
| `GET /api/v1/livros/{id}` | Público |
| `POST /api/v1/auth/register` | Público; cadastro sempre cria `USER` |
| `POST /api/v1/auth/login` | Público |
| `POST /api/v1/livros/{id}/comentarios` | USER ou ADMIN autenticado |
| `POST /api/v1/autores` | Somente ADMIN |
| `POST /api/v1/livros` | Somente ADMIN |

## Segurança
Defina `JWT_SECRET` como um segredo forte no ambiente antes de publicar ou usar fora do laboratório. O segredo padrão existe apenas para facilitar a execução local e não deve ser usado em produção. Não envie `.env` nem `database.txt` ao GitHub.

## Exemplos
Login:
```json
{ "email": "leitor@gmail.com", "senha": "leitor123" }
```
Cadastro de livro (ADMIN):
```json
{ "titulo": "A Hora da Estrela", "ano": 1977, "autor_id": 1 }
```
Comentário (USER ou ADMIN):
```json
{ "texto": "Uma leitura marcante." }
```
