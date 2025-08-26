/**
 * TODO: Implement GET /api/maintenance/:equipmentId
 * - Protect with requireAuth
 * - Validate equipmentId (positive integer) and query params: page/pageSize
 * - Query with Knex; return { equipment, records, page, pageSize, total }
 * - Sort by performed_at DESC
 */
const express = require('express');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/maintenance/:equipmentId', requireAuth, (_req, res) => {
  return res.status(501).json({ message: 'Not Implemented: GET /api/maintenance/:equipmentId' });
});

module.exports = router;
