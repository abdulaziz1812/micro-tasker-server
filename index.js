require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bfe0u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    const userCollection = client.db("microTasker").collection("user");
    const tasksCollection = client.db("microTasker").collection("tasks");
    const paymentsCollection = client.db("microTasker").collection("payments");

    // user API with coin
    app.post("/user", async (req, res) => {
      const newUser = req.body;
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });

    app.get("/user/:email", async (req, res) => {
      const { email } = req.params;
      const result = await userCollection.findOne({ email });
      res.send(result);
    });

    app.patch("/user/:email", async (req, res) => {
      const { email } = req.params;
      const { coin } = req.body;
      const filter = { email: email };
      const updateCoin = {
        $set: { coin: coin },
      };

      const result = await userCollection.updateOne(filter, updateCoin);
      res.send(result);
    });

    // task API

    app.get("/tasks/available", async (req, res) => {
       const query = {required_workers: { $gt: 0 }}
        const result = await tasksCollection.find(query).toArray();
        res.send(result);
    });

    app.get("/task-details/:id", async (req, res) => {
      const { id } = req.params;
      const result = await tasksCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
   });

    app.post("/tasks", async (req, res) => {
      const newTask = req.body;
      const result = await tasksCollection.insertOne(newTask);
      res.send(result);
    });

    app.get("/tasks", async (req, res) => {
      const { task_title } = req.query;
      const result = await tasksCollection.findOne({ task_title });

        res.send(result);
    });

    app.get("/tasks/:email", async (req, res) => {
      const { email } = req.params;
      const result = await tasksCollection.find({ email }).toArray();
      res.send(result);
    });

    app.put("/tasks/:id", async (req, res) => {
      const { id } = req.params;
      const { task_title, task_detail, submission_info } = req.body;
      const filter = { _id: new ObjectId(id) };
      const updatedTask = {
        $set: {
          task_title,
          task_detail,
          submission_info,
        },
      };

      const result = await tasksCollection.updateOne(filter, updatedTask);
      res.send(result);
    });

    app.delete('/tasks/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await tasksCollection.deleteOne(query);
      res.send(result);
    })

    // Payment intent

    app.post('/create-payment-intent', async(req,res)=>{
      const {price} = req.body
      const amount = parseInt(price*100)
     console.log(amount );
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types:['card']

      })

      res.send({
        clientSecret : paymentIntent.client_secret
      })
    })

    // payment API

    app.post('/payments',async(req,res)=>{
      const payment = req.body
      const paymentResult = await paymentsCollection.insertOne(payment)

      res.send(paymentResult)
    })

    app.get('/payments/:email',async(req,res)=>{
      const query = {email:req.params.email}
      const result = await paymentsCollection.find(query).toArray()

      res.send(result)
    })


  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Micro Tasker sever is running");
});

app.listen(port, () => {
  console.log(`Server is running at: ${port}`);
});
