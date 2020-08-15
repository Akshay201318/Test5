// const Post = require('../models/post');

module.exports.home = async function (req, res) {
    res.render('home', {
        title: "Home",
    });

}