 class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

export class Task1 {
  constructor() {
    this.head = null;
    this.tail = null;
  }
 
  addToStart(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    console.log(`Added ${value} to start`);
  }

  addAfter(nodeValue, value) {
    let current = this.head;
 
    while (current && current.value !== nodeValue) {
      current = current.next;
    }
 
    if (current) {
      const newNode = new Node(value);
 
      newNode.next = current.next;  
      newNode.prev = current;  
 
      if (current.next) {
        current.next.prev = newNode;
      } else { 
        this.tail = newNode;
      }
 
      current.next = newNode;

      console.log(`Added ${value} after ${nodeValue}`);
      this.displayFromStart();
    } else {
      console.log(`Node with value ${nodeValue} not found`);
    }
  }
 
  search(value) {
    let current = this.head;
    while (current) {
      if (current.value === value) {
        console.log(`Node with value ${value} found`);
        return current;
      }
      current = current.next;
    }
    console.log(`Node with value ${value} not found`);
    return null;
  }
 
  delete(value) {
    let current = this.head;
    while (current && current.value !== value) {
      current = current.next;
    }
    if (!current) {
      console.log(`Node with value ${value} not found`);
      return;
    }
    if (current.prev) {
      current.prev.next = current.next;
    } else {
      this.head = current.next;
    }
    if (current.next) {
      current.next.prev = current.prev;
    } else {
      this.tail = current.prev;
    }
    console.log(`Deleted node with value ${value}`);
  }
 
  displayFromStart() {
    let current = this.head;
    const nodes = [];
    while (current) {
      nodes.push(current.value);
      current = current.next;
    }
    console.log("List from start:", nodes);
  }
 
  displayFromEnd() {
    let current = this.tail;
    const nodes = [];
    while (current) {
      nodes.push(current.value);
      current = current.prev;
    }
    console.log("List from end:", nodes);
  }
}
