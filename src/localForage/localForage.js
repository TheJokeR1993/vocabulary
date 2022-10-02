import localforage from "localforage"

const words = localforage.createInstance({ name: 'words' })

export const lfWords ={
    getItem:()=> words.getItem('words'),
    setItem:(elem)=>words.setItem('words',elem),
}