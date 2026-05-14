
/**
 * Converts a display amount in dollars to a stored amount in cents.
 * @param amount - The dollar amount to convert (e.g. 45.00)
 * @returns The amount in cents as an integer (e.g. 4500)
 * @throws Will throw an error if the input is not a number, is a negative number, or is NaN.
 */
export function toStoredAmount(amount: number) {
    if (typeof amount !== 'number') {
        throw new Error('Please enter a valid number for the amount');
    } else if (amount < 0) {
        throw new Error('The amount cannot be a negative number');
    } else if (isNaN(amount)) {
        throw new Error('Please enter a valid number for the amount');
    }
    return Math.round(amount * 100);
}

/**
 * Converts a stored amount in cents to a display amount in dollars.
 * @param storedAmount - The amount in cents normalized to dollars
 * @returns The amount in dollars as a number
 * @throws Will throw an error if the input is NaN.
 */
export function toDisplayAmount(storedAmount: number) {
    if (isNaN(storedAmount)) {
        throw new Error('A critical error occured while fetching the amount. Please try again later.');
    }
    return storedAmount / 100;
}
    