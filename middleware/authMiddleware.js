import User from "../models/User.js";

export default async function authMiddleware(req, res, next) {
    try {
        const user = await User.findById(req.session.userID); // Tìm người dùng theo ID trong session
        if (!user) {
            console.log("Không tìm thấy người dùng với ID:", req.session.userID); // In ra console nếu không tìm thấy người dùng
            return res.redirect("/auth/login"); // Nếu không tìm thấy người dùng, chuyển hướng đến trang đăng nhập
        }

        req.user = user; // Lưu thông tin người dùng vào req để sử dụng trong các middleware hoặc route khác

        next(); // Tiếp tục xử lý request
    } catch (error) {
        console.error("Lỗi xác thực người dùng:", error); // In lỗi ra console để dễ dàng theo dõi
        res.redirect("/auth/login"); // Nếu có lỗi xảy ra, chuyển hướng đến trang đăng nhập
    }
}