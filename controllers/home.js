import BlogPost from "../models/BlogPost.js"; // Import model BlogPost

export default async function homeController(req, res) {
    try {
        const post = await BlogPost.find({}); // Lấy blog post theo ID từ URL
        res.render("index", { blogposts: post }); // Truyền dữ liệu post vào view post.ejs
    } catch (error) {
        console.error("Error fetching blog post:", error);
        res.status(500).send("Error fetching blog post");
    }
}