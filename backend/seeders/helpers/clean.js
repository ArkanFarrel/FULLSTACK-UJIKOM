import Admin from "../../model/adminModel.js";
import Property from "../../model/propertyModel.js";
import Transaction from "../../model/transaksiModel.js";
import Ulasan from "../../model/ulasanModel.js";
import User from "../../model/UserModel.js";

export default async function clean() {
    await User.destroy({
        where: {},
        force: true,
        cascade: true,
    });
    await Admin.destroy({
        where: {},
        force: true,
        cascade: true,
    });

    await Property.destroy({
        where: {},
        force: true,
        cascade: true,
    });
    await Transaction.destroy({
        where: {},
        force: true,
        cascade: true,
    });
    await Ulasan.destroy({
        where: {},
        force: true,
        cascade: true,
    });
}

clean()