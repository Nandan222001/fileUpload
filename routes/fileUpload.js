const express = require("express");
const router = express.Router();

const { localUploads , imageUpload  } = require('../controllers/localUploadController');

router.post('/localUploads',localUploads);
router.post('/imageUpload',imageUpload);

module.exports = router;