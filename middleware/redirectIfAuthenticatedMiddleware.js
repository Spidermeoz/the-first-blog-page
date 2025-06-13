export default async function redirectIfAuthenticatedMiddleware(req, res, next) {
    if (req.session.userID) {
        console.log('Đã đăng nhập → redirect về /');
        return res.redirect('/'); // Nếu đã đăng nhập, chuyển hướng về trang chính
    }
    next(); // Nếu chưa đăng nhập, tiếp tục xử lý request
}