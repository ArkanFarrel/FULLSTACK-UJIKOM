import { DataTypes } from "sequelize";
import db from "../utils/database.js"

const User = db.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "user",
    timestamps: true,
    freezeTableName: true
  }
);

export default User;