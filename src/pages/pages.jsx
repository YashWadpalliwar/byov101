import {useState,useEffect} from 'react';import {Link,useParams} from 'react-router-dom';import {motion} from 'framer-motion';import {ChevronDown,MapPin,Mail,Phone,Instagram} from 'lucide-react';
import {products,categories,faqs,contact} from '../data/content.js';import {useWishlist} from '../context/WishlistContext.jsx';
import {Cta,PreOrder,Section,ProductCard} from './ui.jsx';
import {PurchaseBox,Pincode} from './BuyNow.jsx';
const P=products[0];
export const usePage=t=>useEffect(()=>{document.title=`${t} | BYOV Nutrition Labs`},[t]);

export function Home(){usePage('Engineered for Hardgainers');return <>
 <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-2">
  <motion.img initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} src={P.image} alt="BYO-V MASS+ tub" className="rounded-2xl"/>
  <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.15}}>
   <span className="rounded bg-accent px-3 py-1 text-sm font-bold text-black">PURE MUSCLE FUEL</span>
   <h1 className="mt-4 text-5xl font-extrabold leading-tight">Engineered for Hardgainers</h1>
   <p className="mt-3 text-xl font-bold">BUILD YOUR OWN <span className="text-accent">LEGACY</span></p>
   <p className="mt-4 text-white/80">{P.description}</p>
   <ul className="mt-4 space-y-2">{P.highlights.map(h=><li key={h} className="rounded-lg bg-indigo/20 px-4 py-2 font-semibold">{h}</li>)}</ul>
   <div className="mt-6 flex flex-wrap gap-3"><PreOrder/><Cta to="/products/byo-v-mass-plus" ghost>View product</Cta></div></motion.div></section>
 <Section eyebrow="The Science" title="BYO-V MASS+ vs Standard Supplements"><div className="overflow-x-auto"><table className="w-full min-w-[480px] text-left">
  <thead><tr className="text-accent"><th className="p-3">Feature</th><th>BYO-V</th><th>Standard</th></tr></thead><tbody>
  {[['Extract Ratio','10:1','1:1'],['Fillers','None','Common'],['Clinical Dosing','Yes','Rare'],['Bioavailability','Maximum','Variable'],['Side Effects','No','Bloating, Acne']].map(r=><tr key={r[0]} className="border-t border-white/10">{r.map((c,i)=><td key={i} className="p-3 font-medium">{c}</td>)}</tr>)}</tbody></table></div></Section>
 <Section title="Shop by category"><div className="grid gap-4 sm:grid-cols-2">{categories.map(c=><Link key={c.slug} to={`/collections/${c.slug}`} className="rounded-2xl border border-white/10 p-6 hover:border-accent"><h3 className="text-xl font-bold">{c.name}</h3><p className="text-white/70">{c.blurb}</p></Link>)}</div></Section>
 <Section title="Frequently asked questions"><FaqList items={faqs.slice(0,3)}/></Section></>}

function FaqList({items}){const [o,setO]=useState(null);return <div className="space-y-2">{items.map((f,i)=><div key={f.q} className="rounded-xl border border-white/10"><button className="flex w-full items-center justify-between p-4 text-left font-semibold" aria-expanded={o===i} onClick={()=>setO(o===i?null:i)}>{f.q}<ChevronDown className={`transition ${o===i?'rotate-180':''}`}/></button>{o===i&&<motion.p initial={{opacity:0}} animate={{opacity:1}} className="px-4 pb-4 text-white/80">{f.a}</motion.p>}</div>)}</div>}
export const FAQ=()=>{usePage('FAQ');return <Section title="FAQ"><FaqList items={faqs}/></Section>};

export function Shop({category}){const {slug}=useParams();const cat=category&&categories.find(c=>c.slug===slug);
 const [q,setQ]=useState('');const [sort,setSort]=useState('name');usePage(cat?cat.name:'Shop');
 if(category&&!cat)return <NotFound/>;
 let list=products.filter(p=>(!cat||p.category===cat.name)&&p.name.toLowerCase().includes(q.toLowerCase()));
 list=[...list].sort((a,b)=>sort==='price'?(a.price??0)-(b.price??0):a.name.localeCompare(b.name));
 return <Section title={cat?cat.name:'Shop all'} eyebrow={cat?<Link to="/shop">Shop /</Link>:null}>
  <div className="mb-6 flex flex-wrap gap-3"><input aria-label="Search products" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search products" className="rounded-lg bg-white/10 px-4 py-2"/>
  <select aria-label="Sort" value={sort} onChange={e=>setSort(e.target.value)} className="rounded-lg bg-white/10 px-3 py-2 text-white"><option className="text-black" value="name">Name</option><option className="text-black" value="price">Price</option></select>
  {q&&<button className="text-accent underline" onClick={()=>setQ('')}>Clear filters</button>}</div>
  {list.length?<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map(p=><ProductCard key={p.id} p={p}/>)}</div>:<p>No products match “{q}”.</p>}</Section>}

export function Product(){const {slug}=useParams();const p=products.find(x=>x.slug===slug);const w=useWishlist();const [tab,setTab]=useState('ingredients');usePage(p?.name||'Not found');
 if(!p)return <NotFound/>;
 return <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-2"><img src={p.image} alt={p.name} className="rounded-2xl"/>
 <div><p className="text-sm text-white/60"><Link to="/shop">Shop</Link> / {p.name}</p><h1 className="mt-2 text-4xl font-extrabold">{p.name}</h1>
 <p className="mt-2 text-accent">{p.price?`₹${p.price}`:'Price to be announced · '+p.availability}</p><p className="mt-4 text-white/80">{p.description}</p>
 <div className="mt-6"><PurchaseBox p={p}/></div><div className="mt-3 flex gap-3"><PreOrder/><button onClick={()=>w.toggle(p.id)} className="rounded-lg border border-white/30 px-5 py-3">{w.has(p.id)?'Remove from wishlist':'Add to wishlist'}</button></div>
 <Pincode/><div className="mt-8 flex gap-2" role="tablist">{['ingredients','usage','notes'].map(t=><button key={t} role="tab" aria-selected={tab===t} onClick={()=>setTab(t)} className={`rounded-full px-4 py-1 capitalize ${tab===t?'bg-accent text-black':'bg-white/10'}`}>{t}</button>)}</div>
 <div className="mt-4 space-y-3">{tab==='ingredients'&&p.ingredients.map(i=><div key={i.name}><b>{i.name}</b><p className="text-white/70">{i.desc}</p></div>)}
 {tab==='usage'&&p.usage.map(u=><div key={u.t}><b>{u.t}</b><p className="text-white/70">{u.d}</p></div>)}
 {tab==='notes'&&<ul className="list-disc pl-5 text-white/80">{p.notes.map(n=><li key={n}>{n}</li>)}</ul>}</div>
 <p className="mt-6 text-xs text-white/50">Supplement facts, net weight, shipping and returns: pending business confirmation.</p></div></div>}

export const About=()=>{usePage('About');return <Section title="Founder's Message" eyebrow="About BYOV">
 <blockquote className="text-lg italic text-white/90">“Legacy isn't given; it's built—rep by rep, day by day. We created BYO-V for the relentless few who refuse to be average. This isn't just a supplement; it is a Mass Catalyst. Fusing ancient Ayurvedic wisdom with modern sports nutrition, we deliver a high-potency matrix designed to fuel your ambition. No fillers. No excuses. Just the raw fuel you need to Build Your Own Legacy.”</blockquote>
 <div className="mt-6"><Cta to="/shop">Shop now</Cta></div></Section>};
export const Quality=()=>{usePage('Ingredients & Quality');return <Section title="Ingredients & Quality" eyebrow="10:1 extracts">
 <p className="mb-6 text-white/80">10kg raw herb yields 1kg pure extract. 4g micro dosing. 100% label transparency.</p>
 <div className="grid gap-4 md:grid-cols-3">{P.ingredients.map(i=><div key={i.name} className="rounded-2xl bg-ink p-5"><h3 className="font-bold text-accent">{i.name}</h3><p className="mt-2 text-white/80">{i.desc}</p></div>)}</div>
 <p className="mt-6 text-sm text-white/50">TODO: lab reports, certifications and manufacturing details — none are published yet, so none are claimed.</p></Section>};

export function Contact(){usePage('Contact');const [f,setF]=useState({name:'',email:'',subject:'',message:''});const [err,setErr]=useState({});const [done,setDone]=useState(false);
 const submit=e=>{e.preventDefault();const x={};if(!f.name.trim())x.name='Name is required';if(!/^\S+@\S+\.\S+$/.test(f.email))x.email='Enter a valid email';if(!f.subject.trim())x.subject='Subject is required';if(f.message.trim().length<10)x.message='Message needs at least 10 characters';setErr(x);if(!Object.keys(x).length)setDone(true)};
 const field=(k,l,t)=><label className="block">{l}{t?<textarea rows="4" value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})} className="mt-1 w-full rounded-lg bg-white/10 p-3"/>:<input value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})} className="mt-1 w-full rounded-lg bg-white/10 p-3"/>}{err[k]&&<span role="alert" className="text-sm text-red-400">{err[k]}</span>}</label>;
 return <Section title="Contact Us"><div className="grid gap-10 md:grid-cols-2"><div className="space-y-4">
 <p className="flex gap-3"><MapPin className="text-indigo"/>{contact.address}</p><p className="flex gap-3"><Mail className="text-indigo"/><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
 <p className="flex gap-3"><Phone className="text-indigo"/><a href={`tel:${contact.phone}`}>{contact.phone}</a></p><p className="flex gap-3"><Instagram className="text-indigo"/><a href={contact.instagramUrl} target="_blank" rel="noreferrer">@{contact.instagram}</a></p></div>
 {done?<div className="rounded-xl border border-accent p-5"><b>Form validated.</b> No email backend is connected yet, so nothing was sent. <a className="underline" href={`mailto:${contact.email}?subject=${encodeURIComponent(f.subject)}&body=${encodeURIComponent(f.message)}`}>Click here to send it from your mail app.</a></div>
 :<form onSubmit={submit} noValidate className="space-y-3">{field('name','Name')}{field('email','Email')}{field('subject','Subject')}{field('message','Message',1)}<button className="rounded-lg bg-accent px-6 py-3 font-bold text-black">Send</button></form>}</div></Section>}

export function Wishlist(){const w=useWishlist();usePage('Wishlist');const l=products.filter(p=>w.has(p.id));
 return <Section title="Wishlist">{l.length?<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{l.map(p=><ProductCard key={p.id} p={p}/>)}</div>:<p>Your wishlist is empty. <Link className="text-accent underline" to="/shop">Browse products</Link></p>}</Section>}
export const Policy=({title})=>{usePage(title);return <Section title={title}><p className="rounded-xl border border-accent/50 p-5">This policy has not been published by BYOV Nutrition Labs yet. Content must be supplied and legally reviewed by the business before launch. Questions? <a className="underline" href={`mailto:${contact.email}`}>{contact.email}</a></p></Section>};
export const NotFound=()=>{usePage('404');return <Section title="404 — Page not found"><Cta to="/">Back home</Cta></Section>};
