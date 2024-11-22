import { convertPLNToUSD } from './../convertPLNToUSD';

describe('ConvertPLNtoUSD', () => {
  it('should return proper value when good input', () => {
    expect(convertPLNToUSD(1)).toBe('$0.29');
    expect(convertPLNToUSD(2)).toBe('$0.57');
    expect(convertPLNToUSD(20)).toBe('$5.71');
    expect(convertPLNToUSD(12)).toBe('$3.43');
  });

  it('should return NaN when input is text', () => {
    expect(convertPLNToUSD('2')).toBeNaN();
    expect(convertPLNToUSD('xyz')).toBeNaN();
    expect(convertPLNToUSD('-456')).toBeNaN();
  });

  it('should return NaN if there is no argument', () => {
    expect(convertPLNToUSD()).toBeNaN();
  });

  it('should return error when value is not a string or number', () => {
    expect(convertPLNToUSD({})).toBe('Error');
    expect(convertPLNToUSD([])).toBe('Error');
    expect(convertPLNToUSD(function() {})).toBe('Error');
    expect(convertPLNToUSD(null)).toBe('Error');
  });

  it('should return $0.00 when value is less then zero', () => {
    expect(convertPLNToUSD(-10)).toBe('$0.00');
    expect(convertPLNToUSD(-2)).toBe('$0.00');
    expect(convertPLNToUSD(-5)).toBe('$0.00');
    expect(convertPLNToUSD(-145)).toBe('$0.00');
  });
});