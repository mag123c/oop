import { Screening } from "../../screening";

/**
 * 할인 조건
 *
 * 조건 객체 자체가 할인 조건을 만족하는지 평가할 수 있어야 한다고 생각했다.
 */
export interface DiscountCondition {
  isSatisfiedBy(screening: Screening): boolean;
}

/**
 * 순서 조건
 */
export class SequenceCondition implements DiscountCondition {
  constructor(private readonly sequence: number) {}

  isSatisfiedBy(screening: Screening): boolean {
    return screening.getSequence() === this.sequence;
  }
}

/**
 * 기간 조건
 */
export class PeriodCondition implements DiscountCondition {
  constructor(
    private readonly day: number,
    private readonly startTime: Date,
    private readonly endTime: Date
  ) {}

  isSatisfiedBy(screening: Screening): boolean {
    const screeningTime = screening.getWhen();
    return (
      screeningTime.getDay() === this.day &&
      screeningTime >= this.startTime &&
      screeningTime <= this.endTime
    );
  }
}
