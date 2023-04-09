import express from 'express';
import { PORT } from './src/config/config.js';
import router from './src/routes/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router)

app.listen(PORT , () => {
    console.log('Server running on port ' + PORT);
}
);