class HashMap {
  constructor() {
    this.loadFactor = 0.8;
    this.capacity = 16;
    this.buckets = new Array(this.capacity).fill(null);
    this.size = 0;
  }

  // if (index < 0 || index >= buckets.length) {
  //     throw new Error("Trying to access index out of bounds");
  // }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    hashCode = hashCode % this.capacity;

    return hashCode;
  }

  set(key, value) {
    const hashCode = this.hash(key);
    let obj = { [key]: value };

    this.buckets[hashCode] = obj;
    this.size += 1;
  }

  get(key) {
    const hashCode = this.hash(key);
    let entry;

    try {
      entry = this.buckets[hashCode].value;
      return entry;
    } catch (TypeError) {
      return null;
    }
  }

  has(key) {
    const entry = this.get(key);

    if (entry) {
      return true;
    } else {
      return false;
    }
  }

  remove(key) {
    const hashCode = this.hash(key);
    let entry;

    try {
      this.buckets[hashCode].value = null;
      return true;
    } catch (TypeError) {
      return false;
    }
  }

  length() {
    let numberOfEntries = 0;

    this.buckets.forEach((element) => {
      if (element) {
        numberOfEntries += 1;
      }
    });

    return numberOfEntries;
  }

  clear() {
    this.buckets = new Array(this.capacity);
    this.size = 0;
  }

  keys() {
    this.buckets.forEach((bucket) => {
      console.log(bucket.key);
    });
  }
}

const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
// collision between next 2
test.set("grape", "purple");
test.set("hat", "black");
//
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("Rama", "test1");
test.set("Sita", "test2");
test.keys();
