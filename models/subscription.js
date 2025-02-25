const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Subscription = sequelize.define("Subscription", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  subscription_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiration_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

User.hasOne(Subscription, { foreignKey: "user_id" });
Subscription.belongsTo(User, { foreignKey: "user_id" });

module.exports = Subscription;
