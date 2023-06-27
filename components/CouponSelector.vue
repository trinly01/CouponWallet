<template>
  <div class="relative">
    <div class="relative">
      <div class="input-wrapper">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Coupon"
          class="input-field px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-400"
          @click="showCouponList = true"
        />
        <button v-if="searchQuery !== ''" class="clear-button" @click="clearSearch">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div
        v-if="showCouponList && (searchQuery !== '' || filteredCoupons.length > 0)"
        class="absolute left-0 right-0 bg-white border border-gray-300 mt-2 rounded-md overflow-y-auto max-h-48 z-10"
      >
        <ul class="py-2">
          <li
            v-for="coupon in filteredCoupons"
            :key="coupon.code"
            class="px-4 py-2 cursor-pointer hover:bg-gray-100"
            @click="selectCoupon(coupon)"
          >
            <div class="flex items-center justify-between">
              <div class="flex-grow">
                <p class="font-semibold">{{ coupon.code }}</p>
                <p class="text-sm text-gray-500">
                  Redeemed: {{ coupon.redeemed }} | Discount: {{ coupon.discount }}% | Min. Purchase: ${{ coupon.minimumPurchase }}
                </p>
              </div>
              <div v-if="selectedCoupon && selectedCoupon.code === coupon.code" class="text-green-500">
                <i class="fas fa-check"></i>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="selectedCoupon" class="mt-2">
      <p class="text-gray-500 text-sm">Selected Coupon:</p>
      <div class="bg-white px-4 py-2 border border-gray-300 rounded-md">
        <p class="font-semibold">{{ selectedCoupon.code }}</p>
        <p class="text-sm text-gray-500">
          Discount: {{ selectedCoupon.discount }}% | Min. Purchase: ${{ selectedCoupon.minimumPurchase }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits, onMounted } from 'vue';
import { useCouponsStore } from '~/stores/coupons';

const couponsStore = useCouponsStore();

const selectedCoupon = ref(null);
const searchQuery = ref('');
const showCouponList = ref(false);

const emit = defineEmits(['update:modelValue']);

const coupons = computed(() => couponsStore.coupons);

const filteredCoupons = computed(() => {
  if (searchQuery.value === '') {
    return coupons.value.filter(c => !c.redeemed);
  }
  const query = searchQuery.value.toLowerCase();
  return coupons.value.filter((coupon) => !coupon.redeemed && coupon.code.toLowerCase().includes(query));
});

const selectCoupon = (coupon) => {
  selectedCoupon.value = coupon;
  searchQuery.value = coupon.code;
  emit('update:modelValue', coupon);
};

const clearSearch = () => {
  emit('update:modelValue', null);
  searchQuery.value = '';
};

const handleClickOutside = (event) => {
  const target = event.target;
  const input = document.querySelector('.input-field');
  if (target !== input) {
    showCouponList.value = false;
  }
};



// Fetch coupons on component mount
onMounted(() => {
  couponsStore.fetchCoupons();
  document.addEventListener('click', handleClickOutside);
});

// Clean up the event listener when the component is unmounted
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.input-wrapper {
  display: inline-block;
  position: relative;
  max-width: fit-content;
}

.input-field {
  appearance: none;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  background-color: #fff;
  font-size: 1rem;
  line-height: 1.5;
  padding-right: 2.5rem;
  width: 100%;
}

.clear-button {
  position: absolute;
  top: 50%;
  right: 0.75rem;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
}

.clear-button i {
  color: #999;
}

.clear-button i:hover {
  color: #333;
}
</style>