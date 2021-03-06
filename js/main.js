const API = 'https://raw.githubusercontent.com/MisyurinDaniil/learnVueJSMarket/master/json/';

let vueApp = new Vue({
    el: '#app',
    data: {
        message: 'Vue.JS-Shop',
        searchLine: '',
    },
    methods: {
        getJson(url) {
            return fetch(url)
                    .then(response => response.json())
                    .catch(error => {
                        this.$refs.error_component.errorText = error + '!!!!';
                    });
                    // .catch(error => {
                    //     this.$root.$refs.products_list.errorText = error + '!!!!';
                    //     // this.errorText = error + '!!!!';
                    // });
        },
        filterGoods() {
            if (this.searchLine) {            
                const regexp = new RegExp(this.searchLine, 'ig');
                let el = this.$refs.products_list.products.find(item => regexp.test(item.product_name));
                if (el) this.$refs.products_list.productsFilter = [el];
            }
        },
    },
});