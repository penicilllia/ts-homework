"use strict";
class Entry {
    constructor(key, value, next) {
        this.key = key;
        this.value = value;
        this.next = next;
    }
}
class Bucket {
    constructor(rootEntry) {
        this.rootEntry = rootEntry;
    }
    setEntry(entry) {
        let currentEntry = this.rootEntry;
        let exsistedEntry = this.findEntry(entry.key);
        if (exsistedEntry) {
            exsistedEntry.value = entry.value;
            return;
        }
        while (currentEntry.next) {
            currentEntry = currentEntry.next;
        }
        currentEntry.next = entry;
    }
    findEntry(key) {
        let currentEntry = this.rootEntry;
        while (currentEntry) {
            if (currentEntry.key === key) {
                return currentEntry;
            }
            currentEntry = currentEntry.next;
        }
    }
    removeEntry(key) {
        if (key === this.rootEntry.key && this.rootEntry.next) {
            this.rootEntry = this.rootEntry.next;
            return;
        }
        let prevEntry = this.rootEntry;
        let currentEntry = this.rootEntry.next;
        while (currentEntry) {
            if (currentEntry.key === key) {
                prevEntry.next = currentEntry.next;
            }
            prevEntry = currentEntry;
            currentEntry = currentEntry.next;
        }
    }
}
class MyMap {
    constructor() {
        this.buckets = [];
        this.capacity = 10;
    }
    getHashCode(str) {
        let h = 0;
        for (let i = 0; i < str.length; i++) {
            h = 31 * h + str.charCodeAt(i);
        }
        return h;
    }
    set(key, value) {
        const bucketIndex = this.getHashCode(key) % this.capacity;
        const entry = new Entry(key, value);
        if (this.buckets[bucketIndex]) {
            this.buckets[bucketIndex].setEntry(entry);
        }
        else {
            this.buckets[bucketIndex] = new Bucket(entry);
        }
    }
    get(key) {
        var _a;
        const bucketIndex = this.getHashCode(key) % this.capacity;
        const bucket = this.buckets[bucketIndex];
        if (!bucket) {
            return;
        }
        return (_a = bucket.findEntry(key)) === null || _a === void 0 ? void 0 : _a.value;
    }
    clear() {
        this.buckets = [];
    }
    delete(key) {
        const bucketIndex = this.getHashCode(key) % this.capacity;
        const bucket = this.buckets[bucketIndex];
        if (!bucket) {
            return;
        }
        if (!bucket.rootEntry.next && bucket.rootEntry.key === key) {
            this.buckets[bucketIndex] = undefined;
            return;
        }
        bucket.removeEntry(key);
    }
}
const weatherMap = new MyMap();
weatherMap.set('London', 20);
weatherMap.set('Berlin', 25);
weatherMap.set('Berlin', 15);
weatherMap.set('Moscow', 8);
console.log(weatherMap.get('London'));
weatherMap.delete('London');
console.log(weatherMap);
weatherMap.clear();
console.log(weatherMap);
