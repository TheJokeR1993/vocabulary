import { useMemo } from "react";
import { connect } from "react-redux";
import { lookSmile } from "../../redux/wordsReducer/helps";
import RezultItem from "./RezultItem";
const mapStateToProps = (state) => {
  return {
    history: state.words.history,
  };
};

const Rezult = ({ history }) => {
  
  const allGame = useMemo(() => {
    return history.map((i, index) => (
      <RezultItem
        smile={i.smile}
        check={i.check}
        number={i.number}
        key={index}
      />
    ));
  }, history);
  if (!history.length) return <div>no play</div>;
  let allRezult =
    history.length >= 2
      ? history
          .map((i) => i.number)
          .reduce((first, second) => first + second, 0) / history.length
      : history[0].number;

  return (
    <div className="container history">
      <div className="all_rezult_history">
        <img alt="" src={lookSmile(allRezult)} />
        <h2>{Math.round(allRezult * 10)}%</h2>
        <h2>Play : {history.length}</h2>
      </div>

      {allGame}
    </div>
  );
};

export default connect(mapStateToProps)(Rezult);
