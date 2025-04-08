import { Screening } from "../../screening";
import { DiscountCondition } from "../conditions/discount-conditions";

/**
 * 할인 정책
 *
 * 할인 정책은, 내부의 할인 조건을 만족해야 정책의 할인금액을 적용할 수 있기 때문에,
 * 할인 조건에 의존적이며 할인 정책에서 할인 금액을 담고 있기 때문에
 * 할인 정책에서 할인 금액을 계산할 수 있다고 판단했다.
 */
export abstract class DiscountPolicy {
  constructor(protected discountConditions: DiscountCondition[]) {}

  calculateDiscountAmount(screening: Screening): number {
    for (const condition of this.discountConditions) {
      if (condition.isSatisfiedBy(screening)) {
        return this.getDiscountAmount(screening); // 하나만 만족하면 바로 반환
      }
    }
    return 0;
  }

  protected abstract getDiscountAmount(screening: Screening): number;
}

/**
 * 금액 할인 정책
 */
export class AmountDiscountPolicy extends DiscountPolicy {
  constructor(discountConditions: DiscountCondition[], private amount: number) {
    super(discountConditions);
  }

  protected getDiscountAmount(_screening: Screening): number {
    return this.amount;
  }
}

/**
 * 비율 할인 정책
 */
export class PercentDiscountPolicy extends DiscountPolicy {
  constructor(
    discountConditions: DiscountCondition[],
    private percent: number
  ) {
    super(discountConditions);
  }

  protected getDiscountAmount(screening: Screening): number {
    return screening.getMovie().getPrice() * this.percent;
  }
}
