// import Admin from '../model/adminModel.js'
// import jwt from 'jsonwebtoken'
// import "dotenv/config"

// export const refreshToken = async (req, res) => {
//     try {
//         const rft = req.cookies.refreshToken
//         console.log(rft)
//         if (!rft) res.status(401).json({ message: 'Unauthorized' })

//         const admin = await Admin.findOne({
//             where: {
//                 refresh_token: rft
//             }
//         })

//         if (!admin) res.status(403)

//         jwt.verify(rft, process.env.SECRET_REFRESH_TOKEN, (err, decode) => {
//             if (err) res.status(403).json({ message: 'Unverification' })
//             const adminId = admin.id
//             const email = admin.email
//             const password = admin.password
//             const accesTokenBaru = jwt.sign({ adminId, email, password }, process.env.SECRET_ACCESS_TOKEN,
//                 {
//                     expiresIn: '1h'
//                 }
//             )
//             res.json({ accesTokenBaru })
//         })
//     } catch (err) {

//     }

// }