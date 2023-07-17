export const shuffleArray = (array) => { 
  console.log(array)
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  };
  return array;
};

export const duplicatedArray = (array) =>
  array.reduce((res, current) => res.concat([current, current]), []);

export const createFrontCards = (initialDiff, array) => {
  initialDiff = +initialDiff
  switch (initialDiff) {
    case 1:
      return array.slice(0, 3);
    case 2:
      return array.slice(0, 6); 
    case 3:
      return array.slice(0, 9); 
    default:
      console.log('000');
  }
};
