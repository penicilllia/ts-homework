function swapKeysAndValues<T extends Record<string, S>, S extends number>(obj: T) {
    const result: Record<string, string> = {};

    Object.entries(obj).forEach(([key, value]) => {
        result[value] = key;
    });

    return result;
}

const obj1 = { A: 1, B: 2 };
const obj2 = { A: '1', B: '2' };
const obj3 = { 'A': '1', 'B': '2' };
const obj4 = { 'A': null, 'B': undefined };

console.log(swapKeysAndValues(obj1));
// console.log(swapKeysAndValues(obj2));
// console.log(swapKeysAndValues(obj3));
// console.log(swapKeysAndValues(obj4));
