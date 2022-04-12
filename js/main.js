const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        filtered: [],
        cartItems: [],
        countProducts: 0,
        imgCatalog: 'img/index_products_img_1.jpg',
        userSearch: '',
        showCart: false,
        showHeaderMenu: false,
        error: false
    },
    methods: {
        filter() {
            const regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));

        },

        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                    this.error = true;
                })
        },

        addProduct(product) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let item = this.cartItems.find(item => item.id_product === product.id_product);
                        if (item) {
                            item.quantity++;
                            this.countProducts++;
                        } else {
                            let itemCart = Object.assign({ quantity: 1 }, product);
                            this.cartItems.push(itemCart);
                            this.countProducts++;
                        }
                    }
                })
        },

        deleteProduct(product) {
            let item = this.cartItems.find(item => item.id_product === product.id_product);
            if (item.quantity > 1) {
                item.quantity--;
                this.countProducts--;
            } else {
                this.cartItems.splice(this.cartItems.indexOf(product), 1);
                this.countProducts--;
            }
        }
    },

    mounted() {
        this.getJson(`data/getProducts.json`)
            .then(data => {
                for (let el of data) {
                    this.$data.products.push(el);
                    this.$data.filtered.push(el);
                }
            });
    }
})
