function heapify(arr, n, i) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < n && arr[left].debts > arr[largest].debts) {
    largest = left;
  }
  if (right < n && arr[right].debts > arr[largest].debts) {
    largest = right;
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]]; 

    heapify(arr, n, largest);
  }
}

export function heapSort(arr) {
  let n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]]; 
    heapify(arr, i, 0);
  }

  return arr;
}

export function processStudentData(studentDebts) {
  const facultyDebtCount = {};

  studentDebts.forEach((student) => {
    if (student.status === "борг") {
      if (!facultyDebtCount[student.faculty]) {
        facultyDebtCount[student.faculty] = { debts: 0, students: new Set() };
      }
      facultyDebtCount[student.faculty].debts += 1;
      facultyDebtCount[student.faculty].students.add(student.name);
    }
  });

  const facultyArray = Object.keys(facultyDebtCount).map((faculty) => ({
    faculty,
    debts: facultyDebtCount[faculty].debts,
    studentsCount: facultyDebtCount[faculty].students.size,
  }));

  return heapSort(facultyArray);
}
