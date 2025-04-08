import { DiscountPolicy } from "./discount/policy/discount-policy";

export class Movie {
  private title: string;
  private runningTime: number; // 상영시간 (ex: 120 -> 2시간)
  private price: number;
  private discountPolicy?: DiscountPolicy; // 할인 정책

  constructor(
    title: string,
    runningTime: number,
    price: number,
    discountPolicy?: DiscountPolicy
  ) {
    this.title = title;
    this.runningTime = runningTime;
    this.price = price;
    this.discountPolicy = discountPolicy;
  }

  getTitle() {
    return this.title;
  }

  getPrice() {
    return this.price;
  }

  getRunningTime() {
    return this.runningTime;
  }

  getDiscountPolicy() {
    return this.discountPolicy;
  }

  setDiscountPolicy(discountPolicy: DiscountPolicy) {
    this.discountPolicy = discountPolicy;
  }
}
