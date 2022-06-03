Vue.component('products-list', {
    props: ['items', 'img'],
    template: `
                <div class="row products-list d-flex justify-content-between">                    
                    <product v-for="item in items" :key="item.id_product"
                        :item="item"
                        :img="img">
                    </product>
                </div>
    `,
});

Vue.component('product', {
    props: ['item', 'img'],
    template: `
                <div class="product-item col flex-grow-0 mt-3 mb-3">
                    <div class="product-item__block p-3">
                        <h3  class="product-item__title">{{ item.product_name }}</h3>
                        <img class="product-item__img img-fluid img-thumbnail" :src="img">
                        <p class="product-item__price">{{ item.price }} руб.</p>
                        <button @click="$parent.$emit('add-prod-event', item)" class="product-item__add-button btn btn-warning">Добавить</button>
                    </div>
                </div>  
    `,
});