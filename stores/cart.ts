import { defineStore } from 'pinia';
import { Product } from './types';

const CART_STORAGE_KEY = 'cart';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as Product[],
  }),
  getters: {
    totalPrice(): number {
      return this.items.reduce((total, item) => total + item.price, 0);
    },
    itemCount(): number {
      return this.items.length;
    },
  },
  actions: {
    addToCart(item: Product): void {
      this.items.push(item);
      this.saveCartToLocalStorage();
    },
    removeFromCart(itemId: number): void {
      const index = this.items.findIndex((item) => item.id === itemId);
      if (index !== -1) {
        this.items.splice(index, 1);
        this.saveCartToLocalStorage();
      }
    },
    clearCart(): void {
      this.items = [];
      this.saveCartToLocalStorage();
    },
    saveCartToLocalStorage(): void {
      if (!process.client) return;
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items));
    },
    loadCartFromLocalStorage(): void {
      if (!process.client) return;
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        this.items = JSON.parse(storedCart);
      }
    },
  },
});
