import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/sections/Hero';
import Education from './components/sections/Education';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Achievements from './components/sections/Achievements';
import './App.css';

export default function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Navbar />
        <main className="app-main">
          <Hero />
          <Education />
          <Experience />
          <Projects />
          <Achievements />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
