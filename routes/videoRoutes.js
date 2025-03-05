const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

// POST endpoint to upload a video
router.post('/', videoController.uploadVideo);

// PUT endpoint to update the video status
router.put('/:id', videoController.updateVideoStatus);

// GET endpoints to retrieve videos
router.get('/', videoController.getAllVideos);
router.get('/:id', videoController.getVideoById);

module.exports = router;
