//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//_____________________________________________________________Items db Schema and model
mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});     //Creates and opens blog DB

//db's Schema declared
const itemsSchema = {                                        
    title: String,
    body: String
};

//db's model declared, now use various CRUD methods of model
const Item = mongoose.model("Item", itemsSchema);           
//____________________________________________________________________________________________________

app.get('/', (req, res) => {

  Item.find({}, (err, foundItems) => {
      res.render("home", {posts: foundItems});
  }); 
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
               
    const item = new Item({
      title: req.body.postTitle,
      body: req.body.postBody
    });
    item.save(); 
    console.log("Post saved successfully")                                       
    res.redirect('/');
});


app.get("/id/:postId", (req, res) => {

  const requestedPostId = req.params.postId;

  Item.findOne({_id : requestedPostId}, (err, foundItems) => {
    res.render("post",{title: foundItems.title, content: foundItems.body });
  });

});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});


