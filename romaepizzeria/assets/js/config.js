/* ROMAE PIZZERIA — single source of business data. Edit here, nothing else needed.
   Leave a value empty ("" or []) until it is verified; the site shows safe fallbacks. */
window.ROMAE = {
  whatsapp: "",            // digits only, with country code, e.g. "919876543210"
  whatsappMessage: "Hello ROMAE PIZZERIA! I'd like to know more about your menu.",
  phone: "",               // display + tel: link, e.g. "+91 98765 43210"
  email: "",
  address: "",             // full address; enables the directions link
  mapsQuery: "",           // optional: text/URL query for Google Maps embed (defaults to address)
  hours: [],               // e.g. [["Mon–Fri","12:00 – 23:00"],["Sat–Sun","12:00 – 00:00"]]
  social: { instagram: "", facebook: "" },
  formEndpoint: "",        // e.g. Formspree URL. Empty = form falls back to WhatsApp/email
  /* Menu items. Format:
     { name:"", description:"", price:"₹000", category:"Pizzas", image:"assets/images/x.jpg",
       featured:true, recommended:true }                                                      */
  menu: []
};
