import express from "express";
import Store from "../src/store.js";

const app = express();
const store = new Store();

app.get("/api/posts", (req, res) => {
    const cached = store.get("posts");
    if (cached !== null) {
        return res.set("X-Cache", "HIT").json(cached);
    }
    const data = { message: "Hello from SulfurDB" };
    store.set("posts", data, 10);
    res.set("X-Cache", "MISS").json(data);
});

app.listen(5000, () => {
    console.log("Listening at 5000");
});