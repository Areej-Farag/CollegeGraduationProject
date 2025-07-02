const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// استدعاء الروترات
const toolRoutes = require("./routes/tool.routes");
const parameterRoutes = require("./routes/parameter.routes");
const equationRoutes = require("./routes/equation.routes");
const experimentRoutes = require("./routes/experiment.routes");
const experimentImageRoutes = require("./routes/experimentImage.routes");
const courseRoutes = require("./routes/course.routes");
const commandRoutes = require("./routes/command.routes");
const uploadRoutes = require("./routes/uploadRoute"); 
const toolImageRoutes = require("./routes/toolImageroutes");
const parameterImageRoutes = require("./routes/parameterImage.routes");
const deviceImageRoutes = require("./routes/deviceImage.routes");



const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// الاتصال بقاعدة البيانات
mongoose
  .connect(
    "mongodb+srv://rerefarag60:Areg002oo2@cluster0.8dtlv.mongodb.net/LabatoryDB"
  )
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

// ✅ Middleware CORS (مرة واحدة وبالإعدادات المطلوبة)
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

// استخدام الروترات
app.use("/api/upload", uploadRoutes);
app.use("/api/toolsImage", toolImageRoutes); // رفع صورة الأداة
app.use("/api/tools", toolRoutes);
app.use("/api/parameters", parameterRoutes);
app.use("/api/equations", equationRoutes);
app.use("/api/experiments", experimentRoutes);
app.use("/api/experiment-images", experimentImageRoutes);
app.use("/api/commands", commandRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/parameter-image", parameterImageRoutes);
app.use("/api/device-images", deviceImageRoutes);
// الصفحة الرئيسية
app.get("/", (req, res) => {
  res.send("API for Scientific Experiments is running...");
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
