const express = require("express");
const router = express.Router();

const { localUploads } = require('../controllers/localUploadController');

router.post('/localUploads',localUploads);

module.exports = router;