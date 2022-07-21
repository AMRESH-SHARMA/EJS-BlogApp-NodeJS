//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Click on compose tab to create new post that can appear on home page; on hard refresh variable array containing data get reset on local host and hence all previous stored post would get delete.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//GLOBAL VARIABLE ARRAY
let posts = [];

app.get('/', (req, res) => {
  res.render("home", {homeContent: homeStartingContent, posts: posts});
});


app.get('/about', (req, res) => {
  res.render("about", {aboutContent: aboutContent});
});


app.get('/contact', (req, res) => {
  res.render("contact", {contactContent: contactContent});
});

app.get('/compose', (req, res) => {
  res.render("compose");
});

app.post('/compose', (req, res) => {
  //JS OBJECT NAMED POST
  var post = {
    title: req.body.postTitle,
    body: req.body.postBody
  };

  posts.push(post);

  res.redirect('/');
});

app.get("/id/:customUrl", (req, res) => {

  const requestedTitle = req.params.customUrl;

  posts.forEach((post) => {

    const storedTitle = post.title;

    if (storedTitle === requestedTitle) {
      res.render("post",{title: requestedTitle, content: post.body });
    } else if (storedTitle !== requestedTitle) {
      res.render("404")
    }

  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});


