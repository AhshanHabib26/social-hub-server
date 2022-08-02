const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// Middlle Ware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@cluster0.iqsg0lc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function socialHub() {
  try {
    await client.connect();
    console.log("DB Connect");

    const userPostCollection = client.db("postCollecction").collection("post");
    // const userCommnetCollection = client.db("postCollecction").collection("comment");

    app.post("/userPost", async (req, res) => {
      const query = req.body;
      const result = await userPostCollection.insertOne(query);
      res.send(result);
    });

    app.get("/userPost", async (req, res) => {
      const query = {};
      const result = userPostCollection.find(query);
      const data = await result.toArray();
      res.send(data);
    });

    // app.post("/userComment", async (req, res) => {
    //   const query = req.body;
    //   const result = await userCommnetCollection.insertOne(query);
    //   res.send(result);
    // });
   
    // app.get("/userComment", async (req, res) => {
    //   const query = {};
    //   const result = userCommnetCollection.find(query);
    //   const data = await result.toArray();
    //   res.send(data);
    // });

  } finally {
  }
}

socialHub().catch(console.dir());

app.get("/", (req, res) => {
  res.send("Hello, Welcome SocialHub World!");
});

app.listen(port);
