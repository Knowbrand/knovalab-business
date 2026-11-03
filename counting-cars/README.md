Open index.html directly, or serve it: python3 -m http.server 8000 (then http://localhost:8000).
Three pages (index, about/, contact/). Navbar and footer are built once in assets/js/main.js, so a change there applies everywhere; no fetch, so file:// works too.
