import mongoose from "mongoose";
const {Schema, model} = mongoose;

// Tạo schema cho BlogPost
// Schema là cấu trúc của dữ liệu trong MongoDB
const blogPostSchema = new Schema({
    title: {
        type: String,
        required: true, //khong được để trống
        trim: true // xóa khoảng trắng ở đầu và cuối
    },
    body: {
        type: String,
        required: true,
    },
    username: String,
    image: String
},{
    timestamps: true}) // Tự động thêm trường createdAt và updatedAt

// Tạo model từ schema
const BlogPost = model('BlogPost', blogPostSchema); 
export default BlogPost; //Sử dụng export default để xuất model này ra ngoài, có thể sử dụng ở các file khác
// Model là lớp đại diện cho một collection trong MongoDB, giúp tương tác với dữ liệu trong collection đó