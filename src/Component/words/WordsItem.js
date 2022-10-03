import {  useEffect, useRef, useState } from "react";

const WordsItem = ({ item, R_F_delete, R_F_change_word }) => {
  const [inputEnd, setInputEng] = useState(false);
  const [inputUa, setInputUa] = useState(false);
  const [changeEng, setChangeEng] = useState(item.eng);
  const [changeUa, setChangeUa] = useState(item.ua);
  const refContainerUA = useRef(null);
  const refContainerENG = useRef(null);

  useEffect(() => {
    function debounce(fn, ms) {
      let timer;
      return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          timer = null;
          fn.apply(this, arguments);
        }, ms);
      };
    }
    const debouncedHandleResize = debounce(() => {
      refContainerUA.current.scrollWidth > refContainerUA.current.offsetWidth
        ? (refContainerUA.current.title = changeUa)
        : (refContainerUA.current.title = "");
      refContainerENG.current.scrollWidth > refContainerUA.current.offsetWidth
        ? (refContainerENG.current.title = changeEng)
        : (refContainerENG.current.title = "");
    }, 500);
    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });
  return (
    <div className="word" key={item.id}>
      <div>
        {inputEnd ? (
          <input
            type="text"
            value={
              changeEng[0].toUpperCase() + changeEng.slice(1).toLowerCase()
            }
            maxLength={40}
            autoFocus
            onFocus={() =>
              changeEng === item.eng ? item.eng : setChangeEng(item.eng)
            }
            onChange={(e) => setChangeEng(e.target.value)}
            onBlur={() => {
              setInputEng(false);
              R_F_change_word("eng", changeEng, item.id);
            }}
          />
        ) : (
          <p ref={refContainerENG} onDoubleClick={() => setInputEng(true)}>
            {item.eng}
          </p>
        )}
        {inputUa ? (
          <input
            type="text"
            value={changeUa[0].toUpperCase() + changeUa.slice(1).toLowerCase()}
            maxLength={40}
            autoFocus
            onFocus={() =>
              changeUa === item.ua ? item.ua : setChangeUa(item.ua)
            }
            onChange={(e) => setChangeUa(e.target.value)}
            onBlur={() => {
              setInputUa(false);
              R_F_change_word("ua", changeUa, item.id);
            }}
          />
        ) : (
          <p ref={refContainerUA} onDoubleClick={() => setInputUa(true)}>
            {item.ua}
          </p>
        )}
      </div>

      <button onClick={() => R_F_delete(item.id)}>X</button>
    </div>
  );
};

export default WordsItem;
