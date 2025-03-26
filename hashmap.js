class HashMap {
  constructor() {
    this.loadFactor = 0.8;
    this.capacity = 16;
    this.buckets = [];
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

    this.buckets[hashCode] = { value };
    console.log(this.buckets);
  }

  get(key) {
    const hashCode = this.hash(key);
    const entry = this.buckets[hashCode].value;

    if (entry) {
      return entry;
    } else {
      return null;
    }
  }
}

const test = new HashMap();
test.set("apple", "red");
test.get("apple");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("Rama", "test1");
test.set("Sita", "test2");
