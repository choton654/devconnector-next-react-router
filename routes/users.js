const router = require('express').Router();

router.get('/', (req, res) => {
  res.end('from users');
});

module.exports = router;
