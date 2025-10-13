const express = require('express');
const cors = require('cors');
const database = require('./database');

const PORT = process.env.PORT || 5000;

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://junto-cash-thhb-98seydjdu-rafaels-projects-28ebd802.vercel.app'
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

app.use(require('./routes/userRoute'))

app.use('/wallets', require('./routes/walletRoute'))
app.use('/wallets', require('./routes/transactionRoute'))
app.use('/categories', require('./routes/categorieRoute'))

app.listen(5000, () => {
    console.log(`Server is running on port ${PORT}`);
});

