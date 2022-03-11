const fs = require('fs');
const path = require('path');
const http = require('http');

const config = { 
    public_path: path.resolve('./public'), // folder with static files
    index_html: 'bg-26.html' // name of the input html file
};

const static_files = fs.readdirSync(config.public_path);

const path_names = static_files.map(file => {
    return {
        path: file,
        url_path: config.index_html === file ? '/' : '/' + file
    };
});

const server = http.createServer((req, res) => {

    path_names.forEach(file => {
        if (req.url === file.url_path) {
            const read_file = fs.readFileSync(path.join(config.public_path, file.path));
            res.write(read_file);
            res.end();
        };
    });
    
});

server.listen(8000, () => console.log('Listening to port 8000'));
