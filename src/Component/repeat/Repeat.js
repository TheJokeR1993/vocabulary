const Repeat = ({ play, next, add_history }) => {
  let count = play.count;

  return (
    <div className="container play">
      {count < 10 ? (
        <div className="playQ">
          <h2>{play.question[count][play.lang]}</h2>
          <div className="playA">
            {play.options[count].map((i, index) => (
              <input
                key={index}
                onClick={(e) => next(e.target.value)}
                type="submit"
                value={i}
              />
            ))}
          </div>
        </div>
      ) : (
        add_history(play)
      )}
    </div>
  );
};

export default Repeat;
