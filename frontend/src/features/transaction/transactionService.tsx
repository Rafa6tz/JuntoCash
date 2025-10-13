import axios from "axios";


// Create new transaction
const createTransaction = async (transactionData, walletId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(`https://juntocash-1.onrender.com/wallets/${walletId}/transactions`, transactionData, config);

    return response.data;
}

const transactionService = {
    createTransaction
}
export default transactionService;