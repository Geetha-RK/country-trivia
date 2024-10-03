import express, { json } from 'express';
// import countrydata from './data/country.json' assert { type: 'json' };
import country from './routes/country.js'
import cors from "cors";

const PORT = 8080;

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log('Middleware');
    next();
})

app.use('/country',country);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});