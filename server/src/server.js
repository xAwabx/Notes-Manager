import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
  });
})();
