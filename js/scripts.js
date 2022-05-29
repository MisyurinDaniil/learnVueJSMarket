let vueApp = new Vue({
    el: '#app',
    data: {
        message: 'Hello word',
        products: [],
        productsFilter: [],
        cartProducts: [],
        API: 'https://raw.githubusercontent.com/MisyurinDaniil/learnVueJSMarket/master/json/',
        productsURL: 'getProducts.json',
        cartProductURL: 'getBasketProducts.json',
        addToCartUrl: 'addToBasket.json',
        deleteCartUrl: 'deleteFromBasket.json',
        img: 'img/image-holder.jpg',
        searchLine: '',
        isVisibleCart: false,
        isEmptyCart: true,
    },
    methods: {
        getJson(url) {
            return fetch(url)
                    .then(response => response.json())
                    .catch(error => console.log(error))
        },
        filterGoods() {
            const regexp = new RegExp(this.searchLine, 'ig');
            let el = this.products.find(item => regexp.test(item.product_name));
            if (el) this.productsFilter = [el];
        },
        addtoCart(product) {
            this.getJson(this.API + this.addToCartUrl)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cartProducts.find((item) => {
                            return item.id_product === product.id_product
                        });
                        if (find) ++find.quantity;
                        else {
                            this.cartProducts.push({
                                id_product: product.id_product,
                                product_name: product.product_name,
                                price: product.price,
                                quantity: 1,
                            });
                        }
                    }
                });
        },
        delFromCart(cartProduct) {
            this.getJson(this.API + this.deleteCartUrl)
                .then(data => {
                    if (data.result === 1) {
                        let findIndex = null;
                        let find = this.cartProducts.find((item, index) => {
                            findIndex = index;
                            return cartProduct.id_product === item.id_product
                        });
                        if (find.quantity === 1) this.cartProducts.splice(findIndex, 1);
                        else --find.quantity;
                    }
                });
        },
    },
    mounted() {
        this.getJson(this.API + this.productsURL)
            .then(data => {
                this.products = [...data];
                this.productsFilter = [...data];
            });
        this.getJson(this.API + this.cartProductURL)
            .then(data => {
                this.cartProducts = [...data.contents];
            })
    },
});