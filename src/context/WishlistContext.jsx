import {createContext,useContext,useEffect,useState} from 'react';
const Ctx=createContext();
const load=()=>{try{return JSON.parse(localStorage.getItem('byov-wishlist'))||[]}catch{return []}};
export function WishlistProvider({children}){
  const [ids,setIds]=useState(load);
  useEffect(()=>{try{localStorage.setItem('byov-wishlist',JSON.stringify(ids))}catch{}},[ids]);
  const toggle=id=>setIds(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  return <Ctx.Provider value={{ids,toggle,has:id=>ids.includes(id)}}>{children}</Ctx.Provider>;
}
export const useWishlist=()=>useContext(Ctx);
