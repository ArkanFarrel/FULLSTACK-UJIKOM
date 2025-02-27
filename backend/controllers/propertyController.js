import 'dotenv/config'
// import User from "../model/UserModel.js";
// import Transaction from "../model/transaksiModel.js";
import Property from "../model/propertyModel.js";

  export const createProperty = async (req, res) => {
      try {
        const { name, price, location, status, description} = req.body;
    
        const property = await Property.create({
          name,
          price,
          location,
          status,
          description
        });
    
        res.status(201).json(property);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };

  export const getProperty = async (req, res) => {
    try {
      const property = await Property.findAll({
        include: [
          // {
          //   model: User,
          // },
          // {
          //   model: Transaction,
          // }
        ]
      });
      res.status(200).json(property);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

// export const getProperty = async (req, res) => {
//     try {
//       const property = await Property.findAll();
//       res.status(200).json(property);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };


  export const getPropertyById = async (req, res) => {
    try {
      const { id } = req.params;
      const property = await Property.findByPk(id);
      if (!property) return res.status(404).json({ message: "Property tidak dapat ditemukan" });
      res.status(200).json(property);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const updateProperty = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, price, location, status, description } = req.body;
      const [updated] = await Property.update(
        { name, price, location, status, description  },
        { where: { id } }
      );
      if (updated) {
        const updateProperty = await Property.findByPk(id);
        res.status(200).json(updateProperty);
      } else {
        res.status(404).json({ message: "Property Tidak Ditemukan" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const deleteProperty = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Property.destroy({ where: { id } });
      if (deleted) {
        res.status(200).json({ message: "Data Property Berhasil Dihapus" });
      } else {
        res.status(404).json({ message: "Property Tidak Ditemukan" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  