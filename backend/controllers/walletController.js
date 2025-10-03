const database = require('../database');


// @desc    Get wallet balance
// @route   GET /wallets/:id/balance
// @access  Private
exports.getWalletBalance = async (req, res) =>{
    const walletId = req.params.id;

    try {
        const result = await database.pool.query({
        text: `
      SELECT 
          w.id AS wallet_id,
          w.name AS wallet_name,
          COALESCE(SUM(
              CASE 
                  WHEN t.type = 'income' THEN t.amount
                  WHEN t.type = 'expense' THEN -t.amount
                  ELSE 0
              END
          ), 0) AS balance
      FROM wallets w
      LEFT JOIN transactions t ON w.id = t.wallet_id
      WHERE w.id = $1
      GROUP BY w.id, w.name;
    `,
    values: [walletId]
        })

        if(result.rowCount === 0){
            return res.status(404).json({ error: 'Wallet not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch wallet balance' });
    }
}


// @desc    Create a new wallet
// @route   POST /wallets
// @access  Public
exports.createWallet = async (req, res) => {
    const { name } = req.body;
    const user_id = req.user.id;

    if (!name || !user_id) {
        return res.status(400).json({ error: 'Name and User ID are required' });
    }

    try {
        // Cria a wallet
        const walletResult = await database.pool.query({
            text: `INSERT INTO wallets (name, type) VALUES ($1, $2) RETURNING *`,
            values: [name, 'individual']
        });

        const wallet_id = walletResult.rows[0].id;

        // Relaciona usuário criador como owner
        await database.pool.query({
            text: 'INSERT INTO wallet_users (wallet_id, user_id, role) VALUES ($1, $2, $3)',
            values: [wallet_id, user_id, 'owner']
        });

        // Categorias padrão
        const defaultExpenses = ['Mercado', 'Lazer', 'Transporte', 'Moradia', 'Saúde'];
        const defaultIncomes = ['Salário', 'Pix'];

        const values = [];

        defaultExpenses.forEach(cat => {
            values.push([wallet_id, 'expense', cat]);
        });
        defaultIncomes.forEach(cat => {
            values.push([wallet_id, 'income', cat]);
        });

        // Query dinâmica para inserir várias categorias
        const insertQuery = `
            INSERT INTO categories (wallet_id, type, name)
            VALUES ${values.map((_, i) => 
                `($${i*3+1}, $${i*3+2}, $${i*3+3})`
            ).join(', ')}
        `;

        await database.pool.query(insertQuery, values.flat());

        res.status(201).json({
            message: 'Wallet created successfully with default categories',
            wallet: walletResult.rows[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create wallet' });
    }
};


// @desc    Get all wallets for a user
// @route   GET /wallets
// @access  Private
exports.getWallets = async (req, res) =>{
    const user_id = req.user.id
    try {
        const result = await database.pool.query({
            text: `SELECT w.id, w.name, w.type
                   FROM wallets w
                   JOIN wallet_users wu ON w.id = wu.wallet_id
                     WHERE wu.user_id = $1`,
            values: [user_id]
        })
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch wallets' });
    }
}

// @desc    Add user to a wallet
// @route   POST /wallets/:id/users
// @access  Private
exports.addUserToWallet = async (req, res) =>{
    const walletId = req.params.id;
    const {user_id, role} = req.body;
    if(!user_id || !role){
        return res.status(400).json({ error: 'User ID and Role are required' });
    }
    try {
        // Check if wallet exists
        const walletCheck = await database.pool.query({
            text: 'SELECT * FROM wallets WHERE id = $1',
            values: [walletId]
        })
        if(walletCheck.rowCount === 0){
            return res.status(404).json({ error: 'Wallet not found' });
        }
        // Add user to wallet
        await database.pool.query({
            text: 'INSERT INTO wallet_users (wallet_id, user_id, role) VALUES ($1, $2, $3)',
            values: [walletId, user_id, role]
        })
        res.status(200).json({message: 'User added to wallet successfully'})
    } catch (error) {
        res.status(500).json({ error: 'Failed to add user to wallet' });
    }
}