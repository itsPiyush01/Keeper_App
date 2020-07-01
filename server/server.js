const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = express();
mongoose.connect("mongodb://localhost:27017/keeperAppDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

noteSchema = {
  title: "String",
  content: "String",
};

const Note = mongoose.model("Note", noteSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(morgan('div'));

// Add intentional latency FOR TESTING PURPOSE ONLY
// app.use(function (req, res, next) {
//   setTimeout(next, 2000);
// });

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  // if (req.body === "OPTIONS") {
  //   res.render("Access-Control-Allow-Methode", "PUT ,POST,PATCH,DELETE,GET");
  //   return res.status(200).json({});
  // }
  next();
});

//api/notes/%20
app
  .route("/api/notes/:id")
  .get((req, res) => {
    console.log("Get Request");
    Note.find((err, notes) => {
      if (err) {
        console.log(err);
      } else {
        res.send(notes);
      }
    });
  })
  .post((req, res) => {
    console.log("Post Request");
    const title = req.body.title;
    const content = req.body.content;
    const newNote = new Note({
      title: title,
      content: content,
    });
    newNote.save((err) => {
      if (err) {
        console.log(err);
      } else {
        res.send(`<h1>${title}<h1> <p>${content}</p> Response Saved`);
      }
    });
    console.log("Server Title: " + title);
    console.log("Server Content:" + content);
  })
  .delete((req, res) => {
    console.log("Delete Request");
    const id = req.params.id;
    Note.deleteOne({ _id: id }, function (err) {
      if (err) {
        res.send(err);
      } else res.send("Successfully Deleted The Note");
    });
  });
///////////////////////////////////////////// Authentication ////////////////////////////

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Post created...",
        authData,
      });
    }
  });
});

app.post("/api/login", (req, res) => {
  // Mock user
  const user = {
    id: 1,
    username: "Piyush",
    email: "piyushranjan1402@gmail.com ",
  };

  /*
    old style
   jwt.sign({ user:user }, 'secretkey', { expiresIn: '30s' }, (err, token) => {
    res.json({
   token:token
  */
  //ES6
  jwt.sign({ user }, "secretkey", { expiresIn: "30s" }, (err, token) => {
    res.json({
      token,
    });
  });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////

const port = 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
