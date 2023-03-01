const DESCRIPTIONS = [
  'good picture',
  'nice view',
  'look amazing',
  'holywood smile',
  'nice chuse',
  'beautiful',
  'great'
];

const MESSAGES_FOR_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.' ,
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.' ,
  'Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
  'Артём',
  'Вася',
  'Паша',
  'Петя',
  'Вика',
  'Настя',
  'Юля'
];


const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createRandomNumberFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const createRandomId = createRandomNumberFromRangeGenerator(1,25);
const createRandomUrlNumber = createRandomNumberFromRangeGenerator(1,25);
const createRandomIdForComment = createRandomNumberFromRangeGenerator(1,10000);
const createRandomAvatarNumber = createRandomNumberFromRangeGenerator(1,6);
const arrPicturesDescriptions = [];

const createPictureDescription = () => ({
  id: createRandomId(),
  url: `photos/${createRandomUrlNumber()}.jpg`,
  description: DESCRIPTIONS[getRandomInteger(0,DESCRIPTIONS.length - 1)],
  likes: getRandomInteger(15,200),
  comments: [
    {
      id: createRandomIdForComment(),
      avatar: `img/avatar-${createRandomAvatarNumber()}.svg`,
      message: MESSAGES_FOR_COMMENTS[getRandomInteger(0,MESSAGES_FOR_COMMENTS.length - 1)],
      name: NAMES[getRandomInteger(0,NAMES.length - 1)],
    },
    {
      id: createRandomIdForComment(),
      avatar: `img/avatar-${createRandomAvatarNumber()}.svg`,
      message: MESSAGES_FOR_COMMENTS[getRandomInteger(0,MESSAGES_FOR_COMMENTS.length - 1)],
      name: NAMES[getRandomInteger(0,NAMES.length - 1)],
    }
  ]
});

for(let i = 0; i < 25; i ++){
  arrPicturesDescriptions.push(createPictureDescription());
}
