const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('./db');  
const authMiddleware = require('./middleware/authMiddleware');

app.use(express.json());

// Endpoint de autenticación
app.post('/acceso', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Usuario y contraseña requeridos' });
    }
    
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    const user = rows[0];
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
    
    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
});

// Proteccion endspoint
app.use('/data', authMiddleware);

const routes = require('./routes');
app.use('/data', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
