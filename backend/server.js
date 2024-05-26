const app = require("./app");
const cloudinary = require("cloudinary");
const PORT = process.env.PORT || 4001;

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
