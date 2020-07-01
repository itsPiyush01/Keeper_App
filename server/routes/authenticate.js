const express = require("express")

const Authenticate = express();

Authenticate.route("/api/authenticate")
    .get((req, res) => {
        res.send("Hello");
    })



