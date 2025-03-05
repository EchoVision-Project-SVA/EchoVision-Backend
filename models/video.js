const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Video = sequelize.define("Video", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    file_path: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("pending", "finished"),
        allowNull: false,
        defaultValue: "pending",
    },
});

module.exports = Video;
