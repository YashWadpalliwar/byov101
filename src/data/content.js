// All text below is taken from byovnutritionlabs.com. TODO = needs business input.
export const PREORDER_URL='https://form.typeform.com/to/m0r6IBoU';
export const contact={address:'Urdu School Bldg, C/O Abdul Sattar, Gandhibagh, Nagpur-18',email:'byonutritionlabs@gmail.com',phone:'8482974227',instagram:'byov.labs',instagramUrl:'https://www.instagram.com/byov.labs/',whatsapp:'https://www.whatsapp.com/channel/0029VbCcHla2ER6fdxVx382t',dietChart:'https://docs.google.com/forms/d/e/1FAIpQLScqXEBSG0pAx7c92_BiuUmtc8nJgB5raNq32SfpnsGfueN9jA/viewform?usp=publish-editor'};
export const products=[{
  id:1,slug:'byo-v-mass-plus',name:'BYO-V MASS+',category:'Mass Gain',availability:'Pre-order',
  price:null, // TODO: price, sizes, flavours, net weight not published
  image:'https://cdn.gamma.app/t8akpsdulbizep3/14727ec95f3e489dab76e792c6ba6630/original/BYO--V.png',
  short:'High-potency, clinically dosed herbal catalyst engineered for Hardgainers.',
  description:'BYO-V MASS+ is a high-potency, clinically dosed herbal catalyst engineered for Hardgainers. Every ingredient is extracted at 10:1 concentration — delivering maximum bioavailability and muscle-building power with zero compromise.',
  highlights:['Optimizes Digestion & Absorption','Powered by 10:1 Extracts','100% Natural & Clinically Dosed'],
  ingredients:[
   {name:'Ashwagandha 10:1',desc:'Reduces cortisol, amplifies testosterone, and accelerates recovery between training sessions.'},
   {name:'Safed Musli 10:1',desc:'Help increase the circulation of natural growth hormones, supporting muscle repair and development post-exercise.'},
   {name:'Vidharikand 10:1',desc:'Helps you achieve healthy weight gain and build muscle mass naturally by improving digestion, increasing your appetite, and enhancing nutrient absorption.'}],
  usage:[{t:'Phase 1: first 7 days',d:'1/2 scoop 15 minutes after lunch & 1/2 scoop 15 minutes after dinner.'},{t:'Phase 2: after 7 days',d:'1 scoop 15 minutes after lunch & 1 scoop 30 minutes after dinner.'}],
  notes:['Drink 3–4L of water and eat plenty of greens.','Results build over time with regular use.','If digestion feels off, avoid milk, tea, and coffee.','Not for serious medical conditions or recent surgery.']
}];
export const categories=[{slug:'mass-gain',name:'Mass Gain',blurb:'Herbal catalysts for hardgainers.'}];
export const faqs=[
 {q:'What is BYO-V MASS+?',a:products[0].description},
 {q:'How do I use it?',a:'Phase 1 (first 7 days): 1/2 scoop 15 min after lunch and dinner. Phase 2: 1 scoop 15 min after lunch and 1 scoop 30 min after dinner. Add healthy, protein-rich food to your diet.'},
 {q:'What if my digestion feels off?',a:'Avoid milk, tea, and coffee.'},
 {q:'Who should check first?',a:'Not for serious medical conditions or recent surgery.'},
 {q:'How do I order?',a:'Currently via the pre-order form on this site. Checkout is not yet available.'},
 {q:'Shipping, returns, refunds, payments?',a:'TODO: business to confirm — no policy is published yet.'}];
