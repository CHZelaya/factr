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




