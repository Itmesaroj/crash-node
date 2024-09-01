const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        res.write("Welcome to Home Page");
    } else if (req.url == "/aboutus") {
        res.setHeader("Content-Type", "text/html");
        res.write("<h3>Welcome to About Page</h3>");
    } else if (req.url == "/contactus") {
        res.setHeader("Content-Type", "text/html");
        res.write('<a href="https://www.masaischool.com/">Masai School</a>');
    } else if (req.url == "/index") {
        try {
            const read = fs.readFileSync("index.js", "utf-8");
            res.write(read);
        } catch (error) {
            res.write("Error reading file");
        }
    } else {
        res.statusCode = 404;
        res.write("404 Not Found");
    }
    res.end();
});

server.listen(8080, () => {
    console.log("Server running on port 8080");
});
