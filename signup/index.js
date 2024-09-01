const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");

function parseBody(req, callback) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        callback(querystring.parse(body));
    });
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (req.url === "/signup" && req.method === "GET") {
        res.setHeader("Content-Type", "text/html");
        res.write(`
            <h2>Signup Form</h2>
            <form action="/signup" method="POST">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required>
                <br>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
                <br>
                <button type="submit">Signup</button>
            </form>
        `);
        res.end();

    
    } else if (req.url === "/signup" && req.method === "POST") {
        parseBody(req, (body) => {
            const { username, password } = body;

            fs.appendFile("user.txt", `Username: ${username}, Password: ${password}\n`, (err) => {
                if (err) {
                    res.writeHead(500, { "Content-Type": "text/plain" });
                    res.end("Internal Server Error");
                } else {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end("<h3>Thank You for Signing Up...!!!</h3>");
                }
            });
        });

   
    } else if (req.url === "/allusers" && req.method === "GET") {
        fs.readFile("user.txt", "utf-8", (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Internal Server Error");
            } else {
                const users = data.split('\n').filter(line => line).map(line => {
                    
                    const [usernamePart] = line.split(", Password:");
                    return usernamePart;
                }).join("<br>");

                res.writeHead(200, { "Content-Type": "text/html" });
                res.write("<h2>All Users</h2>");
                res.write(users || "No users found.");
                res.end();
            }
        });

  
    } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h3>404 Not Found</h3>");
    }
});

// Listen on port 8080
server.listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
});
