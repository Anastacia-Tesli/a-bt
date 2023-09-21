const data = require('./data/data.json');

const task11Result = (animals) => {
  const result = {};
  let cats = 0;
  let dogs = 0;
  let age = 0;
  animals.forEach((animal) => {
    animal.type === 'cat' && cats++;
    animal.type === 'dog' && dogs++;
    age = age + animal.age;
  });
  result.dogs = dogs;
  result.cats = cats;
  result.average = Math.round(age / (cats + dogs));
  return result;
};

console.log(task11Result(data));

const task12Result = (animals) => {
  let result = 0;
  const newAnimals = animals.filter(
    (animal) => animal.type === 'dog' && animal.breed && animal.features.includes('black'),
  );
  result = newAnimals.length;
  return result;
};

console.log(task12Result(data));

const task13Result = (animals) => {
  const result = [];
  result.push(
    ...animals.filter(
      (animal) =>
        (animal.type === 'cat' && animal.features.includes('black')) ||
        (animal.type === 'dog' && animal.features.includes('white')),
    ),
  );
  return result;
};

console.log(task13Result(data));

const task14Result = (animals) => {
  const result = [];

  animals.sort((a, b) => {
    if (a.type === 'cat') {
      return b.age - a.age;
    }
    if (b.type === 'dog') {
      return a.age - b.age;
    }
  });
  result.push(...animals);
  return result;
};

console.log(task14Result(data));

const myPowFunc = (number, n) => {
  let result = number;
  for (let i = 1; i < n; i++) {
    result = result * number;
  }
  return result;
};

console.log(myPowFunc(3, 1));

const myFlatFunc = (inputArray) => {
  const result = inputArray;
  return result.reduce((acc, element) => {
    if (Array.isArray(element)) {
      return acc.concat(myFlatFunc(element));
    }
    return acc.concat(element);
  }, []);
};

console.log(myFlatFunc([1, 3, 5, [1, [4, 5], 'asdf', [76, [56, [66, 59]]]]]));
// result 1, 3, 5, 1, 4, 5, 'asdf', 76, 56, 66, 59
