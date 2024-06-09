// ITEM IN A SHOPPING CART

const items = require("./fakeDb")
const ExpressError = require("./expressError");

class Item {
    constructor(name, price){
        this.name = name;
        this.price = price;
        items.push(this)
    }
    static findAll(){
        return items
    }

    static update(name, data){
        let foundItem = Item.find(name);
        if(foundItem === undefined){
            throw new ExpressError ("Not found", 404);
        }
        foundItem.name = data.name;
        foundItem.price = data.price;

        return foundItem;
    }

    static find(name){
        const foundItem = items.find(value => value.name === name);
        if(foundItem === undefined){
            throw new ExpressError ("Not found", 404);
        }
        return foundItem
    }

    static remove(name){
        const foundIndex = items.findIndex(value => value.name === name);
        if(foundIndex === -1){
            throw new ExpressError ("Not found", 404);
        }
        items.splice(foundIndex, 1)
    }
}

module.exports = Item;