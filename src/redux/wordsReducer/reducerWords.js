import { generate as id } from "shortid";
import { lfWords } from "../../localForage/localForage";
import { lookSmile, random, shuffle } from "./helps";
import { words } from "./wordList";

const wordState = {
  allWord: words,
  addWord: ["", ""],
  error: "",
  history: [],
  play: "",
  prevPlay: {},
};

const T = {
  LOOK_LF: "LOOK_LF",
  ADD: "ADD",
  DELETE: "DELETE",
  CHANGE_INPUT: "CHANGE_INPUT",
  CHANGE_WORD: "CHANGE_WORD",
  START: "START",
  NEXT: "NEXT",
  ADD_HISTORY: "ADD_HISTORY",
};

const reducerWords = (state = wordState, action) => {
  switch (action.type) {
    case T.CHANGE_WORD:
      const look_change_word = state.allWord.map((i, index, arr) => {
        if (i.id === action.id) {
          let isBool = state.allWord.find(
            (el) => el[action.str].toLowerCase() === action.value.toLowerCase()
          );
          let isBoolLang =
            action.str === "eng"
              ? action.value.replace(/^[A-Za-z ']+$/, "")
              : action.value.replace(/^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ ']+$/, "");

          !isBool &&
            !isBoolLang &&
            (i[action.str] =
              action.value[0].toUpperCase() +
              action.value.slice(1).toLowerCase());
        }
        return i;
      });

      return { ...state, allWord: look_change_word };
    case T.ADD:
      let isBool = false;
      state.addWord.filter((i, index) => {
        const item = i.toLowerCase();
        index
          ? state.allWord.filter(
              (elem) => elem.ua.toLowerCase() === item && (isBool = true)
            )
          : state.allWord.filter(
              (elem) => elem.eng.toLowerCase() === item && (isBool = true)
            );
      });
      if (isBool) {
        return { ...state, error: true };
      } else {
        state.allWord.push({
          eng: state.addWord[0].toLowerCase(),
          ua: state.addWord[1].toLowerCase(),
          id: id(),
        });
        return { ...state, addWord: ["", ""], error: false };
      }
    case T.DELETE:
      const arr3 = state.allWord.filter((i) => i.id !== action.id);
      return { ...state, allWord: arr3 };
    case T.CHANGE_INPUT:
      const arr = state.addWord.map((i, index) => {
        action.str === "en"
          ? index === 0 && (i = action.value)
          : index === 1 && (i = action.value);
        return i;
      });

      return { ...state, addWord: arr, error: false };

    case T.START:
      return {
        ...state,
        play: {
          question: action.question,
          options: action.options,
          answer: [],
          count: 0,
          lang: action.lang,
        },
      };
    case T.NEXT:
      let nextCount = state.play.count;
      if (nextCount > 10) return;

      return {
        ...state,
        play: {
          ...state.play,
          answer: [...state.play.answer, action.value],
          count: nextCount + 1,
        },
      };
    case T.ADD_HISTORY:
      const obj = {
        number: action.number,
        smile: action.smile,
        check: action.check,
      };
      state.history.unshift(obj);
      return { ...state, prevPlay: obj, play: "" };
    case T.LOOK_LF:
      action.setSpiner(false);
      if (!action.obj.addWord) return { ...state };
      return { ...action.obj };
    default:
      return state;
  }
};

export const R_F_add = () => ({ type: T.ADD });
export const R_F_change_input = (str, value) => ({
  str,
  value,
  type: T.CHANGE_INPUT,
});

export const R_F_next = (value) => ({ value, type: T.NEXT });

const R_F_add_history = (number, smile, check) => ({
  number,
  smile,
  check,
  type: T.ADD_HISTORY,
});
export const add_history = (play) => (dispatch) => {
  
  const number = play.question.filter(
    (i, index) => i.ua === play.answer[index]||i.eng === play.answer[index]
  ).length;
  const check = play.question.map((i, index) => {
    const newArray = [
      i[play.lang],
      i[play.lang === "eng" ? "ua" : "eng"],
      play.answer[index],
    ];
    return newArray;
  });
  const smile = lookSmile(number);

  dispatch(R_F_add_history(number, smile, check));
};

const start = (question, options, lang) => ({
  question,
  lang,
  options,
  type: T.START,
});

export const R_F_start = (arr, lang) => (dispatch) => {
  console.log(arr);
  const arrPlay = random(arr.length, 10);
  const question = arrPlay.map((i) => arr[i]);
  const options = arrPlay
    .map((i) => random(arr.length, 4, [i]))
    .map((i) => shuffle(i).map((ii) => arr[ii][lang === "ua" ? "eng" : "ua"]));
  dispatch(start(question, options, lang));
};

export const R_F_delete = (id) => ({ id, type: T.DELETE });
export const R_F_change_word = (str, value, id) => ({
  str,
  value,
  id,
  type: T.CHANGE_WORD,
});
const look_lf = (obj, setSpiner) => ({ obj, setSpiner, type: T.LOOK_LF });

export const R_F_look_lf = (setSpiner) => (dispatch) => {
  lfWords.getItem().then((i) => {
    i !== null
      ? dispatch(look_lf(i, setSpiner))
      : dispatch(look_lf({}, setSpiner));
  });
};
export default reducerWords;
