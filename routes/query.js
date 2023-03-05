const express  = require('express');
const router   = express.Router();
const fs       = require('fs');

function formOuput(input, type = null)
{
    let _type;
    let _count;
    let type_array = [];

    if(type)
    {
        input.stock.forEach(entry=>{
            if(entry.type == type)
            {
                _type  = entry.type;
                _count = entry.count;
            }
        });
        
        return `<p>Part #${_type}: ${_count} in inventory</p>`;
    }
    _type = input.name;
    input.stock.forEach(entry=>{
        type_array.push(`<p>Part #${entry.type}: ${entry.count} in inventory</p>`);
    });
    
    return type_array.join('');
}

//checks inventory for name of product type
//returns count for the specified product if in stock
router.post('/', (req, res)=>{
    if(!req.body.name) return res.render('../views/index.ejs');

    fs.readFile('inventory/currentInventory.json', (err, data)=>{
        if(err) throw err;

        let name  = [];
        
        //Finds the name of the type of product
        JSON.parse(data).forEach(entry=>{
            if(entry.name == req.body.name)
            {
                name.push(entry);
                return;
            }
        });
        
        res.render('../views/index.ejs', {results: formOuput(name[0], req.body.type), query_name: req.body.name});
    });
});

module.exports = router;