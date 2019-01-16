var express = require("express"),
    app = express(),
    PORT = process.env.PORT || 3000;

app.use(express.static("dist"));

app.get("/", function(req, res) {
    res.render("index.html");
});

app.listen(PORT, function() {
    console.log(`Server is now running on port ${PORT}`);
});