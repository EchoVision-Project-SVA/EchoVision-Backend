const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Subscription = sequelize.define("Subscription", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  subscription_type: {
    type: DataTypes.ENUM("monthly", "yearly"),
    allowNull: false,
  },
  expiration_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

User.hasOne(Subscription, { foreignKey: "user_id", onDelete: "CASCADE" });
Subscription.belongsTo(User, { foreignKey: "user_id" });

module.exports = Subscription;
