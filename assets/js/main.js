
/* 
    Global Componet
*/

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true,
        }
    },
    template:
    `
    <div class="product">
        <div class="product-image">
            <img :src="img" :alt="title">
        </div>

        <div class="product-info">
            <h1 v-html="marca"></h1>
            <h2 v-html="title"></h2>
            
            <p v-show="onSale" class="onSale">On Sale!</p>

            <span class="price">{{price.toFixed(2) + ' €'}}</span>

            <p v-if="!soldOut">In Stock</p>
            <p v-else >Out of stock</p>

            <div class="details">
                <h4>Details</h4>
                <ul>
                    <li v-for="detail in details" >
                        {{detail}}
                    </li>
                </ul>
            </div>

            <div class="variants">
                <h4>Variants</h4>
                <div v-for="(variant, index) in variants" :key="variant.id" class="color-box" :style="{backgroundColor: variant.color}" @click="updateProduct(index)" >
                
                </div>
            </div>
            
            <button @click="addCart">
                Add Cart
            </button>

            <button @click="removeCart">
                Remove Cart
            </button>
            <p class="shipping">Shipping: {{shipping}} </p>

        </div>
    </div>
    `,
    data() {
        return {
            marca: 'Apple',
            product: 'Iphone',
            brand: '11 Pro Max',
            price: 999.00,
            //img: 'assets/img/iphone-w.jpg',
            selectedVariant: 0,
            onSale: true,
            //soldOut: true,
            details: ['Amoled', 'Retina', 'ICloud'],
            variants: [
                {
                    id: 001,
                    color: '#fff',
                    img: 'assets/img/iphone-w.jpg',
                    quantity: 0,
                    label: 'white'
                },
                {
                    id: 002,
                    color: '#000',
                    img: 'assets/img/iphone-b.jpg',
                    quantity: 10,
                    label: 'black'
                }
            ]
        }
    }, 
    computed: {
        title() {
            return this.product + ' ' + this.brand; 
        },
        img() {
            return this.variants[this.selectedVariant].img;
        },
        soldOut() {
            const qty = this.variants[this.selectedVariant].quantity;

            return qty > 0 ? false : true;
        },
        shipping() {
            return this.premium ? 'free' : '2.99 €'
        }
    },
    methods: {
        updateProduct(index) {
            this.selectedVariant = index;
        },
        addCart(){
            const id = this.variants[this.selectedVariant].id;

            this.$emit('add-to-cart', id);
        },
        removeCart(){
            const id = this.variants[this.selectedVariant].id;

            this.$emit('remove-from-cart', id);
        }
    }
});

/* Vue main instance */
const app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: [

        ]
    },
    methods: {
        addCart(id) {
            this.cart.push(id);
        },
        removeCart(id) {
            const pos = this.cart.findIndex(p => p  === id);
            if (pos !== -1) {
                this.cart.splice(pos, 1);
            }
        }
    }
});