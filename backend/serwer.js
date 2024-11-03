const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.listen(8001, () => {
    console.log(`Server is running on http://localhost:8001`);
});
