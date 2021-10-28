
const express = require("express");
//database
const { MongoClient } = require("mongodb"); ;
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;

require("dotenv").config();
const app = express();

const port = process.env.PORT || 7000;
//middleware
app.use(cors());
app.use(express.json());





// Replace the uri string with your MongoDB deployment's connection string.
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xyvia.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {useNewUrlParser:true, useUnifiedTopology:true});


    async function run() {
        try {
          await client.connect();
          const database = client.db("PracticeDB");
          const usersCollection = database.collection("users");

          // POST API
          app.post("/add", async (req, res) => {
            const newUser = req.body;
            const result = await usersCollection.insertOne(newUser);
            res.json(result);
          });
          // get users
          app.get("/users", async (req, res) => {
            const cursor = usersCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
          });
            
            // delete api
           /*  app.delete('/users/:deleteID', async (req, res) => {
              // Query for a movie that has title "Annie Hall"
                const id = req.params.deleteID;
                const query={_id:ObjectId(id)}
              const result = await usersCollection.deleteOne(query);
              if (result.deletedCount === 1) {
                console.log("Successfully deleted one document.");
              } else {
                console.log(
                  "No documents matched the query. Deleted 0 documents."
                );
              }
            }) */
        } finally {
        // await client.close();
    }
    }
run().catch(console.dir);





//
app.get("/", (req, res) => {
  res.send("Khela Coltase");
});


app.listen(port, () => {
  console.log("Listen from", port);
});
