const database = require('../database');

// @desc    Get Income categories
// @route   GET /categories
// @access  Public
exports.getIncomeCategories = async (req, res) => {
    wallet_id = req.params.id
    try {
        const result = await database.pool.query({
            text: `SELECT * FROM categories
            WHERE wallet_id = $1
            AND type = 'income'`,
            values: [wallet_id]
        })
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch income categories' });
    }
}

// @desc    Get expense categories
// @route   GET /categories
// @access  Public
exports.getExpenseCategories = async (req, res) => {
    wallet_id = req.params.id
    try {
        const result = await database.pool.query({
            text: `SELECT * FROM categories
            WHERE wallet_id = $1
            AND type = 'expense'`,
            values: [wallet_id]
        })
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch expense categories' });
    }
}