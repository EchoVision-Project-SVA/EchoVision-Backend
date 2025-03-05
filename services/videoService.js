// services/videoService.js
const Video = require('../models/video');
const { Op } = require('sequelize');

const uploadVideo = async ({ file_path, status = "pending" }) => {
    // Validate status if provided (or it will default to "pending")
    if (!["pending", "finished"].includes(status)) {
        throw new Error("Invalid status. Choose 'pending' or 'finished'.");
    }
    const video = await Video.create({ file_path, status });
    return video;
};

const updateVideoStatus = async (id, { status }) => {
    if (!["pending", "finished"].includes(status)) {
        throw new Error("Invalid status. Choose 'pending' or 'finished'.");
    }
    const video = await Video.findByPk(id);
    if (!video) {
        throw new Error("Video not found");
    }
    await video.update({ status });
    return video;
};

const getAllVideos = async ({ page = 1, limit = 10, search = "" } = {}) => {
    const offset = (page - 1) * limit;
    const whereClause = {};

    if (search) {
        // Search in file_path (you can add other fields if needed)
        whereClause.file_path = { [Op.like]: `%${search}%` };
    }

    const { count, rows } = await Video.findAndCountAll({
        where: whereClause,
        limit,
        offset,
    });

    return {
        total: count,
        page,
        limit,
        videos: rows,
    };
};


const getVideoById = async (id) => {
    return await Video.findByPk(id);
};

module.exports = {
    uploadVideo,
    updateVideoStatus,
    getAllVideos,
    getVideoById,
};
