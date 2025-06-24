const express = require("express");
const router = express.Router();

const { localUploads , imageUpload , videoUpload } = require('../controllers/localUploadController');

router.post('/localUploads',localUploads);
router.post('/imageUpload',imageUpload);
router.post('/videoUpload',videoUpload);

module.exports = router;