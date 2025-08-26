/**
 * TODO: Implement JWT auth middleware.
 * - Read Authorization: Bearer <token>
 * - Verify with jsonwebtoken
 * - Attach payload to req.user
 * - Call next() or return 401
 */
function requireAuth(_req, res, _next) {
  return res.status(401).json({ message: 'TODO: implement JWT auth' });
}
module.exports = { requireAuth };
