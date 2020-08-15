const router = require('express').Router();

router.get('/', (req, res) => {
  res.end('from posts');
});

module.exports = router;
