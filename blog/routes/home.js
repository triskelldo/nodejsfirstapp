const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    res.render('home', {
        title: 'Triskell knowledge',
      });
});

module.exports = router;