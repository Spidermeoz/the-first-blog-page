import User from "../models/User.js";

export default async function storeUserController(req, res) {
    try {
        await User.create({
            username: req.body.username, // Lấy tên người dùng từ req.body
            password: req.body.password // Lấy mật khẩu từ req.body
        }); // Tạo người dùng mới từ dữ liệu trong req.body

        res.redirect("/"); 
    } catch (error) {
        // console.error("Lỗi khi lưu người dùng:", error);
        // res.status(500).send("Lỗi khi xử lý người dùng");
        res.redirect("/auth/register")
    }
}