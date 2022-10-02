export const random = (length,num, arrN) => {
    const arr = arrN ? arrN : [];
    for (let i = arr.length; num > i; i++) {
      let elem = Math.floor(Math.random() * length );
      if (!arr.length) {
        arr.push(elem);
      } else {
        let isBool = arr.find((el) => el === elem);
        isBool === undefined && arr.push(elem);
      }
    }
    return arr.length === num ? arr : random(length,num, arr);
  };



export  const shuffle=(array)=> {
    const newArray = [...array];
    const length = newArray.length;
  
    for (let start = 0; start < length; start++) {
      const randomPosition = Math.floor(
        (newArray.length - start) * Math.random()
      );
      const randomItem = newArray.splice(randomPosition, 1);
  
      newArray.push(...randomItem);
    }
  
    return newArray;
  }



export const lookSmile=(number)=>{
 return number<4 
    ? 'https://w7.pngwing.com/pngs/656/560/png-transparent-smiley-face-bad-sad.png'
    : number <7 
      ? 'https://c0.klipartz.com/pngpicture/242/741/gratis-png-emoji-tranquilo-emoticon-de-lengua-sonriente-guino-cara-sonriente-thumbnail.png'
      : 'https://w7.pngwing.com/pngs/0/852/png-transparent-smiley-emoticon-animation-goodbye-miscellaneous-face-words-phrases.png'
}
    
  