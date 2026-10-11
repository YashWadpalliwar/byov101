import {createRoot} from 'react-dom/client';import {BrowserRouter} from 'react-router-dom';
import {CartProvider} from './context/CartContext.jsx';import App from './App.jsx';import {WishlistProvider} from './context/WishlistContext.jsx';import './index.css';
createRoot(document.getElementById('root')).render(<BrowserRouter><WishlistProvider><CartProvider><App/></CartProvider></WishlistProvider></BrowserRouter>);
