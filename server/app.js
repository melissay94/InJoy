const express = require("express");
const cors = require("cors");
const methodOverride = require("method-override");

const userRoutes = require("./routes/user");
const promptRoutes = require("./routes/prompts");
const feedRoutes = require("./routes/feed");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(methodOverride("_method"));

app.use("/user", userRoutes);
app.use("/prompt", promptRoutes);
app.use("/feed", feedRoutes);
app.use(express.static("static"));

app.listen(4000, () => console.log("Server 4000 running"));
