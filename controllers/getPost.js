import BlogPost from "../models/BlogPost.js";

export default async function getPostController(req, res) {
    try {
        const detailPost = await BlogPost.findById(req.params.id) // Lấy blog post theo ID từ MongoDB
        res.render('post', { detailPost })
    } catch (error) {
        console.error('Lỗi khi truy vấn bài viết:', error)
    res.status(500).send('Lỗi server khi hiển thị chi tiết bài viết')
    }
}