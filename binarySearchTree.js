class Node {
  constructor(value = null, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    const sortedArray = [...new Set(array)].sort((a, b) => {
      return a - b;
    });
    this.root = this.buildTree(sortedArray);
  }

  buildTree(array) {
    if (array.length === 0) return null;

    const midPoint = Math.floor(array.length / 2);
    const leftHalf = array.slice(0, midPoint);
    const rightHalf = array.slice(midPoint + 1);

    const newNode = new Node(array[midPoint]);
    newNode.left = this.buildTree(leftHalf);
    newNode.right = this.buildTree(rightHalf);

    return newNode;
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  find(value) {
    let nodes = this.root;

    while (nodes.value != null) {
      if (value == nodes.value) {
        return nodes;
      } else if (value < nodes.value) {
        nodes = nodes.left;
      } else if (value > nodes.value) {
        nodes = nodes.right;
      } else {
        return null;
      }
    }
  }
}

const testTree = new Tree([1, 4, 3, 2, 5, 7, 6]);
testTree.prettyPrint(testTree.root);
testTree.find(2);
