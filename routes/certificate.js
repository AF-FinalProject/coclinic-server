const CertificateController = require('../controllers/CertificateController');

const router = require('express').Router();

router.get('/:id', CertificateController.get);

module.exports = router;