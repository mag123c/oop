import { Screening } from "./screening";

/**
 * Reservation은 예매 행위를 담당한다.
 *
 * 1. 상영(Screening)과 관객 수만 받아 실제 결제 금액을 계산하며,
 *    예매에 필요한 모든 정보를 Screening으로부터 얻는다.
 *
 * 2. 할인 정책이나 할인 조건 등은 Screening → Movie → Policy 내부에 은닉되어 있으며,
 *    Reservation은 이들에 직접 의존하지 않는다.
 *    즉, 할인 여부나 정책의 종류를 알 필요 없이, 결과만 받아 계산에 반영한다.
 *
 * 3. 추후 Customer 도메인을 추가한다면, 생성자에 Customer를 포함하여
 *    예매 정보의 주체를 명확히 할 수 있다.
 */

export class Reservation {
  constructor(
    private readonly screening: Screening,
    private readonly audienceCount: number
  ) {}

  reserve() {
    const movie = this.screening.getMovie();
    const totalPrice = movie.getPrice() * this.audienceCount;
    const discountAmount =
      movie.getDiscountPolicy()?.calculateDiscountAmount(this.screening) || 0;

    const paidPrice = totalPrice - discountAmount * this.audienceCount;

    return {
      movieTitle: movie.getTitle(),
      audienceCount: this.audienceCount,
      originalPrice: totalPrice,
      discountAmount: discountAmount * this.audienceCount,
      totalPrice: paidPrice,
    };
  }
}
