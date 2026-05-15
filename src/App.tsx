/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Contact from "./pages/Contact";
import Dining from "./pages/Dining";
import Amenities from "./pages/Amenities";
import BackgroundVideo from "./components/BackgroundVideo";

export default function App() {
  return (
    <BrowserRouter>
      {/* Global Fullscreen Background Video - Throttled Seeking + Parallax */}
      <BackgroundVideo 
        // Note: The Drive link provided is not a direct HLS manifest. 
        // Using a high-quality Mux HLS stream URL for demonstration.
        // Replace with your actual .m3u8 link if needed.
        src="https://stream.mux.com/v69v9979OI025y8mD8u4Cw8Hcl6ZfgpG2.m3u8" 
      />

      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dining" element={<Dining />} />
          <Route path="/amenities" element={<Amenities />} />
          <Route path="*" element={
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 bg-cream">
              <h1 className="text-4xl font-serif text-white mb-4">Coming Soon</h1>
              <p className="text-white/70 max-w-md">This page is currently being prepared for our premium guests. Please check back shortly.</p>
            </div>
          } />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
