let add = (cart, req) => {
    cart.contents.push(req.body);
    return JSON.stringify(cart, null, 4);
};
let change = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
    return JSON.stringify(cart, null, 4);
};

let remove = (cart, req) => {
    let item = cart.contents.find(el => el.id_product === +req.params.id);
    if (item.quantity > 1) {
        item.quantity--;
    } else {
        cart.contents.splice(cart.contents.indexOf(req.params.id), 1);
    }
    return JSON.stringify(cart, null, 4);
};


module.exports = {
    add,
    change,
    remove
};