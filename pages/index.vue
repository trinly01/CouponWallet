<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-semibold text-orange-800 mb-4">Products</h2>
      <div>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search"
          class="px-4 py-2 border border-orange-200 rounded-md focus:outline-none focus:border-orange-400"
        />
      </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="product in filteredProducts" :key="'products' + product.id" class="bg-white rounded-lg shadow flex flex-col">
        <img :src="product.image" :alt="product.title" class="w-full h-40 object-cover rounded-t-lg">
        <div class="flex-grow p-4 flex flex-col justify-between">
          <div>
            <h2 class="text-lg font-semibold mb-2 truncate text-orange-800">{{ product.title }}</h2>
            <p class="text-gray-600 text-sm mb-4 line-clamp-3">{{ product.description }}</p>
          </div>
          <div class="flex justify-between items-center mt-4">
            <p class="text-gray-700 font-bold text-xl">{{ product.price }}$</p>
            <button @click="addToCart(product)" class="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductsStore } from '~/stores/products';
import { useCartStore } from '~/stores/cart';

const productsStore = useProductsStore();
const cartStore = useCartStore();

const products = productsStore.items;
const searchQuery = ref('');

const addToCart = (product) => {
  cartStore.addToCart(product);
};

const filteredProducts = computed(() => {
  if (searchQuery.value === '') {
    return products;
  }
  const query = searchQuery.value.toLowerCase();
  return products.filter(
    (product) =>
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
  );
});
await useAsyncData(async () => productsStore.fetchProducts())
await cartStore.loadCartFromLocalStorage();
</script>

<style scoped>
.container {
  background-color: #fef7ed;
}
</style>
