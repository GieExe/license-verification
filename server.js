const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// In-memory "database" of licenses for simplicity
const licenses = {
    "ABC123": { valid: true },
    "XYZ789": { valid: false }
};

// License verification route
app.post('/verify-license', (req, res) => {
    const { licenseKey } = req.body;

    if (!licenseKey) {
        return res.status(400).json({ error: "License key is required" });
    }

    const license = licenses[licenseKey];

    if (license) {
        res.status(200).json({ valid: license.valid });
    } else {
        res.status(404).json({ error: "License not found" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
