const express = require('express');
const router = express.Router();
const db = require('./db');

// GET 
router.get('/', async (req, res) => {
    const [rows] = await db.query('SELECT * FROM records');
    res.json({ data: rows, message: '' });
});

// POST 
router.post('/', async (req, res) => {
    const { content } = req.body;
    const [result] = await db.query('INSERT INTO records (content) VALUES (?)', [content]);
    res.json({ insertID: result.insertId, message: 'Record inserted' });
});

// PATCH 
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    await db.query('UPDATE records SET content = ? WHERE id = ?', [content, id]);
    res.json({ data: [], message: 'Record updated' });
});

// DELETE 
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM records WHERE id = ?', [id]);
    res.json({ data: [], message: 'Record deleted' });
});

module.exports = router;
