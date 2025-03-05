const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.post('/', videoController.uploadVideo);

router.put('/:id', videoController.updateVideoStatus);

router.get('/', videoController.getAllVideos);
router.get('/:id', videoController.getVideoById);

module.exports = router;
