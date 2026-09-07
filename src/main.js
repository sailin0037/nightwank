import './style.css';
import { ShaderBackground } from './ShaderBackground.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize the WebGL background
  const canvas = document.getElementById('webgl-canvas');
  if (canvas) {
    new ShaderBackground(canvas);
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});
