const express = require("express");
const videoController = require("../controllers/videoController");
const upload = require("../config/multer");
const {
    authenticate,
    authorizeAdmin,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authenticate);
router.use(authorizeAdmin);

router.post("/", upload.single("video"), videoController.uploadVideo);

router.put("/:id", videoController.updateVideoStatus);
router.get("/", videoController.getAllVideos);
router.get("/:id", videoController.getVideoById);

module.exports = router;
