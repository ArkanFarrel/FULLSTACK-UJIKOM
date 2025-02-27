import User from "../model/UserModel.js";
import Property from "../model/propertyModel.js";
import Transaction from "../model/transaksiModel.js";
import Ulasan from "../model/ulasanModel.js";
import Admin from "../model/adminModel.js";
import { DataTypes } from "sequelize";

const createSeeder = async () => {
    const user = await User.create({
        name: "Farrel Doe",
        email: "Farrel.doe@gmail.com",
        // password: "farrel123",
    });
    const user1 = await User.create({
        name: "Farrel Doe",
        email: "Farrel.doe@gmail.com",
        // password: "farrel123",
    });

    const property = await Property.create({
        name: "Rumah Minimalis A",
        price: 50000000,
        location: "Jakarta Selatan",
        // size: 120,
        status: "available",
        description: "Rumah minimalis dengan 2 kamar tidur dan 1 kamar mandi.",
        // UserId: user.dataValues.id,
    })
    const property1 = await Property.create({
        name: "Rumah Minimalis B",
        price: 90000000,
        location: "Jakarta Timur",
        // size: 180,
        status: "sold",
        description: "Rumah Sudah Terjual",
        // UserId: user.dataValues.id,
    });

    const findPropertyByUser = await Property.findAll({
        where: {
            // UserId: user.dataValues.id,
        },
        attributes: ["name", "price", "location",  "status", "description"],
    });

    const transaction = await Transaction.create({
        PropertyId: property.dataValues.id, 
        // UserId: user1.dataValues.id,          
        TransactionDate: new Date(),         
        Status: 'Sukses',                    
        Agent: 'John Doe',                   
    });

    // const ulasan = await Ulasan.create({
    //     Rating: ulasan.dataValues.id,
    //     Comment: DataTypes.TEXT
    // });

    const admin = await Admin.create({
        name: "admin farrel",
        email: "Farrel.doe@gmail.com",
        password : "farrelaja",
    })
    return { user , findPropertyByUser, transaction, admin, user1 };

};
const { user, findPropertyByUser: users, transaction, admin, user1 } = await createSeeder();

console.log("==== INI ADALAH DATA USER ====");
console.log(user);
console.log("==== INI ADALAH DATA PROPERTY ====");
// console.log(property);
users.map((item) => {
    console.log(item.dataValues);
  });

  console.log("==== INI ADALAH DATA TRANSACTION ====");
console.log(transaction.dataValues);

//   console.log("==== INI ADALAH DATA ulasan ====");
// console.log(ulasan.dataValues);


  console.log("==== INI ADALAH DATA ADMIN ====");
console.log(admin.dataValues);

//   console.log("==== INI ADALAH DATA ULASAN ====");
// console.log(ulasan.dataValues);