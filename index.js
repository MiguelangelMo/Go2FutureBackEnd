// We export express for requests 
const express = require("express");

// DB
const connectDB = require("./conf/db");

//CORS
const cors = require("cors");

// then we call them
const app = express();

//Connect BD
connectDB();

// enable CORS
app.use(cors())

// avalibled express.json
app.use(express.json({ extended: true }))

app.use("/data/users", require("./routes/user"));
app.use("/data/auth", require("./routes/auth"));
app.use("/data/project", require("./routes/project"));
app.use("/data/task", require("./routes/task"));

// the variable PORT is declared because heroko recognizes it like this and port 4000 is declared, 
// any port that does not affect the system can be declared
const port = process.env.PORT || 4000;

app.listen(port, '0.0.0.0', () => { console.log(`Arranco el sistema en puerto: ${port}`) })
