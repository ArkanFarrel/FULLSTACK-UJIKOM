import express from "express";
import { createProperty, deleteProperty, getProperty, getPropertyById, updateProperty } from "../controllers/propertyController.js";
import { createUser, deleteUser, getUser, getUserById, updateUser } from "../controllers/userController.js";
import { createTransaction, deleteStatusTransaction, getTransaction, getTransactionById, updateStatusTransaction } from "../controllers/transaksiController.js";
import { createAdmin, deleteAdmin, getAdmin, getAdminById, updateAdmin } from "../controllers/adminController.js";
import { createUlasan, deleteStatusUlasan, getUlasan, getUlasanById, updateStatusUlasan } from "../controllers/ulasanController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

//PROPERTY
router.post("/property/post", createProperty);
router.get("/property", getProperty);
router.delete("/property/delete/:id", deleteProperty);
router.get("/property/find/:id", getPropertyById);
router.put("/property/update/:id", updateProperty);

// USER
router.get("/user", getUser);
router.get("/user/find/:id",verifyToken, getUserById);
router.post("/user/post", createUser);
router.delete("/user/delete/:id", deleteUser);
router.put("/user/update/:id", updateUser);

// ADMIN
router.get("/admin", getAdmin);
router.get("/admin/find/:id", getAdminById);
router.post("/admin/post", createAdmin);
router.delete("/admin/delete/:id", deleteAdmin);
router.put("/admin/update/:id", updateAdmin);


//TRANSAKSI
router.get("/transaction", getTransaction);
router.get("/transaction/find/:id", getTransactionById);
router.post("/transaction/post", createTransaction);
router.delete("/transaction/delete/:id", deleteStatusTransaction);
router.put("/transaction/update/:id", updateStatusTransaction);

// ULASAN
router.get("/ulasan", getUlasan);
router.get("/ulasan/find/:id", getUlasanById);
router.post("/ulasan/post", createUlasan);
router.delete("/ulasan/delete/:id", deleteStatusUlasan);
router.put("/ulasan/update/:id", updateStatusUlasan);


export default router;