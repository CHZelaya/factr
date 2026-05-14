
// Declaring initially with a return value of 1 while I write out the TDD tests. This will be updated to return the correct values as I implement the functions.

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

export function toDisplayAmount(storedAmount: number) {

    return storedAmount / 100;
}
    