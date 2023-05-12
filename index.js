const express = require('express');
const app = express();
const {connection} =require("./config/db");
const cors=require("cors");

const PersonalRouter = require("./Routes/User.Route")




//
app.use(
    cors({
      origin: "*",
      methods: "GET,POST,PATCH,DELETE",
      credentials: true,
    })
  );

app.use(express.json());

app.use("/User", PersonalRouter)

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});




// Start the server
const port = 8000;
app.listen(port,async () => {
    try{
        await connection
        console.log("Connected to DB Successfully")
    }
    catch(err){
        console.log("Connection failed");
        console.log(err);
    }
  console.log(`Server listening on port ${port}.`);
});
