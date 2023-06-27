import { defineStore } from 'pinia';
import { Product } from './types';

export const useProductsStore = defineStore('products', {
  state: () => ({
    items: [] as Product[],
  }),
  actions: {
    async fetchProducts(): Promise<void> {
      const products = await $fetch('https://fakestoreapi.com/products');
      // const products = await response.json();
      //  console.log('products', products)
      this.items = products;
    },
  },
});
