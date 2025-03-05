// models/subscription.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");
const Pricing = require("./pricing");

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
  pricing_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Pricing,
      key: "id",
    },
  },
  expiration_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

User.hasOne(Subscription, { foreignKey: "user_id", onDelete: "CASCADE" });
Subscription.belongsTo(User, { foreignKey: "user_id" });

Pricing.hasMany(Subscription, { foreignKey: "pricing_id", onDelete: "CASCADE" });
Subscription.belongsTo(Pricing, { foreignKey: "pricing_id" });

module.exports = Subscription;
