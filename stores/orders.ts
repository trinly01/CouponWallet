import { defineStore } from 'pinia';
import { Order } from './types';

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: [] as Order[],
  }),
  actions: {
    async fetchOrders() {
      const storedOrders = localStorage.getItem('orders');
      if (storedOrders) {
        this.orders = JSON.parse(storedOrders);
      } else {
        this.orders = [];
      }
    },
    async addOrder(order: Order) {
      this.orders.push(order);
      setTimeout(() => this.updateStoredOrders(), 500)
      // await this.updateStoredOrders();
    },
    async updateStoredOrders() {
      await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for the next tick
      localStorage.setItem('orders', JSON.stringify(this.orders));
    },
  },
});
