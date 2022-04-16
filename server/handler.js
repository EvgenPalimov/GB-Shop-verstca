const cart = require('./cart');
const fs = require('fs');

const actions = {
    add: cart.add,
    change: cart.change,
    remove: cart.remove
};

let handler = (req, res, action, file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            console.log('handler-error')
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
            let newCart = actions[action](JSON.parse(data), req);
            console.log('handler-else')
            fs.writeFile(file, newCart, (err) => {
                if (err) {
                    console.log('handler-write-error')
                    res.send(JSON.stringify({ result: 0, text: err }));
                } else {
                    console.log('handler-write-send')
                    res.send(JSON.stringify({ result: 1, text: 'SUCCESS' }));
                }
            })
        }
    })
};

module.exports = handler;