export default class LinkedList {
  constructor() {
    this.head = null;
  }

  prepend(value) {
    if (this.head === null) {
      const newHead = new Node(value);
      this.head = newHead;
    } else {
      let currentHead = this.head;
      const newHead = new Node(value, currentHead);
      this.head = newHead;
    }
  }

  append(value) {
    if (this.head === null) {
      this.prepend(value);
    } else {
      let nodes = this.head;
      while (nodes.nextNode != null) nodes = nodes.nextNode;
      nodes.nextNode = new Node(value);
    }
  }

  head() {
    return this.head;
  }

  tail() {
    let nodes = this.head;
    while (nodes.nextNode != null) nodes = nodes.nextNode;
    return nodes.value;
  }

  size() {
    let counter = 1;
    let nodes = this.head;
    while (nodes.nextNode != null) {
      nodes = nodes.nextNode;
      counter += 1;
    }
    return counter;
  }

  at(index) {
    let counter = 0;
    let nodes = this.head;
    if (index == 0) return this.head;
    if (index > this.size()) return console.error();
    while (counter < index) {
      nodes = nodes.nextNode;
      counter += 1;
    }
    return nodes;
  }

  pop() {
    let current = this.head;
    let previous;
    if (this.size() == 0) return;
    else {
      while (current.nextNode !== null) {
        previous = current;
        current = current.nextNode;
      }
      previous.nextNode = null;
    }
  }

  contains(value) {
    let nodes = this.head;
    let numberOfNodes = this.size();
    while (numberOfNodes > 0) {
      if (nodes.value == value) {
        return true;
      } else {
        nodes = nodes.nextNode;
        numberOfNodes--;
      }
    }
    return false;
  }

  find(value) {
    let nodes = this.head;
    let numberOfNodes = this.size();
    for (let index = 0; index < numberOfNodes; index++) {
      if (nodes.value == value) {
        return index;
      } else {
        nodes = nodes.nextNode;
      }
    }
    return null;
  }

  toString() {
    let nodes = this.head;
    let outputString = "";
    while (nodes.nextNode != null) {
      outputString += `(${nodes.value}) -> `;
      nodes = nodes.nextNode;
    }
    outputString += `(${nodes.value}) -> null`;
    return outputString;
  }
}

class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}
