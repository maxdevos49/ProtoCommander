import http from "http";
import fs from "fs";
import path from "path";

function template(files: string[]): string {
    return /*html*/`
<html>

    <head>
        <meta charset="utf-8">
        <title>Mocha Tests</title>
        <link href="https://unpkg.com/mocha/mocha.css" rel="stylesheet" />
    </head>
    
    <body>
        <div id="mocha"></div>
    
        <script src="https://unpkg.com/chai/chai.js"></script>
        <script src="https://unpkg.com/mocha/mocha.js"></script>
    
        <script>mocha.setup('bdd')</script>
        
        ${files.map(f => `<script type="module" src="${f}"></script>`).join("\n")}

        <script type="module">
            mocha.checkLeaks();
            mocha.run();
        </script>
    </body>
    
</html>`;
};

function findFiles(callback: (err: string | null, files: string[] | null) => void) {

    function recursiveFileFinder(rootFolder: string): string[] {

        let result: string[] = [];

        fs.readdirSync(rootFolder).forEach((f) => {

            if (fs.lstatSync(rootFolder + "/" + f).isDirectory())
                recursiveFileFinder(rootFolder + "/" + f).forEach(ff => result.push(ff));

            if (f.endsWith("test.js"))
                result.push(rootFolder + "/" + f);

        });

        return result;
    };

    try {
        callback(null, recursiveFileFinder("./test"));
    } catch (err) {
        callback(err, null);
    }


}

const server = http.createServer((req, res) => {

    let filePath = '.' + req.url;
    if (filePath == './') {
        filePath = './index.html';
    }

    if (filePath === "./index.html") {

        findFiles((err, files) => {

            if (err || files === null) {
                res.writeHead(500);

                res.end("Error: " + err);
                return;
            }

            res.writeHead(200);
            res.end(template(files), "utf-8");
        });

    } else {

        let extname = String(path.extname(filePath)).toLowerCase();
        let mimeTypes = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.wav': 'audio/wav',
            '.mp4': 'video/mp4',
            '.woff': 'application/font-woff',
            '.ttf': 'application/font-ttf',
            '.eot': 'application/vnd.ms-fontobject',
            '.otf': 'application/font-otf',
            '.wasm': 'application/wasm'
        };

        let contentType = (mimeTypes as any)[extname] || 'application/octet-stream';

        fs.readFile(filePath, function (error, content) {

            if (error) {
                if (error.code == 'ENOENT') {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end("Content not found", 'utf-8');
                }
                else {
                    res.writeHead(500);
                    res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                }
            }
            else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }
});

server.listen(process.env.PORT || 8080);