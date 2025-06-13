export default async function validateMiddleWare(req, res, next) {
  const { title, body, username } = req.body;
  if (req.files == null || req.body.title == null || req.body.title == null) {
    return res.status(400).send("Thiếu thông tin bắt buộc");
  }
  next();
}
