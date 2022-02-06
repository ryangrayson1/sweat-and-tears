const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static(path.resolve(__dirname, './frontend/build')));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, './frontend/build', 'index.html'));
  });
  
  const PORT = process.env.PORT || 3001;
  
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
  });
  
  module.exports = app;