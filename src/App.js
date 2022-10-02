import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Header from "./Component/Header";
import MainComponent from "./Component/MainComponent";
import { R_F_look_lf } from "./redux/wordsReducer/reducerWords";

const mapStateToProps = (state) => {
  return {
    allWord: state.words.allWord,
  };
};

function App(props) {
  const [spiner, setSpiner] = useState(true);
  useEffect(() => {
    props.R_F_look_lf(setSpiner);
  }, []);
  if (spiner)
    return (
      <div className="loading">
        <img
          src="https://static.wixstatic.com/media/fdb99c_e136c7e8af7f48a592b05aa0f1afe6ea~mv2.gif"
          alt="loading"
        />
      </div>
    );
  return (
    <div>
      <Header />
      <MainComponent />
    </div>
  );
}

export default connect(mapStateToProps, { R_F_look_lf })(App);
