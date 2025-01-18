const mongoose = require("mongoose");
const { MONGO_URI, PORT } = require("./utils/config");
const app = require("./app");

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected...")
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Could not connect to MongoDB....", err);
  });

