const CertificateController = require('../controllers/CertificateController');

const router = require('express').Router();

router.get('/', CertificateController.get);

module.exports = router;