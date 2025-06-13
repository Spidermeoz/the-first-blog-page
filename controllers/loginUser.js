import bcrypt from "bcrypt";
import User from "../models/User.js";

export default async function loginUserController(req, res) {
    const { username, password } = req.body; // Lấy tên người dùng và mật khẩu từ req.body

    try {
        const user = await User.findOne({ username }); // Tìm người dùng trong database theo tên người dùng
        if (!user) {
            return redirect("/auth/login"); // Nếu không tìm thấy người dùng, chuyển hướng về trang đăng nhập
        }

        const isMatch = await bcrypt.compare(password, user.password); // So sánh mật khẩu đã nhập với mật khẩu đã mã hóa trong database

        if (!isMatch) {
            return res.redirect("/auth/login"); // Nếu mật khẩu không khớp, chuyển hướng về trang đăng nhập
        }

        //Lưu session hoặc token 
        req.session.userID = user._id; // Lưu ID người dùng vào session để xác thực trong các yêu cầu tiếp theo
        console.log(req.session);

        res.redirect("/"); // Nếu đăng nhập thành công, chuyển hướng về trang chính
        console.log("Đăng nhập thành công:", user.username); // In ra console để theo dõi đăng nhập thành công
    } catch (error) {
        res.redirect("/auth/login"); // Nếu có lỗi xảy ra, chuyển hướng về trang đăng nhập
        console.error("Lỗi khi đăng nhập:", error); // In lỗi ra console để dễ dàng theo dõi
    }
}