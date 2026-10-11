import {createContext,useContext,useEffect,useState} from 'react';
const Ctx=createContext();
const load=()=>{try{return JSON.parse(localStorage.getItem('byov-cart'))||[]}catch{return []}};
export function CartProvider({children}){
  const [items,setItems]=useState(load);
  useEffect(()=>{try{localStorage.setItem('byov-cart',JSON.stringify(items))}catch{}},[items]);
  const add=(id,qty=1)=>setItems(p=>p.some(i=>i.id===id)?p.map(i=>i.id===id?{...i,qty:i.qty+qty}:i):[...p,{id,qty}]);
  const setQty=(id,qty)=>setItems(p=>qty<1?p.filter(i=>i.id!==id):p.map(i=>i.id===id?{...i,qty}:i));
  const clear=()=>setItems([]);
  return <Ctx.Provider value={{items,add,setQty,clear,count:items.reduce((n,i)=>n+i.qty,0)}}>{children}</Ctx.Provider>;
}
export const useCart=()=>useContext(Ctx);
