const router = require('express').Router();

router.get('/', (req, res) => {
  res.end('from profile');
});

module.exports = router;
