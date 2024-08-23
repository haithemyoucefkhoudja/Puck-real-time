// server.js
const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const path = require('path');
const fs = require('fs');

const app = next({ dev });
const multer = require('multer');

const handle = app.getRequestHandler();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${process.cwd()}/uploads/`); // Set the directory where files will be stored
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Set the file name to be the original file name
    }
  });
  
  const upload = multer({ storage });
  
app.prepare().then(() => {
  const server = express();

  // Middleware to parse JSON and form data
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  //server.use(bodyParser.urlencoded({ extended: true }));
  // API route to handle CSS file uploads
  server.get('/uploads/:file', (req, res) => {
    const filePath = path.join(process.cwd(), 'uploads', req.params.file);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(400).send('File not found');
    }
  });
  server.post('/api/upload-css', upload.single('cssFile'), (req, res) => {
    
    console.log('File:', req.file); // The uploaded file information
    console.log('Body:', req.body); // Other fields in the form data, if any
    res.json({ message: 'File uploaded successfully!' });
    
  });

  // Handle all other Next.js requests
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Start the server
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
