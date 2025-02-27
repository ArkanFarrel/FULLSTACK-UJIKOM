import { DataTypes } from "sequelize";
import db from "../utils/database.js"

const Admin = db.define(
  "Admin",
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
    tableName: "admin",
    timestamps: true,
    freezeTableName: true
  }
);

export default Admin;