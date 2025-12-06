import express from 'express';

const router = express.Router();

// Debug endpoint to see what the server receives
router.post('/debug', (req, res) => {
  res.json({
    success: true,
    debug: {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
      bodyType: typeof req.body,
      bodyKeys: req.body ? Object.keys(req.body) : 'body is undefined',
      contentType: req.headers['content-type'],
    },
  });
});

export default router;

