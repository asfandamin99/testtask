
export let log_req = (req, res, next) => {
    console.log("Time: ", new Date())
    console.log("URL:", req.originalUrl);
    console.log("body:", req.body);
    console.log("query:", req.query);
    console.log(" ")
    next()
}