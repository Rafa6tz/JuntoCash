const database = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = '1234'

exports.registerUser = async (req, res) =>{
    const {name, email, password} = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const result = await database.pool.query({
        text: 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        values: [name, email, hashed]
    }
    )
    res.json({message: 'User registered successfully', userId: result.rows[0].id});
}

exports.loginUser = async (req, res) =>{
    const {email, password} = req.body;

    const result = await database.pool.query({
        text: 'SELECT * FROM users WHERE email = $1',
        values: [email]
    })

    if(result.rowCount === 0 ){
        return res.status(401).json({ error: 'User not found'})
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password);

    if(!match){
        return res.status(401).json({ error: 'Invalid password'})
    }

    const token = jwt.sign({id: user.id}, SECRET, {expiresIn: '1h'})
    res.json({message: 'Login successful', token});
}

exports.profileUser = async(req, res) =>{

    try{
        const result = await database.pool.query({
            text: 'SELECT id, name, email FROM users WHERE id = $1',
            values: [req.user.id]
        })
        res.json(result.rows[0]);
    } catch(error){
        res.status(500).json({ error: 'Failed to fetch user profile' });
    }
}