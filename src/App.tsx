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

export default function App() {
  return (
    <BrowserRouter>
      {/* Global Fullscreen Background */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-[-50]">
        <img 
          src="https://raw.githubusercontent.com/malualmadut211-bot/ai-studio-media/11a77858f8206ead3a9e5d402f53024af0663a4c/pexels-larry-penaloza-311813562-13549224.jpg" 
          alt="Hotel Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

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
