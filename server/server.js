const express = require("express");
const cors = require("cors");
const { nanoid } = require("nanoid");
const store = require("./store");

const app = express();

const PORT = process.env.PORT || 3000;

const BASE_URL =
    "https://ad9bd71f-8b18-4464-9406-b156f227af96-00-23tp6jt52nota.sisko.replit.dev/";

app.use(cors());
app.use(express.json());

app.post("/shorten", (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({
            error: "No URL provided",
        });
    }

    const id = nanoid(6);

    store.set(id, url);

    res.json({
        shortUrl: `${BASE_URL}/${id}`,
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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
