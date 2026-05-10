import { searchGoogleShoppingWithFirecrawl } from './src/lib/firecrawl.js';


searchGoogleShoppingWithFirecrawl('zapatillas adidas')
  .then(res => console.log(JSON.stringify(res, null, 2)))
  .catch(console.error);
