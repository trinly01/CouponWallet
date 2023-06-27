<template>
  <div>
    <div class="fixed top-0 left-0 w-full bg-white shadow-md py-4 px-6">
      <div class="flex justify-between container mx-auto">
        <div class="flex items-center">
          <router-link to="/" class="text-2xl text-orange-600 font-bold">CouponWallet</router-link>
        </div>
        <div class="flex items-center">
          <router-link to="/checkout" class="flex items-center justify-center bg-orange-500 rounded-full text-white p-2">
            <font-awesome-icon :icon="['fas', 'cart-shopping']" class="h-6 w-6" />
            <span class="ml-2">{{ cartItemCount }}</span>
          </router-link>
          <router-link to="/orders" class="ml-4">My Orders</router-link>
        </div>
      </div>
    </div>
    <NuxtPage />
  </div>
</template>



<script setup>
import { useCartStore } from '~/stores/cart';
const cartStore = useCartStore();
const cartItemCount = computed(() => cartStore.itemCount);

</script>

<style>
body {
  margin-top: 64px; /* Adjust this value based on the height of the header */
}
</style>