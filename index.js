require("dotenv").config();
const cors = require("cors");
const express = require("express");
const zestySdk = require("@zesty-io/sdk");

const app = express();
const PORT = process.env.PORT || 3001;
const INSTANCE_ZUID = process.env.INSTANCE_ZUID;
const DEV_TOKEN = process.env.DEV_TOKEN;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send({ message: "Healthy", status: 200 });
});

// If Zesty Admin sends an invite, a webhook will trigger this request
app.post("/webhook/invite", (req, res) => {
  try {
    const sdk = new zestySdk(INSTANCE_ZUID, DEV_TOKEN);
  } catch (error) {
    console.error("An error occurred:", error.message);
    res.status(500).send({ error: "Something went wrong!" });
  }
});

app.listen(PORT, () => console.log(`App is running on PORT: ${PORT}`));
