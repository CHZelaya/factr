import { toStoredAmount, toDisplayAmount } from "../money";


describe('toStoredAmount', () => {
    it('should normalize the display amount (for example: 45.00 -> 4500)', () => {
        expect(toStoredAmount(45.00)).toBe(4500);
    });
    it('should throw an error if the input is not a number', () => {
        expect(() => toStoredAmount("45.00" as any)).toThrow('Please enter a valid number for the amount');
    });
    it('should throw an error if the input is a negative number', () => {
        expect(() => toStoredAmount(-45.00)).toThrow('The amount cannot be a negative number');
    });

    it('should throw an error if the input is a NaN', () => {
        expect(() => toStoredAmount(NaN)).toThrow('Please enter a valid number for the amount');
    }); 
});

describe('toDisplayAmount', () => {
    it('should convert the stored amount in cents to a display amount in dollars (for example: 4500 -> 45.00)', () => {
        expect(toDisplayAmount(4500)).toBe(45.00);
    });
    it('should return a 0 if the input is 0', () => {
        expect(toDisplayAmount(0)).toBe(0);
    });
    it('should should return accurate odd cents (for example: 4501 -> 45.01)', () => {
        expect(toDisplayAmount(4501)).toBe(45.01);
    });
    it('should throw an error if the input is a NaN', () => {
        expect(() => toDisplayAmount(NaN)).toThrow('A critical error occured while fetching the amount. Please try again later.');
    });
});




