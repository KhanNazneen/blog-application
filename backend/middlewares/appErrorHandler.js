let errorHandler = (err, req, res, next) => {
    console.log("application error handler called");
    console.log(err);
    res.status(500).send("some error occured at global level")
}

let notFoundHandler = (req,res,next) => {
    console.log('Global not found handler is called')
    res.status(404).send("Route not found in the application")
    next();
}

module.exports = {
    globalErrorHandler: errorHandler,
    globalNotFoundHandler: notFoundHandler
} // use it in index.js after the routes