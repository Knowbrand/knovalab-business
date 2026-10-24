/* ROMAE PIZZERIA - single source of business data. Edit here, nothing else needed.
   Leave a value empty ("" or []) until it is verified; the site shows safe fallbacks. */
window.ROMAE = {
  whatsapp: "918446844925",
  whatsappMessage: "Hello ROMAE PIZZERIA! I'd like to know more about your menu.",
  phone: "+91 84468 44925",
  address: "",             // full address; enables the directions link and map
  mapsQuery: "",
  hours: [],               // e.g. [["Mon-Fri","12:00 - 23:00"],["Sat-Sun","12:00 - 00:00"]]
  social: { instagram: "https://www.instagram.com/romae.pizzeria/", facebook: "" },
  // All enquiries from the contact form are delivered to this inbox. It is not shown on the site.
  formEndpoint: "https://formsubmit.co/ajax/romaepizzeria@gmail.com",

  // Illustration used for each category (taken from the menu PDF). Missing = icon shown instead.
  categoryImages: {
    "Pizza":"assets/images/menu-pizza.webp","Focaccia":"assets/images/menu-focaccia.webp",
    "Pasta":"assets/images/menu-pasta.webp","Dips":"assets/images/menu-dips.webp",
    "Panuozzo":"assets/images/menu-tomatoes.webp","Add Ons":"assets/images/menu-oliveoil.webp",
    "Salad":"assets/images/menu-salad.webp","Desserts":"assets/images/menu-dessert.webp",
    "Beverages":"assets/images/menu-drinks.webp","Calzone":"assets/images/menu-parmesan.webp"
  },

  /* Menu, in display order. Prices in INR.
     Item fields: name, description, price, tags ["Spicy","Romae Spl."], featured, recommended,
     image (optional, e.g. "assets/images/margherita.jpg" - overrides the category illustration). */
  menu: [
    { category:"Pizza", items:[
      {name:"Marinara", description:"Tomato pelati, Garlic, Oregano, Evoo, Basil", price:385},
      {name:"Margherita", description:"Tomato pelati, Bocconcini, Evoo, Basil", price:425, featured:true},
      {name:"Romae Paradise", description:"Tomato pelati, Fior di latte, Bell pepper sauté, Onion, Black olives, Corn, Evoo, Basil", price:475},
      {name:"Mediterranean Pesto", description:"Basil pesto, Bocconcini, Sundried tomato, Corn, Black olives, Evoo, Parmesan", price:565},
      {name:"Tangy Smoked Paneer", description:"Tomato pelati, Fior di latte, Onion, Bell pepper sauté, Marinated paneer, Evoo, Basil", price:515},
      {name:"Peri Peri Paneer", tags:["Spicy"], description:"Ricotta cheese, Fior di latte, Red pickled paprika, Peri peri paneer, Onion, Evoo, Parsley", price:505},
      {name:"Quattro Formaggi", description:"Ricotta cheese, Fior di latte, Red cheddar, Parmesan, Pickled paprika, Black olives, Evoo, Basil", price:605},
      {name:"Pepperoni Chicken", description:"Tomato pelati, Fior di latte, Onion, Chicken pepperoni, Evoo, Basil", price:545},
      {name:"Minced Chicken", tags:["Romae Spl."], description:"Ricotta cheese, Fior di latte, Onion, Minced chicken, Parsley, Chilli oil, Spicy Italian sauce", price:745, featured:true},
      {name:"Smoked Chicken", description:"Tomato pelati, Fior di latte, Onion, Bell pepper, Smoked chicken, Chilli oil, Basil", price:665},
      {name:"White Forest & Truffle", tags:["Romae Spl."], description:"Ricotta cheese, Fior di latte, Pan fried mushroom, Jalapeños, Burrata, Evoo, Parsley, Truffle oil", price:725, featured:true},
      {name:"Half & Half", description:"Choose any two pizzas and enjoy both flavors on one pizza.", price:765}
    ]},
    { category:"Focaccia", items:[
      {name:"Garlic & Cheese", description:"Garlic, Fior di latte, Evoo, Oregano", price:185},
      {name:"Cilantro Chilli Garlic Cheese", tags:["Spicy","Romae Spl."], description:"Cilantro chilli garlic, Fior di latte, Evoo, Oregano", price:205, recommended:true}
    ]},
    { category:"Panuozzo", items:[
      {name:"Chicken & Mushroom", description:"Basil pesto, Pan fried mushroom, Ricotta, Lettuce, Smoked chicken, Fior di latte", price:315},
      {name:"Pepperoni Chicken", description:"Basil pesto, Chicken pepperoni, Bell pepper sauté, Onion, Fior di latte, Romaine lettuce, Parmesan", price:275},
      {name:"Minced Chicken", tags:["Spicy","Romae Spl."], description:"Basil pesto, Minced chicken, Onion, Romaine lettuce, Red pickled paprika, Italian spicy dip, Parmesan, Fior di latte", price:305, recommended:true},
      {name:"Scrambled Paneer", tags:["Spicy","Romae Spl."], description:"Basil pesto, Peri peri paneer, Romaine lettuce, Pickled paprika, Onion, Fior di latte, Parmesan", price:245},
      {name:"Sundried Tomato & Bell Pepper", description:"Basil pesto, Pan fried mushroom, Bell pepper sauté, Sundried tomato, Romaine lettuce, Fior di latte, Parmesan", price:265}
    ]},
    { category:"Calzone", items:[
      {name:"Roasted Bell Pepper", description:"Fior di latte, Basil pesto, Ricotta cheese, Bell pepper sauté, Sundried tomato, Parmesan", price:205},
      {name:"Pesto & Chicken", description:"Sundried tomato, Ricotta cheese, Basil pesto, Fior di latte, Chicken, Parmesan", price:235}
    ]},
    { category:"Pasta", items:[
      {name:"Alfredo", description:"", price:265},
      {name:"Arrabiata", tags:["Spicy"], description:"", price:255},
      {name:"Pink Blush", description:"", price:285},
      {name:"Agli e Olio", description:"", price:315},
      {name:"Pesto Spaghetti", description:"", price:305},
      {name:"Ravioli", description:"Charcoal mushroom, Four cheese, Spinach & Ricotta", price:365}
    ]},
    { category:"Fried", compact:true, items:[
      {name:"Salted Fries", description:"", price:125},
      {name:"Peri Peri Fries", description:"", price:145},
      {name:"Truffle Parmesan Fries", description:"", price:175},
      {name:"Lemon & Chilli Fries", description:"", price:155},
      {name:"Cheese & Corn Bites", description:"", price:185},
      {name:"Chicken Popcorn", description:"", price:205},
      {name:"Chicken Boneless Tender", description:"", price:235}
    ]},
    { category:"Salad", items:[
      {name:"Caesar Salad", description:"Romaine lettuce, Black olives, Cherry tomato, Sesame seeds, Parmesan, Evoo, American mustard dressing / balsamic vinegar", price:225},
      {name:"Chicken Caesar", description:"Romaine lettuce, Black olives, Cherry tomato, Sesame seeds, Parmesan, Evoo, American mustard dressing / balsamic vinegar, Roasted chicken", price:265}
    ]},
    { category:"Dips", compact:true, items:[
      {name:"Basil Pesto", description:"", price:75},
      {name:"Spicy Italian", description:"", price:75},
      {name:"Cilantro Garlic", description:"", price:75}
    ]},
    { category:"Add Ons", compact:true, note:"Extras for your pizza", items:[
      {name:"Corn", price:35},{name:"Onion", price:25},{name:"Bell Pepper", price:35},{name:"Sundried Tomato", price:75},
      {name:"Burrata", price:205},{name:"Fior di Latte", price:95},{name:"Bocconcini", price:95},{name:"Parmesan Cheese", price:95},
      {name:"Olives", price:35},{name:"Jalapenos", price:45},{name:"Red Pickled Paprika", price:45},{name:"Mushroom (pan-fried)", price:35},
      {name:"Marinated Paneer", price:65},{name:"Chicken Pepperoni", price:95},{name:"Broccoli", price:35},{name:"Roasted Chicken", price:85},
      {name:"Minced Chicken", price:105},{name:"Smoked Chicken", price:95}
    ]},
    { category:"Desserts", items:[
      {name:"Tiramisu", tags:["Romae Spl."], description:"Contains eggs", price:395, recommended:true},
      {name:"Panna Cotta", description:"Blueberry / Mango / Strawberry", price:295},
      {name:"Brownie & Ice Cream", description:"", price:285},
      {name:"Affogato", description:"", price:285}
    ]},
    { category:"Coffee", compact:true, items:[
      {name:"Espresso", price:85},{name:"Americano (Hot/Iced)", price:125},{name:"Iced Latte", price:165},
      {name:"Iced Coffee", price:155},{name:"Cappuccino", price:175},{name:"Hot Chocolate", price:185}
    ]},
    { category:"Beverages", compact:true, items:[
      {name:"Blue Passion Bliss", price:155},{name:"Red Wine Lemonade", price:185},{name:"Kiwi Elderflower Refresher", price:155},
      {name:"Blueberry Orange Mojito", price:165},{name:"Lemon Iced Tea", price:135},{name:"Peach Iced Tea", price:145},
      {name:"Cucumber Iced Tea Fizzy", price:145}
    ]},
    { category:"Matcha", compact:true, items:[
      {name:"Iced Matcha Latte", price:255},{name:"Strawberry Matcha", price:255},{name:"Blueberry Matcha", price:255},{name:"Mango Matcha", price:255}
    ]},
    { category:"Sweet Sippers", compact:true, note:"Cheesecake flavours", items:[
      {name:"Mango", price:245},{name:"Strawberry", price:245},{name:"Blueberry", price:245}
    ]}
  ]
};
