Vue.component('cart', {
    props: ['is_visible', 'cart_products', 'img'],
    template: `
        <div v-show="is_visible" class="product-cart flex-column border position-absolute px-2 pb-2">
            <p v-if="!cart_products.length">Ваша корзина пустая.</p>
            <cart-item v-for="product in cart_products" :key="product.id_product" :product="product" :img="img"></cart-item>
        </div>
    `,
});
Vue.component('cart-item', {
    props: ['product', 'img'],
    template: `
        <div class="cart-item d-flex justify-content-between mt-2 border p-2">
            <img class="cart-item__img d-block img-thumbnail" :src="img">
            <div class="ms-2">
                <h3 class="cart-item__title">{{product.product_name}}</h3>
                <span class="cart-item__quantity d-block">Количество: {{product.quantity}}</span>
                <br>
                <span class="cart-item__price d-block">{{product.price}} руб. за штуку</span>
            </div>
            <div class="d-flex flex-column justify-content-center ms-2">
                <p class="cart-item__total-amount">{{product.price * product.quantity}} руб.</p>
                <button @click="$parent.$emit('del-prod-from-cart', product)" class="cart-item__del-button btn btn-secondary">X</button>
            </div>
        </div>
    `,
});