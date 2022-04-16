const cartItem = {
    props: ['cartItem', 'img'],
    template: `
            <li class="catalog__header-basket-products-item">
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
                    <button class="catalog__header-basket-products-item-btn"
                        @click="$root.$refs.cart.removeProduct(cartItem)"> <span>&times;</span>
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
            imgCart: '/img/index_products_img_1.jpg',
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
                for (item of this.cartItems) {
                    this.$parent.countProductsOfCart += item.quantity
                }
            }
        },

        addProduct(product) {
            let item = this.cartItems.find(item => item.id_product === product.id_product);
            if (item) {
                this.$parent.putJson(`/api/cart/${item.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            item.quantity++
                        }
                    })
            } else {
                const itemCart = Object.assign({ quantity: 1 }, product);
                this.$parent.postJson('/api/cart', itemCart)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(itemCart)
                        }
                    })
            }
        },

        removeProduct(product) {
            let item = this.cartItems.find(item => item.id_product === product.id_product);
            if (item) {
                this.$parent.deleteJson(`/api/cart/${item.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data) {
                            if (data.result === 1) {
                                item.quantity--
                            } else {
                                this.cartItems.splice(this.cartItems.indexOf(product), 1);
                            }
                        }
                    })
            }
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
                :img="imgCart" 
                :cart-item="item">
                </cart-item>                       
            </ul>
        </div>`

};

