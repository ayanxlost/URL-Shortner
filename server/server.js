const express = require("express");
const cors = require("cors");
const { nanoid } = require("nanoid");
const store = require("./store");

const app = express();

const PORT = 3000;

//Replace with your local IPv4 address
const BASE_URL = "IP_ADDRESS_HERE";

app.use(cors());
app.use(express.json());

app.post("/shorten", (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({
            error: "No URL provided"
        });
    }

    const id = nanoid(6);

    store.set(id, url);

    res.json({
        shortUrl: `${BASE_URL}/${id}`
    });
});

app.get("/:id", (req, res) => {
    const url = store.get(req.params.id);

    if (!url) {
        return res.status(404).send("Not found");
    }

    res.redirect(url);
});

app.get("/", (req, res) => {
    res.send("URL Shortener API Running");
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at ${BASE_URL}`);
});
