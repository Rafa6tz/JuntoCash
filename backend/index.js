const express = require('express');
const cors = require('cors');
const database = require('./database');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());

app.use(require('./routes/userRoute'))

app.use('/wallets', require('./routes/walletRoute'))
app.use('/wallets', require('./routes/transactionRoute'))

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});