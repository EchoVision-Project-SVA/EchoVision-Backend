// controllers/videoController.js
const videoService = require('../services/videoService');

const uploadVideo = async (req, res) => {
    try {
        // file_path is expected from req.body
        const { file_path, status } = req.body;
        const video = await videoService.uploadVideo({ file_path, status });
        res.status(201).json(video);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateVideoStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const video = await videoService.updateVideoStatus(req.params.id, { status });
        res.json(video);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllVideos = async (req, res) => {
    try {
        // Extract query parameters for pagination and search.
        const { page = 1, limit = 10, search = "" } = req.query;
        const videos = await videoService.getAllVideos({
            page: Number(page),
            limit: Number(limit),
            search,
        });
        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getVideoById = async (req, res) => {
    try {
        const video = await videoService.getVideoById(req.params.id);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }
        res.json(video);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    uploadVideo,
    updateVideoStatus,
    getAllVideos,
    getVideoById,
};
