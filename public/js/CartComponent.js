const cartItem = {
    props: ['cartItem'],
    template: `
            <li class="catalog__header-basket-products-item">
                <img class="catalog__header-basket-products-item-photo" :src="cartItem.image"
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
                    <button class="catalog__header-basket-products-item-btn"
                        @click="$parent.removeProduct(cartItem)"> <span>&times;</span>
                    </button>
                </div>
            </li>
         `
}

const cart = {
    components: { 'cart-item': cartItem },
    data() {
        return {
            cartItems: [],
            showCart: false
        }
    },

    mounted() {
        this.$parent.getJson('/api/cart')
            .then(data => {
                for (let item of data.contents) {
                    this.$data.cartItems.push(item)
                }
                this.countProducts()
            })
    },
    methods: {
        countProducts() {
            if (this.cartItems) {
                this.$parent.countProductsOfCart = 0;
                for (item of this.cartItems) {
                    this.$parent.countProductsOfCart += item.quantity
                }
            }
        },

        addProduct(product) {
            let item = this.cartItems.find(el => el.id_product === product.id_product);
            if (item) {
                this.$parent.putJson(`/api/cart/${product.id_product}/${product.product_name}`, { quantity: 1 })
                    .then(data => {
                        if (data.result) {
                            item.quantity++;
                        }
                    })
            } else {
                const itemCart = Object.assign({ quantity: 1 }, product);
                this.$parent.postJson(`/api/cart/${product.id_product}/${product.product_name}`, itemCart)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.push(itemCart)
                        }
                    })
            }
            this.countProducts()
        },

        removeProduct(product) {
            if (product.quantity > 1) {
                this.$parent.putJson(`/api/cart/${product.id_product}/${product.product_name}`, { quantity: -1 })
                    .then(data => {
                        if (data.result) {
                            product.quantity--;
                        }
                    })
            } else {
                this.$parent.delJson(`/api/cart/${product.id_product}/${product.product_name}`, product)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        } else {
                            console.log('Error - delete of product');
                        }
                    })
            }
            this.countProducts()
        }
    },
    template: `
        <div class="catalog__header-basket-modal" id="basket-modal" v-show="showCart">
            <div v-if="cartItems.length === 0" class="catalog__header-basket-products-another">
                <span>There are no products in the basket!</span>
            </div>
            <ul v-else class="catalog__header-basket-products">
                <cart-item 
                v-for="item of cartItems" 
                :key="item.id_product" 
                :cart-item="item">
                </cart-item>                       
            </ul>
        </div>`

};

