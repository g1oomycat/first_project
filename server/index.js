const fs = require("fs");
const jsonServer = require("json-server");
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "static/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, "db.json"));

//обращаемся так, localhost:8000/file.jpg - static  в пути не указываем!
const staticFolder = path.join(__dirname, "static");
server.use(jsonServer.defaults({ static: staticFolder }));
server.use(jsonServer.bodyParser);

// Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
server.use(async (req, res, next) => {
  await new Promise((res) => {
    setTimeout(res, 800);
  });
  next();
});

server.post("/file", upload.single("file"), function (req, res) {
  res.json({ filename: `/uploads/${req.file.filename}` });
});

// Эндпоинт для логина
server.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const db = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8")
    );
    const { users = [] } = db;

    // находим в бд пользователя с таким email и password
    const userFromBd = users.find(
      (user) => user.email === email && user.password === password
    );

    if (userFromBd) {
      return res.json(userFromBd);
    }

    return res.status(403).json({ message: "User not found" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
});

//
// проверяем, авторизован ли пользователь
server.use((req, res, next) => {
  // разрешаем публичный доступ без авторизации
  if (req.path === "/products") {
    return next();
  }

  if (req.path.startsWith("/users")) {
    return next();
  }
  if (req.path.startsWith("/uploads")) {
    return next();
  }
  if (req.path.startsWith("/orders")) {
    return next();
  }
  if (req.path.startsWith("/orderDetails")) {
    return next();
  }

  if (!req.headers.authorization) {
    // для всех остальных маршрутов запрещаем
    return res.status(403).json({ message: "AUTH ERROR" });
  }
  next();
});

server.use(router);

// запуск сервера
server.listen(8000, () => {
  console.log("server is running on 8000 port");
});
