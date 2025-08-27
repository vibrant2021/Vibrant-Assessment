/**
 * TODO: Implement POST /api/samples
 * - Validate body: sampleId (pattern), collectionDate (<= now), sampleType, priority
 * - Return 201 on success with created resource or echo, else 400 with details
 * (Stretch) add attachments upload route.
 */
const express = require('express');
const router = express.Router();

// Mock lab samples data
const mockSamples = [];

router.post('/samples', (_req, res) => {
  const { sampleId, collectionDate, sampleType, priority } = req.body;

  // Validation: check required fields
  if (!sampleId || !collectionDate || !sampleType || !priority) {
  return res.status(400).json({ message: 'Missing required fields' });
}
  // Validation: check collectionDate
  const now = new Date();
  const collected = new Date(collectionDate);
  if (collected > now) {
    return res.status(400).json({ message: 'Collection date cannot be in the future' });
}

  // Create new sample record
  const newSample = {
    id: mockSamples.length + 1,
    sampleId,
    collectionDate,
    sampleType,
    priority
};

mockSamples.push(newSample);
return res.status(201).json(newSample);
});


module.exports = router;
