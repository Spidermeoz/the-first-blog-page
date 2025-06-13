import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;
// Tạo schema cho User
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true, // Không được để trống
      unique: true, // Username phải là duy nhất
      trim: true, // Xóa khoảng trắng ở đầu và cuối
    },
    password: {
      type: String,
      required: true, // Không được để trống
    },
  },
  {
    timestamps: true, // Tự động thêm trường createdAt và updatedAt
  }
);

// Middleware để mã hóa password trước khi lưu người dùng vào database
userSchema.pre("save", async function (next) {
  // Hàm này sẽ được gọi trước khi lưu người dùng vào database
  if (!this.isModified("password")) return next(); // Nếu password không thay đổi thì không cần mã hóa lại

  try {
    const hashed = await bcrypt.hash(this.password, 10); // Tạo salt với độ dài 10
    // this.password = await bcrypt.hash(this.password, salt); // Mã hóa password
    this.password = hashed; // Gán password đã mã hóa vào trường password
    next(); // Tiếp tục lưu người dùng
  } catch (error) {
    next(error); // Nếu có lỗi thì chuyển đến middleware xử lý lỗi
  }
});

// Tạo model từ schema
const User = model("User", userSchema);
export default User; // Sử dụng export default để xuất model này ra ngoài, có thể sử dụng ở các file khác
// Model là lớp đại diện cho một collection trong MongoDB, giúp tương tác với dữ liệu trong collection đó
