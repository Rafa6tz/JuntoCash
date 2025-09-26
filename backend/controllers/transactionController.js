const database = require('../database');

exports.getAllTransactions = async (req, res) => {
    const walletId = req.params.walletId;
    const user_id = req.user.id;
    
    try {
        const checkAcess = await database.pool.query({
            text: `SELECT 1 FROM wallet_users WHERE wallet_id = $1 AND user_id = $2`,
            values: [walletId, user_id]
        })
        if(checkAcess.rowCount === 0){
            return res.status(403).json({ error: 'Access denied to this wallet' });
        }

        const result = await database.pool.query({
            text: `SELECT t.*, c.name as category_name
       FROM transactions t
       LEFT JOIN categories c ON t.category_id = c.id
       WHERE t.wallet_id = $1
       ORDER BY t.created_at DESC`,
            values: [walletId]
        })
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
}

exports.createTransaction = async (req, res) => {
    const { category_id, type, amount, description} = req.body;
    const wallet_id = req.params.walletId;
    const user_id = req.user.id;

    if(!wallet_id || !type || !category_id || !amount){
        return res.status(400).json({ error: 'Wallet ID, Type, Category ID and Amount are required' });
    }

    try {
        const checkAcess = await database.pool.query({
            text: `SELECT 1 FROM wallet_users WHERE wallet_id = $1 AND user_id = $2`,
            values: [wallet_id, user_id]
        })
        if(checkAcess.rowCount === 0){
            return res.status(403).json({ error: 'Access denied to this wallet' });
        }

        const result = await database.pool.query({
            text: `INSERT INTO transactions (wallet_id, category_id, type, amount, description)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            values: [wallet_id, category_id, type, amount, description || null]
        })

        res.status(201).json({message: 'Transaction created successfully', transaction: result.rows[0]});
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to create transaction' });
    }
}
