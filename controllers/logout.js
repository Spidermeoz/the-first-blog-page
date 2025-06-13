export default async function logoutController(req, res) {
    try {
        // Xóa session để đăng xuất người dùng
        req.session.destroy((err) => {
            if (err) {
                console.error("Lỗi khi đăng xuất:", err);
                return res.redirect("/"); // Nếu có lỗi, chuyển hướng về trang chính
            }
            console.log("Đăng xuất thành công");
            res.redirect("/auth/login"); // Chuyển hướng về trang đăng nhập sau khi đăng xuất
        });
    } catch (error) {
        console.error("Lỗi khi đăng xuất:", error);
        res.redirect("/auth/login"); // Nếu có lỗi, chuyển hướng về trang đăng nhập
    }
}