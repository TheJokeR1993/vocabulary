import RezultItem from "../rezult/RezultItem";

const RezultPLay = ({ prevPlay, R_F_start, arrAllWords }) => {
  console.log(arrAllWords);
  return (
    <div className="container rezultPlay">
      {prevPlay.number !== undefined && (
        <RezultItem
          smile={prevPlay.smile}
          check={prevPlay.check}
          number={prevPlay.number}
        />
      )}
      {arrAllWords.length >= 10 ? (
        <div className="start_game">
          <button
            onClick={() => {
              R_F_start(arrAllWords, "eng");
            }}
          >
            English → Ukrainian
          </button>
          <button
            onClick={() => {
              R_F_start(arrAllWords, "ua");
            }}
          >
            Ukrainia → English
          </button>
        </div>
      ) : (
        <div>Потрібно мінімум 10 слів для старту гри</div>
      )}
    </div>
  );
};

export default RezultPLay;
