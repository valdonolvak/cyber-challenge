//import { defineConfig } from "vite";
//import react from "@vitejs/plugin-react";

//export default defineConfig({
//  plugins: [react()],
//  base: "/cyber-challenge/", // oluline GitHub Pages deploy jaoks
//});
//

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// Impordime obfuskeerija plugina
import obfuscator from 'rollup-plugin-javascript-obfuscator'; 

export default defineConfig({
  plugins: [
    react(),
    // Kontrollime, kas oleme tootmisrežiimis (process.env.NODE_ENV === 'production')
    // Kui jah, lisame obfuskeerija
    process.env.NODE_ENV === 'production' && obfuscator({
      // --- Soovitatavad agressiivsed seaded ---
      // Muudab koodi raskesti loetavaks (oluline)
      controlFlowFlattening: true, 
      controlFlowFlatteningThreshold: 1, 
      // Krüpteerib kõik stringid (nt teie küsimused/vastused)
      stringArray: true,
      stringArrayThreshold: 1,
      // Asendab muutujate nimed suvalistega (nt 'a', 'b', jne)
      renameProperties: true,
      // Lisa koodile kaitse de-obfuskeerimise vastu
      selfDefending: true,
      // Eemaldab konsooli väljundid
      removeConsole: true,
      compact: true,
    }),
  ].filter(Boolean), // Filtreerib välja 'false' väärtuse (kui obfuskeerija on keelatud)
  base: "/cyber-challenge/", // oluline GitHub Pages deploy jaoks
});