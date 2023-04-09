import { describe, expect, it } from '@jest/globals';

import { CardNumber } from './card-number';

describe('CardNumber entity domain', () => {
  it('Should be able to create', () => {
    const cardNumberOrError = CardNumber.create(123456789);

    expect(cardNumberOrError.isRight()).toBeTruthy();
  });

  it('Should be able to return an error if it is NAN ', () => {
    const cardNumberOrError = CardNumber.create(Number('invalid card number'));

    expect(cardNumberOrError.isLeft()).toBeTruthy();
  });
})