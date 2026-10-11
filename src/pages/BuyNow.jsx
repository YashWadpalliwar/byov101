import {useState,useEffect} from 'react';import {useNavigate,Link} from 'react-router-dom';import {motion,AnimatePresence} from 'framer-motion';import {ArrowRight,ShoppingBag,Check,X,Minus,Plus,Loader2} from 'lucide-react';
import {useCart} from '../context/CartContext.jsx';
export const inr=n=>n==null?'Price TBC':'₹'+n.toLocaleString('en-IN');
const unavailable=p=>p.availability==='Out of stock';
export function BuyNowButton({p,qty=1,small}){const nav=useNavigate();const cart=useCart();const [busy,setBusy]=useState(false);
 const go=()=>{if(busy||unavailable(p))return;setBusy(true);cart.add(p.id,qty);setTimeout(()=>nav('/checkout'),250)};
 return <motion.button whileTap={{scale:.96}} disabled={busy||unavailable(p)} onClick={go} aria-busy={busy}
  className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-accent font-extrabold text-black disabled:opacity-50 ${small?'px-4 py-2 text-sm':'px-7 py-3'}`}>
  <span className="absolute inset-0 -translate-x-full bg-white/40 transition-transform duration-300 group-hover:translate-x-0"/>
  <span className="relative flex items-center gap-2">{unavailable(p)?'Unavailable':busy?<>Preparing <Loader2 className="animate-spin" size={18}/></>:<>Buy Now <ArrowRight size={18} className="transition-transform group-hover:translate-x-1"/></>}</span></motion.button>}
export function AddToCart({p,qty=1,small}){const cart=useCart();const [ok,setOk]=useState(false);
 return <button disabled={unavailable(p)} onClick={()=>{cart.add(p.id,qty);setOk(true);setTimeout(()=>setOk(false),1400)}} className={`inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 hover:bg-white/10 disabled:opacity-50 ${small?'px-4 py-2 text-sm':'px-6 py-3'}`}>
  {ok?<><Check size={18}/>Added</>:<><ShoppingBag size={18}/>Add to Cart</>}</button>}
export const Qty=({v,set})=><div className="inline-flex items-center rounded-lg border border-white/30"><button aria-label="Decrease" className="p-3" onClick={()=>set(Math.max(1,v-1))}><Minus size={16}/></button><span aria-live="polite" className="w-8 text-center">{v}</span><button aria-label="Increase" className="p-3" onClick={()=>set(Math.min(10,v+1))}><Plus size={16}/></button></div>;
export function PurchaseBox({p}){const [q,setQ]=useState(1);return <div className="flex flex-wrap items-center gap-3"><Qty v={q} set={setQ}/><AddToCart p={p} qty={q}/><BuyNowButton p={p} qty={q}/></div>}
export function QuickView({p,onClose}){useEffect(()=>{const f=e=>e.key==='Escape'&&onClose();addEventListener('keydown',f);return()=>removeEventListener('keydown',f)},[onClose]);
 return <motion.div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}>
  <motion.div role="dialog" aria-modal="true" aria-label={p.name} initial={{y:30,opacity:0}} animate={{y:0,opacity:1}} exit={{y:30,opacity:0}} onClick={e=>e.stopPropagation()} className="relative grid max-h-[90vh] w-full max-w-3xl gap-6 overflow-auto rounded-2xl bg-ink p-6 md:grid-cols-2">
  <button autoFocus aria-label="Close" onClick={onClose} className="absolute right-3 top-3"><X/></button><img src={p.image} alt={p.name} className="rounded-xl"/>
  <div><h2 className="text-2xl font-extrabold">{p.name}</h2><p className="mt-1 text-accent">{inr(p.price)} · {p.availability}</p><p className="mt-3 text-white/80">{p.short}</p>
  <div className="mt-5 flex flex-wrap gap-2"><AddToCart p={p}/><BuyNowButton p={p}/></div><Link onClick={onClose} to={`/products/${p.slug}`} className="mt-4 inline-block text-accent underline">Full details</Link></div></motion.div></motion.div>}
export function Pincode(){const [v,setV]=useState('');const [m,setM]=useState(null);
 const check=e=>{e.preventDefault();setM(/^[1-9]\d{5}$/.test(v)?{ok:1}:{err:'Enter a valid 6-digit Indian pincode.'})};
 return <form onSubmit={check} className="mt-6"><label className="text-sm font-semibold">Delivery pincode<div className="mt-1 flex gap-2"><input inputMode="numeric" maxLength={6} value={v} onChange={e=>{setV(e.target.value.replace(/\D/g,''));setM(null)}} className="rounded-lg bg-white/10 px-3 py-2" placeholder="e.g. 440018"/><button className="rounded-lg border border-white/30 px-4">Check</button></div></label>
  {m?.err&&<p role="alert" className="mt-1 text-sm text-red-400">{m.err}</p>}{m?.ok&&<p className="mt-1 text-sm text-white/70">Format valid. Serviceability and delivery dates can't be shown yet — no courier/serviceability API is connected (TODO).</p>}</form>}
export const Skip=AnimatePresence;
