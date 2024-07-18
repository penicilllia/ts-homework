declare function require(name: string): any;

const makeOrdinal = require('./makeOrdinal');
const isNumberFinite = require('./isFinite');
const isSafeNumber = require('./isSafeNumber');

enum BigNumbers {
    TEN = 10,
    ONE_HUNDRED = 100,
    ONE_THOUSAND = 1000,
    ONE_MILLION = 1000000,
    ONE_BILLION = 1000000000,           //         1.000.000.000 (9)
    ONE_TRILLION = 1000000000000,       //     1.000.000.000.000 (12)
    ONE_QUADRILLION = 1000000000000000, // 1.000.000.000.000.000 (15)
    MAX = 9007199254740991              // 9.007.199.254.740.992 (15)
}

const LESS_THAN_TWENTY = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
];

const TENTHS_LESS_THAN_HUNDRED = [
    'zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
];

/**
 * Converts an integer into words.
 * If number is decimal, the decimals will be removed.
 * @example toWords(12) => 'twelve'
 * @param {number|string} number
 * @param {boolean} [asOrdinal] - Deprecated, use toWordsOrdinal() instead!
 * @returns {string}
 */

export default function toWords(number: string, asOrdinal: boolean): number {
    const num: number = parseInt(number, 10);

    if (!isNumberFinite(num)) {
        throw new TypeError(
            'Not a finite number: ' + number + ' (' + typeof number + ')'
        );
    }
    if (!isSafeNumber(num)) {
        throw new RangeError(
            'Input is not a safe number, it’s either too large or too small.'
        );
    }
    let words = generateWords(num);
    return asOrdinal ? makeOrdinal(words) : words;
}

function generateWords(number: number, ...args: string[]) {
    let remainder: number = 0;
    let word: string = '';
    let words: string[] = args ? args : [];

    // We’re done
    if (number === 0) {
        return !words ? 'zero' : words.join(' ').replace(/,$/, '');
    }
    // First run
    if (!words) {
        words = [];
    }
    // If negative, prepend “minus”
    if (number < 0) {
        words.push('minus');
        number = Math.abs(number);
    }

    if (number < 20) {
        remainder = 0;
        word = LESS_THAN_TWENTY[number];

    } else if (number < BigNumbers.ONE_HUNDRED) {
        remainder = number % BigNumbers.TEN;
        word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / BigNumbers.TEN)];
        // In case of remainder, we need to handle it here to be able to add the “-”
        if (remainder) {
            word += '-' + LESS_THAN_TWENTY[remainder];
            remainder = 0;
        }

    } else if (number < BigNumbers.ONE_THOUSAND) {
        remainder = number % BigNumbers.ONE_HUNDRED;
        word = generateWords(Math.floor(number / BigNumbers.ONE_HUNDRED)) + ' hundred';

    } else if (number < BigNumbers.ONE_MILLION) {
        remainder = number % BigNumbers.ONE_THOUSAND;
        word = generateWords(Math.floor(number / BigNumbers.ONE_THOUSAND)) + ' thousand,';

    } else if (number < BigNumbers.ONE_BILLION) {
        remainder = number % BigNumbers.ONE_MILLION;
        word = generateWords(Math.floor(number / BigNumbers.ONE_MILLION)) + ' million,';

    } else if (number < BigNumbers.ONE_TRILLION) {
        remainder = number % BigNumbers.ONE_BILLION;
        word = generateWords(Math.floor(number / BigNumbers.ONE_BILLION)) + ' billion,';

    } else if (number < BigNumbers.ONE_QUADRILLION) {
        remainder = number % BigNumbers.ONE_TRILLION;
        word = generateWords(Math.floor(number / BigNumbers.ONE_TRILLION)) + ' trillion,';

    } else if (number <= BigNumbers.MAX) {
        remainder = number % BigNumbers.ONE_QUADRILLION;
        word = generateWords(Math.floor(number / BigNumbers.ONE_QUADRILLION)) +
        ' quadrillion,';
    }

    words.push(word);
    return generateWords(remainder, ...words);
}
