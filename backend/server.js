const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const nftStorageEndpoint = 'https://api.nft.storage';
const nftStorageApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGY2ODk3NkI1Nzk0M0MwMWFFNTU3OTBEMjg0NWI1NzMyOEMxQTc1RTYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwMjkxODkxMDgyOCwibmFtZSI6IkRlY2VudHJhbGl6ZWQgU2VhcmNoIEVuZ2luZSJ9.lxJVoWFK_sZ7I9ohAz9keCn_iueR2mB0LD1NIlyNY4Y';

app.use(express.json());
app.use(cors());

// POST endpoint to add data to IPFS
app.post('/api/add', async (req, res) => {
    try {
        const dataToAdd = req.body.data; // Assuming the data is sent in the request body
        const result = await addToIPFS(dataToAdd);
        res.json(result);
    } catch (error) {
        console.error('Error adding data to IPFS:', error);
        res.status(500).json({ error: error.message });
    }
});

// GET endpoint for searching
app.get('/api/search', async (req, res) => {
    try {
        const query = req.query.q;
        const results = await searchInIPFS(query);
        res.json(results);
    } catch (error) {
        console.error('Error searching:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

// Function to add data to IPFS using NFT.Storage
async function addToIPFS(data) {
    if (!nftStorageApiKey) {
        throw new Error('NFT Storage API key is not provided');
    }

    try {
        const response = await axios.post(`${nftStorageEndpoint}/api/nfts`, {
            data,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Api-Key': nftStorageApiKey,
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(`Error adding data to NFT.Storage: ${error.response.statusText}`);
    }
}

// Function to search data in IPFS
async function searchInIPFS(query) {
    if (!nftStorageApiKey) {
        throw new Error('NFT Storage API key is not provided');
    }

    try {
        const response = await axios.get(`ipfs://bafkreic5cmwloe3c7mvppvtssbfgvbdj5st5pk5aanatjn4omlf7q7lpki/${query}`, {
            headers: {
                'Content-Type': 'application/json',
                'Api-Key': nftStorageApiKey,
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(`Error searching in NFT.Storage: ${error.response.statusText}`);
    }
}