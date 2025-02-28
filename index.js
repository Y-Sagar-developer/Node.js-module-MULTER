const express = require("express");
const multer = require("multer");
const app = express();
const fs = require("fs");
const path = require("path");
app.use(express.json());

const floder_path = path.join(__dirname + "/uploads");
// console.log(floder_path)

const exists = fs.existsSync(floder_path);
console.log(exists);

if (!exists) {
  fs.mkdirSync(floder_path, { recursive: true });
}
console.log(floder_path)

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
  res.send("file uploaded successfully");
});

app.listen(3006, (err) => {
  err ? console.log(err) : console.log("server is running");
});
