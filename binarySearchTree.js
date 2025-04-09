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

  insert(value, node = this.root) {
    let currNode = node;

    if (currNode == null) {
      currNode = new Node(value);
    } else if (value < currNode.value) {
      currNode.left = this.insert(value, currNode.left);
    } else if (value > currNode.value) {
      currNode.right = this.insert(value, currNode.right);
    }

    return currNode;
  }

  deleteItem(value, node = this.root) {
    let currNode = node;

    // leaf node, one child
    if (
      value == currNode.value &&
      currNode.left == null &&
      currNode.right == null
    ) {
      currNode = null;
    } else if (value == currNode.value && currNode.left == null) {
      currNode = currNode.right;
    } else if (value == currNode.value && currNode.right == null) {
      currNode = currNode.left;
    } else if (value == node.value) {
      let successorNode = this.#inorderSuccessor(node.right);
      currNode.value = successorNode.value;
      successorNode = successorNode.right;
      // currNode.right = this.deleteItem(currNode.value, currNode.right);
      // this.deleteItem(successorNode.value);
    } else if (value < node.value) {
      currNode = this.deleteItem(value, node.left);
    } else if (value > node.value) {
      currNode = this.deleteItem(value, node.right);
    }
    return currNode;
  }

  #inorderSuccessor(node) {
    let successorNode = node;

    while (successorNode.left) {
      successorNode = successorNode.left;
    }

    return successorNode;
  }

  depth(value) {
    let counter = 0;
    let currNode = this.root;

    while (currNode != null) {
      if (value == currNode.value) {
        return counter;
      } else if (value < currNode.value) {
        counter += 1;
        currNode = currNode.left;
      } else if (value > currNode.value) {
        counter += 1;
        currNode = currNode.right;
      } else {
        return null;
      }
    }
    // value not found
    return null;
  }

  inorder(node = this.root, nodeList = []) {
    if (node == null) return null;

    this.inorder(node.left, nodeList);
    node.value ? nodeList.push(node.value) : null;
    this.inorder(node.right, nodeList);
  }

  preorder(node = this.root, nodeList = []) {
    if (node == null) return null;

    node.value ? nodeList.push(node.value) : null;
    this.inorder(node.left, nodeList);
    this.inorder(node.right, nodeList);
  }

  postorder(node = this.root, nodeList = []) {
    if (node == null) return null;

    this.inorder(node.left, nodeList);
    this.inorder(node.right, nodeList);
    node.value ? nodeList.push(node.value) : null;
  }
}

// const testTree = new Tree([1, 4, 3, 2, 5, 7, 6]);
const testTree = new Tree([50, 30, 70]);
testTree.insert(20);
testTree.insert(40);
testTree.insert(60);
testTree.insert(80);
testTree.insert(32);
testTree.insert(65);
testTree.insert(75);
testTree.insert(85);
testTree.insert(34);
testTree.insert(36);
testTree.prettyPrint(testTree.root);
testTree.deleteItem(30);
testTree.prettyPrint(testTree.root);
