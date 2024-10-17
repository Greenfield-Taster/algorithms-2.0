export class Task2 {
  constructor() {
    this.heap = [];
  }

  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }
  getLeftChildIndex(i) {
    return 2 * i + 1;
  }
  getRightChildIndex(i) {
    return 2 * i + 2;
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
    console.log(`Inserted ${value}`);
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (
      index > 0 &&
      this.heap[index] > this.heap[this.getParentIndex(index)]
    ) {
      this.swap(index, this.getParentIndex(index));
      index = this.getParentIndex(index);
    }
  }

  remove() {
    if (this.heap.length === 0) {
      console.log("Heap is empty");
      return null;
    }

    const root = this.heap[0];
    const last = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.heapifyDown();
    }

    console.log(`Removed ${root}`);
    return root;
  }

  heapifyDown() {
    let index = 0;
    const length = this.heap.length;

    while (this.getLeftChildIndex(index) < length) {
      let largerChildIndex = this.getLeftChildIndex(index);

      if (
        this.getRightChildIndex(index) < length &&
        this.heap[this.getRightChildIndex(index)] > this.heap[largerChildIndex]
      ) {
        largerChildIndex = this.getRightChildIndex(index);
      }

      if (this.heap[index] >= this.heap[largerChildIndex]) {
        break;
      }

      this.swap(index, largerChildIndex);
      index = largerChildIndex;
    }
  }

  buildHeap(array) {
    this.heap = array;
    // Применяем heapifyDown начиная с родителя последнего элемента
    for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
      this.heapifyDownAt(i);
    }
    console.log("Heap built from array:", this.heap);
  }

  heapifyDownAt(index) {
    const length = this.heap.length;

    while (this.getLeftChildIndex(index) < length) {
      let largerChildIndex = this.getLeftChildIndex(index);

      if (
        this.getRightChildIndex(index) < length &&
        this.heap[this.getRightChildIndex(index)] > this.heap[largerChildIndex]
      ) {
        largerChildIndex = this.getRightChildIndex(index);
      }

      if (this.heap[index] >= this.heap[largerChildIndex]) {
        break;
      }

      this.swap(index, largerChildIndex);
      index = largerChildIndex;
    }
  }

  heapSort() {
    const sortedArray = [];
    const originalHeap = [...this.heap];

    while (this.heap.length > 0) {
      sortedArray.push(this.remove());
    }

    this.heap = originalHeap;  
    console.log("Sorted array:", sortedArray);
    return sortedArray;
  }

  display() {
    console.log("Heap elements:", this.heap);
  }
}