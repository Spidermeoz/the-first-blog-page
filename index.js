import dotenv from "dotenv";
dotenv.config();
import express from "express";
import ejs from "ejs";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import newPostController from "./controllers/newPost.js"; // Import controller mới nếu cần
import homeController from "./controllers/home.js"; // Import controller home
import getPostController from "./controllers/getPost.js"; // Import controller getPost
import storePostController from "./controllers/storePost.js"; // Import controller storePost
import authMiddleware from "./middleware/authMiddleware.js";
import redirectIfAuthenticatedMiddleware from "./middleware/redirectIfAuthenticatedMiddleware.js"; // Import middleware redirectIfAuthenticated
// import validateMiddleWare from "./middleware/validationMiddleware.js"; // Import middleware validate
import requireLogin from "./middleware/requireLogin.js"; // Import middleware requireLogin
import newUserController from "./controllers/newUser.js"; // Import controller newUser
import storeUserController from "./controllers/storeUser.js"; // Import controller storeUser
import loginController from "./controllers/login.js"; // Import controller login
import loginUserController from "./controllers/loginUser.js";
import expressSession from "express-session"; // Import express-session nếu cần sử dụng session
import logoutController from "./controllers/logout.js"; // Import controller logout

const app = new express();
const PORT = process.env.PORT || 4000;

const MONGO_URI = process.env.MONGO_URI;

// Thiết lập session phải đứng trước khi sử dụng các route liên quan đến session
app.use(
  expressSession({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
); // Sử dụng express-session để quản lý session

app.use(express.static("public"));
app.use(express.static("views"));
app.use(fileUpload()); // Sử dụng express-fileupload để xử lý upload file

app.set("view engine", "ejs"); // Sử dụng EJS làm view engine

// Thay thế body-parser:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// console.log("MONGO_URI:", process.env.MONGO_URI);
global.loggedIn = null;

app.use((req, res, next) => {
  global.loggedIn = req.session.userID || null;
  next();
});

app.get("/", homeController);

app.get("/post/:id", getPostController);

app.post("/posts/store", authMiddleware, storePostController);

app.get("/posts/new", requireLogin, authMiddleware, newPostController); // Sử dụng middleware requireLogin để kiểm tra đăng nhập trước khi cho phép tạo bài viết mới

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserController); // Route đăng ký người dùng

app.post(
  "/users/register",
  redirectIfAuthenticatedMiddleware,
  storeUserController
);

app.get("/auth/login", redirectIfAuthenticatedMiddleware, loginController); // Route đăng nhập người dùng

app.post(
  "/users/login",
  redirectIfAuthenticatedMiddleware,
  loginUserController
);

app.get("/auth/logout", logoutController); // Route đăng xuất người dùng

app.use((req, res) => res.render("notfound")); // Route xử lý trang không tìm thấy, dòng này phải đứng sau tất cả các route khác để đảm bảo nó chỉ được gọi khi không có route nào khớp với yêu cầu

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
