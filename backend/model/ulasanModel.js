import { DataTypes } from "sequelize";
import db from "../utils/database.js";

const Ulasan = db.define(
    "Ulasan",
    {
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {min: 1, max: 100},
        },
        comment: {
            type: DataTypes.TEXT,
        },
        
    },
    {
        tableName: "ulasan",
    }
);

export default Ulasan;