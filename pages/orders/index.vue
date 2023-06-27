<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-4">Orders {{ orders.length }}</h1>
    <div v-if="orders.length === 0" class="text-center">
      <p>No orders available.</p>
    </div>
    <div v-else>
      <div v-for="(order, i) in orders" :key="'order'+ i" class="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 class="text-lg font-semibold mb-2">Order ID: {{ order.id }}</h2>
        <div v-for="item in order.items" :key="'orrders'+ i + '-' + item.id" class="flex justify-between items-center mb-2">
          <div class="flex items-center">
            <img :src="item.image" :alt="item.title" class="w-10 h-10 object-cover rounded-lg mr-4">
            <div>
              <p class="text-gray-700 font-semibold">{{ item.title }}</p>
              <p class="text-gray-500 text-sm">Price: {{ formatPrice(item.price) }}</p>
            </div>
          </div>
          <p class="text-gray-700 text-right">{{ formatPrice(item.price) }}</p>
        </div>
        <div v-if="order.coupon" class="flex justify-between items-center mt-4">
          <h3 class="text-lg font-semibold">Coupon:</h3>
          <p class="text-gray-700 font-bold">{{ order.coupon.code }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useOrdersStore } from '~/stores/orders';
import { computed } from 'vue';

const ordersStore = useOrdersStore();
const orders = computed(() => ordersStore.orders);

const formatPrice = (price) => {
  return `$${price.toFixed(2)}`;
};

onMounted(async () => await ordersStore.fetchOrders())


</script>

<style scoped>
/* Add any desired styling for the order cards here */
</style>
