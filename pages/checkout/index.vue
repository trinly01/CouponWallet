<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-4">Checkout</h1>
    <div v-if="cartItems.length === 0" class="text-center">
      <p>Your cart is empty.</p>
    </div>
    <div v-else class="flex flex-col">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">Items in Cart</h2>
        <p class="text-gray-700 font-bold">{{ uniqueCartItems.length }}</p>
      </div>
      <div v-for="item in uniqueCartItems" :key="'cart' + item.id" class="flex justify-between items-center mb-2">
        <div class="flex items-center">
          <img :src="item.image" :alt="item.title" class="w-10 h-10 object-cover rounded-lg mr-4">
          <div>
            <p class="text-gray-700 font-semibold">{{ item.title }}</p>
            <p class="text-gray-500 text-sm">Quantity: {{ item.quantity }}</p>
          </div>
        </div>
        <div class="flex items-center">
          <p class="text-gray-700 text-right mr-4">{{ formatPrice(item.price) }}</p>
          <button
            @click="removeFromCart(item.id)"
            class="text-gray-500 hover:text-red-500 transition-colors duration-300 delete"
          >
            <font-awesome-icon :icon="['fas', 'trash-alt']" class="h-4 w-4" />
          </button>
        </div>
      </div>
      <div class="flex justify-between items-center mt-4">
        <coupon-selector v-model="selectedCoupon" class="ml-auto" />
      </div>
      <div class="flex justify-between items-center mt-4">
        <h3 class="text-lg font-semibold">Total:</h3>
        <p class="text-gray-700 font-bold text-right">{{ formatPrice(totalPriceAfterDiscount) }}</p>
      </div>
      <button @click="placeOrder" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md mt-4 ml-auto">
        Place Order
      </button>
    </div>
  </div>
</template>

<script setup>
import { useOrdersStore } from '~/stores/orders';
import { useCartStore } from '~/stores/cart';
import { useCouponsStore } from '~/stores/coupons';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()

const selectedCoupon = ref(null);

const cartStore = useCartStore();
const couponsStore = useCouponsStore();
const ordersStore = useOrdersStore();
const cartItems = computed(() => cartStore.items);

const placeOrder = async () => {
  // Create the order object with the items and selected coupon
  const order = {
    items: cartItems.value,
    coupon: selectedCoupon.value,
  };

  // Add the order to the orders store
  await ordersStore.addOrder(order);

  // Redeem the selected coupon
  if (selectedCoupon.value) {
    await couponsStore.redeemCoupon(selectedCoupon.value.code);
  }

  // Clear the cart and navigate to the confirmation page
  await cartStore.clearCart();
  
  router.push('/orders');
};

const totalPrice = computed(() => {
  let total = 0;
  uniqueCartItems.value.forEach((item) => {
    total += item.price * item.quantity;
  });
  return total;
});

const totalPriceAfterDiscount = computed(() => {
  if (selectedCoupon.value && selectedCoupon.value.discount > 0) {
    const minimumPurchase = selectedCoupon.value.minimumPurchase;
    const maxPrice = selectedCoupon.value.maxPrice;

    if ((minimumPurchase === 0 || totalPrice.value >= minimumPurchase) && (maxPrice === 0 || totalPrice.value <= maxPrice)) {
      const discountAmount = (totalPrice.value * selectedCoupon.value.discount) / 100;
      return totalPrice.value - discountAmount;
    }
  }

  return totalPrice.value;
});

const uniqueCartItems = computed(() => {
  const uniqueItems = [];
  cartItems.value.forEach((item) => {
    const existingItem = uniqueItems.find((uniqueItem) => uniqueItem.id === item.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      uniqueItems.push({
        ...item,
        quantity: 1
      });
    }
  });
  return uniqueItems;
});

const formatPrice = (price) => {
  return `$${price.toFixed(2)}`;
};

const removeFromCart = (itemId) => {
  cartStore.removeFromCart(itemId);
};

await cartStore.loadCartFromLocalStorage();
</script>

<style scoped>
.delete {
  color: #e53e3e; /* Red color */
}

.delete:hover {
  color: red; /* Red color */
}
</style>
