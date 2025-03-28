const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Serve static files from the public directory
app.use(express.static('public'));

// API endpoint to get all submissions
app.get('/api/submissions', (req, res) => {
  try {
    const submissions = JSON.parse(localStorage.getItem('admissionFormData') || '[]');
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 