
import { connect } from "react-redux";
import {
  R_F_start,
  R_F_next,
  add_history
} from "../../redux/wordsReducer/reducerWords";
import Repeat from "./Repeat";
import RezultPlay from "./RezultPlay";

const mapStateToProps = (state) => {
  return {
    play: state.words.play,
    prevPlay: state.words.prevPlay,
    allWords: state.words.allWord,
  };
};

const RepeatContainer = (props) => {
    console.log(props.allWords);
  return !props.play ? (
    <RezultPlay arrAllWords={props.allWords}  R_F_start={props.R_F_start}  prevPlay={props.prevPlay} />
  ) : (
    <Repeat
    
      play={props.play}
      next={props.R_F_next}
      add_history={props.add_history}
    />
  );
};

export default connect(mapStateToProps, { R_F_start, R_F_next, add_history })(
  RepeatContainer
);
