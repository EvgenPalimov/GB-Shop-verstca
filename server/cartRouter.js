const express = require('express');
const fs = require('fs');
const router = express.Router();
const logHandler = require('./logHandler');
const handler = require('./handler');

router.get('/', (req, res) => {
    fs.readFile('server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
            res.send(data);
        }
    })
});
router.post('/:id/:name', (req, res) => {
    handler(req, res, 'add', 'server/db/userCart.json');
    logHandler(req, res, 'add', `server/db/stats.json`);
});
router.put('/:id/:name', (req, res) => {
    handler(req, res, 'change', 'server/db/userCart.json');
    logHandler(req, res, 'change', `server/db/stats.json`);
});
router.delete('/:id/:name', (req, res) => {
    handler(req, res, 'remove', 'server/db/userCart.json');
    logHandler(req, res, 'remove', `server/db/stats.json`);
})
module.exports = router;