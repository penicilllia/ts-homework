class Entry {
    constructor(
        public key: string,
        public value: number,
        public next?: Entry) { }
}

class Bucket {
    constructor (public rootEntry: Entry) { }
    
    public setEntry(entry: Entry): void {
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

    public findEntry(key: string): Entry | undefined {
        let currentEntry: Entry | undefined = this.rootEntry;

        while (currentEntry) {
            if (currentEntry.key === key) {
                return currentEntry;
            }
            currentEntry = currentEntry.next;
        }
    }

    public removeEntry(key: string): void {
        if (key === this.rootEntry.key && this.rootEntry.next) {
            this.rootEntry = this.rootEntry.next;
            return;
        }

        let prevEntry: Entry = this.rootEntry;
        let currentEntry: Entry | undefined = this.rootEntry.next;

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
    private buckets: (Bucket | undefined)[] = [];
    private capacity: number = 10;

    private getHashCode(str: string): number {
        let h: number = 0;
        for (let i = 0; i < str.length; i++) {
            h = 31 * h + str.charCodeAt(i);
        }
        return h;
    }

    public set(key: string, value: number): void {
        const bucketIndex = this.getHashCode(key) % this.capacity;
        const entry = new Entry(key, value);
        if (this.buckets[bucketIndex]) {
            this.buckets[bucketIndex]!.setEntry(entry);
        } else {
            this.buckets[bucketIndex] = new Bucket(entry);
        }
    }

    public get(key: string): number | undefined {
        const bucketIndex = this.getHashCode(key) % this.capacity;
        const bucket = this.buckets[bucketIndex];

        if (!bucket) {
            return;
        }

        return bucket.findEntry(key)?.value;
    }

    public clear(): void {
        this.buckets = [];
    }

    public delete(key: string): void {
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
