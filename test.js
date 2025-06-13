import mongoose from "mongoose";
import BlogPost from "./models/BlogPost.js";

const MONGO_URI = "mongodb://localhost:27017/my_database";

async function createBlogPost() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log("Connected to MongoDB");

    const newPost = await BlogPost.create({
      title: "My First Blog Post",
      body: "This is the content of my first blog post."
    });
    console.log("Blog post created:", newPost);

  } catch (error) {
    console.error("Error creating blog post:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
} // Sử dụng async/await để xử lý bất đồng bộ
// Sư dụng try/catch để xử lý lỗi khi kết nối và tạo blog post và không để ứng dụng treo nếu lỗi xảy ra

// createBlogPost(); // Gọi hàm để tạo blog post
// Hàm này sẽ kết nối đến MongoDB, tạo một blog post mới và sau đó ngắt kết nối

async function findBlogPosts() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    const posts = await BlogPost.find(); // Tìm tất cả blog post
    console.log("Blog posts found:", posts);

  } catch (error) {
    console.error("Error finding blog posts:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}
// Hàm này sẽ kết nối đến MongoDB, tìm tất cả blog post và sau đó ngắt kết nối
// findBlogPosts(); // Gọi hàm để tìm blog post

async function updateBlogPost(id, updatedData) {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    const updatedPost = await BlogPost.findByIdAndUpdate(id, updatedData, {
      new: true, // Trả về bản ghi đã cập nhật
      runValidators: true // Chạy các validator đã định nghĩa trong schema
    });
    console.log("Blog post updated:", updatedPost);
  } catch (error) {
    console.error("Error updating blog post:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}
// Hàm này sẽ kết nối đến MongoDB, cập nhật một blog post theo id và sau đó ngắt kết nối
updateBlogPost("684a4bebb2ca9f7faf5c754f", {
  title: "Updated Blog Post Title",
  body: "Updated content for the blog post."
}); // Gọi hàm để cập nhật blog post

async function deleteBlogPost(id) {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    const deletedPost = await BlogPost.findByIdAndDelete(id);
    console.log("Blog post deleted:", deletedPost);
  } catch (error) {
    console.error("Error deleting blog post:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
} // Hàm này sẽ kết nối đến MongoDB, xóa một blog post theo id và sau đó ngắt kết nối
// deleteBlogPost("684a4bebb2ca9f7faf5c754f"); // Gọi hàm để xóa blog post
async function findBlogPostById(id) {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    const post = await BlogPost.findById(id);
    console.log("Blog post found:", post);
  } catch (error) {
    console.error("Error finding blog post by ID:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
} // Hàm này sẽ kết nối đến MongoDB, tìm một blog post theo id và sau đó ngắt kết nối   
// findBlogPostById("684a4bebb2ca9f7faf5c754f"); // Gọi hàm để tìm blog post theo id

