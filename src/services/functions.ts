
export const compreValuesLeftToRight = (a: number, b: number) => {
    if (a < b) {
        return "Lower";
    }
    if (a > b) {
        return "Higher";
    }
    return "Right!";
};
