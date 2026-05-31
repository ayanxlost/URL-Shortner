const express = require("express");
const cors = require("cors");
const { nanoid } = require("nanoid");
const store = require("./store");

const app = express();
const PORT = process.env.PORT || 443;

// IMPORTANT: change this to YOUR backend URL
const BASE_URL = "";

app.use(cors({
    origin: "*"
}));

app.use(express.json());

// Create short URL
app.post("/shorten", (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "No URL provided" });
    }

    const id = nanoid(6);
    store.set(id, url);

    res.json({
        id: id,
        shortUrl: `${BASE_URL}/${id}`
    });
});

// Redirect short URL
app.get("/:id", (req, res) => {
    const url = store.get(req.params.id);

    if (!url) {
        return res.status(404).send("Not found");
    }

    res.redirect(url);
});

// Health check
app.get("/", (req, res) => {
    res.send("URL Shortener API Running");
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on ${BASE_URL}`);
});
