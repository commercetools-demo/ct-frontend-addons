declare class StringHelpers {
    /**
     * isNumeric tests a string and returns true when it's a decimal value
     */
    static isNumeric: (val: string) => boolean;
    /**
     * capitaliseFirstLetter capitalises only the very first character of a string, leaving the
     * rest unedited
     */
    static capitaliseFirstLetter: (val: string) => string;
}

export { StringHelpers };
