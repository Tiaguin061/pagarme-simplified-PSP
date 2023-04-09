import { Either, left, right } from '@root/core/logic/Either';

export class CardNumber {
  private readonly card_number: number;

  private constructor(card_number: number) {
    this.card_number = card_number
  }

  get value() {
    return this.card_number;
  }

  static checkIfCardNumberIsNAN(card_number: number) {
    if(isNaN(card_number)) {
      return true;
    }

    return false;
  }

  static getTheFourLastCardNumber(card_number: number) {
    const result = String(card_number).slice(-4);

    return Number(result);
  } 

  static create(card_number: number): Either<Error, CardNumber> {
    if(this.checkIfCardNumberIsNAN(card_number)) {
      return left(Error('a'));
    }

    card_number = this.getTheFourLastCardNumber(card_number);

    return right(new CardNumber(card_number));
  }
}