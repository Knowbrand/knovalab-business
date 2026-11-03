Cream Berry Nation (knovalab demo). Static site: index.html, about/, menu/, contact/.
Run: python3 -m http.server 8000, then open http://localhost:8000 (shared header/footer are rendered by assets/js/components.js and use paths relative to the script, so it also works in a GitHub Pages sub-path).
Images: all food and fruit visuals in assets/images are vector illustrations drawn for this demo. To use real photography, save files with the same names but .jpg/.png/.webp and update the src extension, or replace the SVGs in place.
Footer/drips colour: --pink in assets/css/style.css drives both the drip silhouette and the footer.
