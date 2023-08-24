const express = require('express');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const feedRoutes = require('./routes/feedRoutes');
const logRoutes = require('./routes/logRoutes');

const app = express();

app.use(express.json());

app.use('/auth', authRoutes); //contains the authentication routes
app.use('/user', userRoutes); //To create different user types with access to feeds by different users like "admin", "super-admin" aslo with CRUD operations.
app.use('/feed', feedRoutes); //To perform CRUD operations on feeds by different users based on their roles. 
app.use('/logs', logRoutes); //To access the logs

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});