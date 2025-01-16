const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);

app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <header>
        <h2><a href="/">Anonymous Journal</a></h2>
        <nav>
            <a href="/submit">Submit</a>
            <a className="nav2" href="#">About<span></span></a>
                    <a className="nav3" href="#">Browse<span></span></a>
        </nav>
    </header>
    <main>
        <form action="/register" method="POST">
            <fieldset>
                <legend>Send a message</legend>
                <label for="uName"><small>Name</small></label>
                <input type="text" id="uName" name="uName" autocomplete="off">

                <label for="message"><small>Type your message</small></label>
                <input type="message" id="message" name="message" autocomplete="off">

                <br />
                <button>Submit</button>
            </fieldset>
        </form>
    </main>
    <footer>
        <small>&copy; Anonymous Journal</small>
    </footer>
</body>
</html>`);
});


//connection to MongoDB
mongoose
    .connect("mongodb+srv://vilgeralorraine:LORIRI@journalform.fdftr.mongodb.net/", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((error) => {
        console.error("MongoDB Connection Error:", error.message);
        process.exit(1);
    });

    
//middleware
app.use(cors({origin: ["https://vilgeraapi.azurewebsites.net/submit", "http://localhost:3000/submit", "https://kind-smoke-0b48cd800.4.azurestaticapps.net/"], methods: ["GET", "POST"]}));
app.use(express.json());

//Import API FOLDER
const submitJournalForm = require("./API/submit");

//use API submit
app.use("/submit", submitJournalForm);


//start the server
const PORT = process.env.PORT || 3000;

server .listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 