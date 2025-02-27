import Ulasan from "../model/ulasanModel.js"
import User from "../model/UserModel.js"
import Transaction from "../model/transaksiModel.js"
import Property from "../model/propertyModel.js"

export const createUlasan = async (req, res) => {
    try {
        const { rating ,comment } = req.body;

        const ulasan  = await Ulasan.create({
            rating ,
            comment
        });
        
        res.status(201).json(ulasan);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getUlasan = async (req, res) => {
    try {
      const ulasan = await Ulasan.findAll({
        // include: [
        //     {
        //         model: User,
        //     },
        //     {
        //         model: Property
        //     }
        // ]
      });
      res.status(200).json(ulasan);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

export const getUlasanById = async (req, res) => {
    try {
      const { id } = req.params;
      const ulasan = await Ulasan.findByPk(id);
      if (!ulasan) return res.status(404).json({ message: "Belum Melakukan Transaksi" });
      res.status(200).json(ulasan);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const updateStatusUlasan = async (req, res) => {
    try {
      const { id } = req.params;
      const { rating ,comment } = req.body;
      const [updated] = await Transaction.update(
        { rating ,comment  },
        { where: { id } }
      );
      if (updated) {
        const updateStatusUlasan = await Transaction.findByPk(id);
        res.status(200).json(updateStatusUlasan);
      } else {
        res.status(404).json({ message: "Ulasan Tidak Dapat Ditemukan" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const deleteStatusUlasan = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Ulasan.destroy({ where: { id } });
      if (deleted) {
        res.status(404).json({ message: "Data Ulasan Berhasil Dihapus Dari Database"});
      } else {
        res.status(404).json({ message: "Ulasan Tidak Dapat Ditemukan" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };