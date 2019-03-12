const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ credentials: true, origin: ["http://localhost:8080", "http://localhost:8081"] }));

app.use(cookieParser()); // 使用该中间件后，可以通过 res.cookies 获取请求的 cookie

app.post("/login", (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password
  };

  jwt.sign({ user }, "secretkey", { expiresIn: "1 days" }, (err, token) => {
    if (err) return;

    /**
     * domain 的默认值为 localhost
     * 
     * 启用 httpOnly 后，前端 JS 无法进行操作
     */
    res.cookie("token", token, { httpOnly: true });

    res.json({ statusMsg: "success", statusCode: 200 });
  });
});

app.post("/login-verify", (req, res) => {
  if (req.cookies["token"]) {
    res.json({
      statusMsg: "user already logged in",
      statusCode: 200
    });
  } else {
    res.json({
      statusMsg: "access denied",
      statusCode: 401
    });
  }
});

app.listen(3000, function() {
  console.log(`服务正在 3000 端口运行`);
});
