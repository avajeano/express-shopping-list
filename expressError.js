class ExpressError extends Error {
    constructor(message, status){
        // have to call super when extending a parent class
        super();
        this.message = message;
        this.status = status;
        // every error has a stack property 
        console.log(this.stack);
    }
}

module.exports = ExpressError;