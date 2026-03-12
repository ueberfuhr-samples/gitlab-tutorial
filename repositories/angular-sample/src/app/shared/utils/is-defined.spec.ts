import {isDefined} from '@app/shared';
import {describe, expect, it} from "vitest";

describe('isDefined', () => {

  it('should return true', () => {
    const values = [1, 'string', {object: 'string'}, {}, []];
    values
      .forEach(value => expect(isDefined(value)).toBe(true));
  });

  it('should return false', () => {
    expect(isDefined(undefined))
      .toBe(false);
  });

  it('should return false', () => {
    expect(isDefined(null))
      .toBe(false);
  });

});
