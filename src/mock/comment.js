import {comments, emojis, names} from "../const";
import {getRandomArrayItem, getRandomDate} from "../utils";

const generateComment = () => {
  return {
    text: getRandomArrayItem(comments),
    emotion: getRandomArrayItem(emojis),
    author: getRandomArrayItem(names),
    date: getRandomDate(),
  };
};
export const generateComments = (count) =>{
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

