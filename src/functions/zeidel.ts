export const method_zeidel = (matrix: any, vector: any, eps: any) => {
  const res = [];
  const xVector = new Array(matrix.length).fill(0);
  const el: { [key: string]: any } = {};
  let con = false;
  let counter = 0;

  while (!con) {
    let xOld;
    if (counter == 0) {
      xOld = new Array(matrix.length).fill(0);
    } else {
      xOld = Object.assign([], xVector);
    }

    for (let i = 0; i < matrix.length; i++) {
      const xNew = Object.assign({}, xVector);
      xNew[i] = 1;
      el[`s${i}`] = matrix[i].map((element: number) => element * -1);
      el[`s${i}`][i] = vector[i];
      el[`s${i}`] = el[`s${i}`].map(
        (element: number) => element / matrix[i][i]
      );
      console.log(el);
      el[`s${i}_sum`] = sum_array(
        el[`s${i}`].map(
          (element: number, index: number) => element * xNew[index]
        )
      );
      el[`s${i}_sum`] = Math.abs(el[`s${i}_sum`]);
      console.log(el, xVector);
      xVector[i] = el[`s${i}_sum`].toFixed(4);
    }
    res.push(Object.assign([], xVector));
    con = Math.abs(sum_array(xVector) - sum_array(xOld)) <= eps;
    counter++;
  }
  const el1 = [`counter=${counter}`];
  res.push([el1]);
  return res;
};

export const sum_array = (arr: Array<number>) => {
  let summ = 0;
  for (let i = 0; i < arr.length; i++) {
    summ += Number(arr[i]);
  }
  return summ;
};
