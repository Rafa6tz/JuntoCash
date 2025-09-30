import axios from "axios";

const API_URL = 'http://localhost:5000/wallets/'

//Get wallet balance
const getWalletBalance = async(walletId, token) => {
    const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
    const response = await axios.get(API_URL + `${walletId}/balance`, config)
    return response.data
}

//Get all wallets from user
const getWallets = async(token) => {
    const config = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

const walletService = {
    getWalletBalance,
    getWallets
}

export default walletService;