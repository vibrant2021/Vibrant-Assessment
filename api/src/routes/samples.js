/**
 * TODO: Implement POST /api/samples
 * - Validate body: sampleId (pattern), collectionDate (<= now), sampleType, priority
 * - Return 201 on success with created resource or echo, else 400 with details
 * (Stretch) add attachments upload route.
 */
const express = require('express');
const router = express.Router();

router.post('/samples', (_req, res) => {
  return res.status(501).json({ message: 'Not Implemented: POST /api/samples' });
});

module.exports = router;
