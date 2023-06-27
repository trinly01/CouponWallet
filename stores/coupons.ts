import { defineStore } from 'pinia';
import { Coupon } from './types';

export const useCouponsStore = defineStore('coupons', {
  state: () => ({
    coupons: [] as Coupon[],
  }),
  actions: {
    fetchCoupons(): void {
      // Assuming you have stored coupons in local storage
      const storedCoupons = localStorage.getItem('coupons');
      if (storedCoupons) {
        this.coupons = JSON.parse(storedCoupons);
      } else {
        // If no stored coupons, initialize with some sample coupons
        this.coupons = [
          {
            code: 'SUMMER10',
            discount: 10,
            minimumPurchase: 50,
            maxPrice: 0,
            redeemed: false,
          },
          {
            code: 'SALE20',
            discount: 20,
            minimumPurchase: 100,
            maxPrice: 0,
            redeemed: false,
          },
          {
            code: 'FREESHIP',
            discount: 0,
            minimumPurchase: 0,
            maxPrice: 0,
            redeemed: false,
          },
        ];

        // Store the initial coupons in local storage
        localStorage.setItem('coupons', JSON.stringify(this.coupons));
      }
    },
    async redeemCoupon(code: string) {
      const index = this.coupons.findIndex((coupon) => coupon.code === code);
      if (index !== -1) {
        this.coupons[index].redeemed = true;
        // Update the stored coupons in local storage
        await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for the next tick
        localStorage.setItem('coupons', JSON.stringify(this.coupons));
      }
    },
  },
});
