const express  = require('express');
const router   = express.Router();
const hash     = require('../algorithms/hash');
const fs       = require('fs');

//gathers username and password to navigate to index
//checks hash of password with stored salt attached to username
router.post('/', (req, res)=>{
        fs.readFile("users/passwordhashes.json", (err, data)=>{
                if(err) throw err;

                let results = JSON.parse(data);
                let record;

                results.forEach(entry=>{
                        if(entry.username == req.body.username)
                        {
                                record = entry;
                                return;
                        }
                });

                if(record === undefined)
                        res.redirect("/");
                else
                        hash(req.body.password, record.salt) ? 
                                res.render('../views/index.ejs', {fullname: record.name}) :
                                res.redirect("/");
        });
});

module.exports = router;