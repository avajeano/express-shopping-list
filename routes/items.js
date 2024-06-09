const express = require("express");
const Item = require('../item');
const router = new express.Router();

// get all items 
router.get("", function(req, res, next){
    try{
        return res.json({ items: Item.findAll() });
    } catch(err){
        return next(err)
    }
});

// add an item to the shopping list
router.post("", function(req, res, next){
    try{
        let newItem = new Item(req.body.name, req.body.price);
        return res.json({item: newItem});
    } catch(err){
        return next(err)
    }
});

// get one item from the shopping list
router.get("/:name", function(req, res, next){
    try{
        const item = Item.find(req.params.name);
        res.json({ item });
    } catch(err){
        next(err)
    }
});

// edit name of item in shopping list
router.get("/:name", function(req, res, next){
    try{
        let foundItem = Item.update(req.parms.name, req.body);
        return res.json({ item: foundItem });
    } catch (err){
        return next(err)
    }
});

// delete specified item from the shopping list
router.delete("/:name", function(req, res, next){
    try{
        Item.remove(req.params.name);
        return res.json({message:"Deleted"});
    } catch (err){
        return next(err)
    }
});

module.exports = router;