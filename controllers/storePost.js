import path from "path";
import BlogPost from "../models/BlogPost.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function storePostController(req, res) {
  try {
    const image = req.files?.image;// Lấy file hình ảnh từ request
    const uploadDir = path.join(__dirname, "..", "public", "upload");// Thư mục lưu trữ hình ảnh
    const imagePath = path.join(uploadDir, image.name);// Đường dẫn đầy đủ để lưu hình ảnh
    const publicImagePath = "/upload/" + image.name;// Đường dẫn công khai để sử dụng trong HTML

    await image.mv(imagePath);// Di chuyển file hình ảnh vào thư mục public/upload

    await BlogPost.create({
      title: req.body.title,
      body: req.body.body,
      username: req.body.username,
      image: publicImagePath,
      datePosted: new Date(),
    });

    res.redirect("/");
  } catch (error) {
    console.error("Lỗi khi lưu bài viết:", error);
    res.status(500).send("Lỗi khi xử lý bài viết");
  }
}
