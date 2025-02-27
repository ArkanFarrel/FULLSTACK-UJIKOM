import db from '../utils/database.js';
import { DataTypes } from 'sequelize';
// import User from './userModel.js'; // Pastikan impor model User
// import Property from './propertyModel.js'; // Pastikan impor model Property

const Transaction = db.define(
  "Transaction",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    // PropertyId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: Property, // Sesuaikan dengan model yang benar
    //     key: 'id'
    //   }
    // },
    // UserId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: User, // Sesuaikan dengan model yang benar
    //     key: 'id'
    //   }
    // },
    TransactionDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW // Set default transaksi saat ini
    },
    Status: {
      type: DataTypes.ENUM('Sukses', 'Pending', 'Batal'),
      allowNull: false
    },
    Agent: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    tableName: 'transaction',
    timestamps: true,
  }
);


export default Transaction;
