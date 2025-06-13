export default function requireLogin(req, res, next) {
  if (!req.session.userID) {
    console.log('Chưa đăng nhập → redirect về /auth/login')
    return res.redirect('/auth/login')
  }
  next()
}