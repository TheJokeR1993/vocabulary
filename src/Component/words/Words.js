import { useMemo } from "react";
import { connect } from "react-redux";
import {
  R_F_delete,
  R_F_change_word,
} from "../../redux/wordsReducer/reducerWords";
import WordsItem from "./WordsItem";

const mapStateToProps = (state) => {
  return {
    allWord: state.words.allWord,
  };
};

const Words = (props) => {
  const show = useMemo(() => {
    return props.allWord.map((i) => (
      <WordsItem
        item={i}
        R_F_delete={props.R_F_delete}
        R_F_change_word={props.R_F_change_word}
        key={i.id}
      />
    ));
  }, [props.allWord]);

  return <div className="words_div">{show}</div>;
};

export default connect(mapStateToProps, { R_F_delete, R_F_change_word })(Words);
