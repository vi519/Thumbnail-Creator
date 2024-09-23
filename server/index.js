const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8081;

// Allow CORS for all origins
app.use(cors());

// Serve static files from the 'icons' directory
app.use(express.static(path.join(__dirname, 'icons')));

// Endpoint to search for SVG files
app.get('/api/search-svg', (req, res) => {
  const { folderName, searchQuery } = req.query;
  const iconsFolderPath = path.join(__dirname, 'icons');

  // Check if the 'icons' folder exists
  fs.access(iconsFolderPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("Icons folder does not exist:", err);
      res.status(500).send({ error: 'Internal server error' });
      return;
    }

    // Read the 'icons' folder and search for the folder matching the input
    fs.readdir(iconsFolderPath, (err, folders) => {
      if (err) {
        console.error("Error reading icons folder:", err);
        res.status(500).send({ error: 'Internal server error' });
        return;
      }

      // Find the folder that matches the input
      const matchedFolder = folders.find(folder => 
        folder.toLowerCase().includes(folderName.toLowerCase())
      );

      if (!matchedFolder) {
        console.error("No folder matching the input found");
        res.status(404).send({ error: 'Folder not found' });
        return;
      }

      const matchedFolderPath = path.join(iconsFolderPath, matchedFolder);

      // Read the matched folder and retrieve SVG files
      fs.readdir(matchedFolderPath, (err, files) => {
        if (err) {
          console.error("Error reading matched folder:", err);
          res.status(500).send({ error: 'Internal server error' });
          return;
        }

        const svgFiles = files.filter(file => file.endsWith(".svg"));
        const svgFileContents = [];

        svgFiles.forEach(file => {
          const filePath = path.join(matchedFolderPath, file);
          const content = fs.readFileSync(filePath, 'utf8');
          svgFileContents.push({ fileName: file, content });
        });

        res.json(svgFileContents);
      });
    });
  });
});

// Endpoint to read data from a JSON file
app.get('/data', (req, res) => {
  // Read the JSON file
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Parse JSON data
    const jsonData = JSON.parse(data);

    // Send JSON response
    res.json(jsonData);
  });
});

// Serve the React application
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
