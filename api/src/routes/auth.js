/**
 * TODO: Implement POST /api/auth/login
 * - Body: { email, password }
 * - Validate user with DB (Knex + bcryptjs)
 * - Return { token } (JWT) on success
 */
const express = require('express');
const router = express.Router();

router.post('/auth/login', (_req, res) => {
  return res.status(501).json({ message: 'Not Implemented: POST /api/auth/login' });
});

module.exports = router;
