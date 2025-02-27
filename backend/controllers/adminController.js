import 'dotenv/config'
import Admin from '../model/adminModel.js';
// import jwt from "jsonwebtoken";
// import { verifyToken } from '../middleware/verifyToken.js';


export const createAdmin = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      const admin = await Admin.create({
        name,
        email,
        password,
      });
  
      res.status(201).json(admin);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const getAdmin = async (req, res) => {
    try {
      const admin = await Admin.findAll();
      res.status(200).json(admin);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const getAdminById = async (req, res) => {
    try {
      const { id } = req.params;
      const admin = await Admin.findByPk(id);
      if (!admin) return res.status(404).json({ message: "Admin tidak dapat ditemukan" });
      res.status(200).json(admin);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const updateAdmin = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      const [updated] = await Admin.update(
        { name, email, password },
        { where: { id } }
      );
      if (updated) {
        const updateAdmin = await User.findByPk(id);
        res.status(200).json(updateAdmin);
      } else {
        res.status(404).json({ message: "Admin Tidak Ditemukan" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const deleteAdmin = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Admin.destroy({ where: { id } });
      if (deleted) {
        res.status(404).json({ message: "Data Admin Berhasil Dihapus Dari Database"});
      } else {
        res.status(404).json({ message: "Admin Tidak Ditemukan" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };