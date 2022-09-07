const addValuesOfObjects = (arr, name_object, num_to_multiply = '') =>
  arr.reduce(
    (acc, el) =>
      acc +
      el[name_object] * (num_to_multiply === '' ? 1 : el[num_to_multiply]),
    0
  );

const addAmountsForObjects = (object) =>
  Object.values(object).reduce((acc, el) => acc + Number(el), 0);

const calcFunctions = { addValuesOfObjects, addAmountsForObjects };

export default calcFunctions;
