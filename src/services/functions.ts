
export const compareValuesLeftToRight = (a: number, b: number) => {
    if (a < b) {
        return "Lower";
    }
    if (a > b) {
        return "Higher";
    }
    return "Right!";
};
export const compareTypes = (a: string, b: string) => {
    if (a === b) {
        return "Right!";
    }
    if (a !== b) {
        return "Wrong!";
    }
    return "Right!";
};
