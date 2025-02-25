const express = require("express");
const userController = require("../controllers/userController");
const {
  authenticate,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authenticate);
router.use(authorizeAdmin);

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
