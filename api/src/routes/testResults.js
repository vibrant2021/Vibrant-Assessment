/**
 * TODO: Implement test results endpoints
 * - GET /api/test-results
 * - PATCH /api/test-results/:id {status}
 * - (Stretch) POST /api/test-results with Idempotency-Key header
 * Include validation & error handling. Frontend uses optimistic updates.
 */
const express = require('express');
const router = express.Router();

router.get('/test-results', (_req, res) => {
  return res.status(501).json({ message: 'Not Implemented: GET /api/test-results' });
});

router.patch('/test-results/:id', (_req, res) => {
  return res.status(501).json({ message: 'Not Implemented: PATCH /api/test-results/:id' });
});

// (Stretch)
router.post('/test-results', (_req, res) => {
  return res.status(501).json({ message: 'Not Implemented: POST /api/test-results' });
});

module.exports = router;
