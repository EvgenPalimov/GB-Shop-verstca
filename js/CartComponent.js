Vue.component('cart', {
    props: ['cartItems', 'img', 'visible'],
    template:
        `<div class="catalog__header-basket-modal" id="basket-modal" v-show="$root.showCart">
            <div v-if="cartItems.length === 0" class="catalog__header-basket-products-another">
                <span>There are no products in the basket!</span>
            </div>
            <ul v-else class="catalog__header-basket-products">
                <cart-item v-for="item of cartItems" :key="item.id_product" :img="img" :cart-item="item">
                </cart-item>                       
            </ul>
        </div>`

});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template:
        `<li class="catalog__header-basket-products-item">
            <img class="catalog__header-basket-products-item-photo" :src="img"
                alt="item photo">
            <div class="catalog__header-basket-products-item-wrp">
                <span
                    class="catalog__header-basket-products-item-title">{{ cartItem.product_name }}</span>
                <span class="catalog__header-basket-products-item-txt">Quantity: {{ cartItem.quantity }}.</span>
                <span class="catalog__header-basket-products-item-txt">Total cost of goods:
                    {{cartItem.quantity*cartItem.price}} $</span>
            </div>
            <div class="catalog__header-basket-products-item-wrp-2">
                <span class="catalog__header-basket-products-item-title">{{ cartItem.price }}
                    $</span>
                <button class="catalog__header-basket-products-item-btn txt"
                    @click="$root.deleteProduct(cartItem)"> <span>&times;</span>
                </button>
            </div>
        </li>
        `
})