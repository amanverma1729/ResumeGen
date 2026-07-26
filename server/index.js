const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'resume_data.json');

app.use(cors());
app.use(express.json());

// Initialize data file if not exists
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({}));
}

// Helper to read data
const readData = () => {
    try {
        const content = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(content);
    } catch (e) {
        return {};
    }
};

// Helper to write data
const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the Resume Gen API' });
});

// Save resume data
app.post('/api/resume/save', (req, res) => {
    const { id, data } = req.body;
    if (!id || !data) {
        return res.status(400).json({ error: 'ID and data are required' });
    }
    const resumes = readData();
    resumes[id] = data;
    writeData(resumes);
    res.json({ success: true, message: 'Resume saved successfully' });
});

// Load resume data
app.get('/api/resume/load/:id', (req, res) => {
    const { id } = req.params;
    const resumes = readData();
    const data = resumes[id];
    if (!data) {
        return res.status(404).json({ error: 'Resume not found' });
    }
    res.json({ success: true, data });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
