import { useState } from "react";
import { connect } from "react-redux";
import {
  R_F_change_input,
  R_F_add,
} from "../../redux/wordsReducer/reducerWords";

const mapStateToProps = (state) => {
  return {
    addWord: state.words.addWord,
    error: state.words.error,
  };
};
const Adding = (props) => {
  const [valueEN, setValueEN] = useState(false);
  const [valueUA, setValueUA] = useState(false);
  return (
    <div className="container adding ">
      <form onChange={(e) => e.preventDefault()}>
        <input
          type="text"
          value={props.addWord[0]}
          maxLength={40}
          className={!valueEN ? "norm" : "error"}
          onBlur={(e) => {
            setValueEN(e.target.value.replace(/^[A-Za-z ']+$/, ""));
          }}
          onChange={(e) => {
            props.R_F_change_input("en", e.target.value);
          }}
          placeholder="English word"
        />
        <input
          type="text"
          value={props.addWord[1]}
          maxLength={40}
          className={!valueUA ? "norm" : "error"}
          onBlur={(e) => {
            setValueUA(
              e.target.value.replace(/^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ ']+$/, "")
            );
          }}
          onChange={(e) => {
            props.R_F_change_input("ua", e.target.value);
          }}
          placeholder="Переклад"
        />
        <button
          disabled={
            props.addWord[1].length >= 2 &&
            props.addWord[0].length >= 2 &&
            !valueUA &&
            !valueEN
              ? false
              : true
          }
          onClick={(e) => {
            if (!valueUA && !valueEN) {
              props.R_F_add();
            }
          }}
        >
          Додати
        </button>
      </form>
      {props.error && "repeat"}
    </div>
  );
};

export default connect(mapStateToProps, {
  R_F_change_input,
  R_F_add,
})(Adding);
