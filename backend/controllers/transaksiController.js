import User from "../model/UserModel.js";
import Transaction from "../model/transaksiModel.js";
import Property from "../model/propertyModel.js";

export const createTransaction = async (req, res) => {
    try {
      const { TransactionDate, Status, Agent} = req.body;
  
      const transaction = await Transaction.create({
        TransactionDate,
        Status,
        Agent
      });
  
      res.status(201).json(transaction);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const getTransaction = async (req, res) => {
    try {
      const transaction = await Transaction.findAll();
      res.status(200).json(transaction);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const getTransactionById = async (req, res) => {
    try {
      const { id } = req.params;
      const transaction = await Transaction.findByPk(id);
      if (!transaction) return res.status(404).json({ message: "Belum Melakukan Transaksi" });
      res.status(200).json(transaction);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const updateStatusTransaction = async (req, res) => {
    try {
      const { id } = req.params;
      const { TransactionDate, Status, Agent} = req.body;
      const [updated] = await Transaction.update(
        { TransactionDate, Status, Agent  },
        { where: { id } }
      );
      if (updated) {
        const updateStatusTransaction = await Transaction.findByPk(id);
        res.status(200).json(updateStatusTransaction);
      } else {
        res.status(404).json({ message: "Transaksi Tidak Dapat Ditemukan" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const deleteStatusTransaction = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Transaction.destroy({ where: { id } });
      if (deleted) {
        res.status(404).json({ message: "Data Transaksi Berhasil Dihapus Dari Database"});
      } else {
        res.status(404).json({ message: "Transaksi Tidak Dapat Ditemukan" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };