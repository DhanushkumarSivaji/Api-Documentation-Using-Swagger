const express = require('express');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const cors = require('cors');
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors())

// API Documentation
if (process.env.NODE_ENV != 'production') {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
  

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
