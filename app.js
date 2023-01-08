const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Firsts Page</title></head>');
        res.write(
            '<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>'
        )
        res.write('</html>');
        return res.end();
    }

//a
    if (url === '/users') {
       
        var data = fs.readFileSync('users.txt').toString(); 
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>LAb 2.1</title></head>');
        res.write('<body><ul><li>');
        res.write(data);
        res.write('</li> <li>user 2</li></ul ></h1 ></body > ');
        res.write('</html>');
        res.end();
    }
    if (url === '/create-user') {
        const body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
           
        });
   
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1];
            fs.writeFileSync('users.txt', username);
            console.log(username);
        })


        res.statusCode = 302;
        res.setHeader('Location', '/users');
        return res.end();
    }

});

server.listen(3000);