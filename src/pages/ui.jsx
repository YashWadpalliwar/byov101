import {motion} from 'framer-motion';import {Heart} from 'lucide-react';import {Link} from 'react-router-dom';
import {useWishlist} from '../context/WishlistContext.jsx';import {PREORDER_URL} from '../data/content.js';
export const Reveal=({children,className=''})=><motion.div className={className} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.45}}>{children}</motion.div>;
export const Cta=({to,href,children,ghost})=>{const c=`inline-flex items-center justify-center rounded-lg px-6 py-3 font-bold transition active:scale-95 ${ghost?'border border-white/30 hover:bg-white/10':'bg-accent text-black hover:brightness-110'}`;
 return href?<a className={c} href={href} target="_blank" rel="noreferrer">{children}</a>:<Link className={c} to={to}>{children}</Link>};
export const PreOrder=()=><Cta href={PREORDER_URL}>Book pre-orders</Cta>;
export const Section=({title,eyebrow,children})=><section className="mx-auto max-w-6xl px-5 py-14"><Reveal>{eyebrow&&<p className="text-accent text-sm font-semibold uppercase tracking-widest">{eyebrow}</p>}<h2 className="mt-1 text-3xl font-extrabold md:text-4xl">{title}</h2><div className="mt-6">{children}</div></Reveal></section>;
import {useState} from 'react';import {AnimatePresence} from 'framer-motion';import {Eye} from 'lucide-react';import {BuyNowButton,AddToCart,QuickView,inr} from './BuyNow.jsx';
export function ProductCard({p}){const w=useWishlist();const [qv,setQv]=useState(false);return <div className="group rounded-2xl border border-white/10 bg-ink p-4 transition hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_10px_40px_-10px_rgba(255,159,67,.35)]">
 <div className="relative overflow-hidden rounded-xl"><Link to={`/products/${p.slug}`}><img src={p.image} alt={p.name} loading="lazy" className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"/></Link>
 <button onClick={()=>setQv(true)} className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-xs"><Eye size={14}/>Quick view</button></div>
 <Link to={`/products/${p.slug}`}><h3 className="mt-3 text-lg font-bold">{p.name}</h3></Link><p className="text-sm text-white/70">{p.short}</p>
 <div className="mt-3 flex items-center justify-between"><span className="text-sm text-accent">{inr(p.price)} · {p.availability}</span><button aria-label="Toggle wishlist" aria-pressed={w.has(p.id)} onClick={()=>w.toggle(p.id)}><Heart className={w.has(p.id)?'fill-accent text-accent':''}/></button></div>
 <div className="mt-3 flex flex-wrap gap-2"><AddToCart p={p} small/><BuyNowButton p={p} small/></div>
 <AnimatePresence>{qv&&<QuickView p={p} onClose={()=>setQv(false)}/>}</AnimatePresence></div>}
