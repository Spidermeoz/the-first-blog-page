export default async function loginController(req, res) {
    try {
        await res.render("login")
    } catch (error) {
        console.error('Lỗi khi hiển thị trang đăng nhập:', error)
        res.status(500).send('Lỗi server khi hiển thị trang đăng nhập')
    }
}