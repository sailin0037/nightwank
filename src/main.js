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

  // Custom Cursor Glow Tracker
  const cursor = document.querySelector('.custom-cursor');
  if (cursor) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
    });
  }

  // Reveal Animations & Stat Counters on Scroll
  const revealElements = document.querySelectorAll('.reveal');
  const counters = document.querySelectorAll('.counter');
  
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add active class for reveal animation
        entry.target.classList.add('active');
        
        // If it's the stats bar, animate counters
        if (entry.target.classList.contains('stats-bar')) {
          counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const decimals = parseInt(counter.getAttribute('data-decimals') || 0);
            const duration = 2000; // 2 seconds
            const start = performance.now();
            
            const animateCounter = (currentTime) => {
              const elapsed = currentTime - start;
              const progress = Math.min(elapsed / duration, 1);
              // easeOutQuart
              const easeProgress = 1 - Math.pow(1 - progress, 4);
              const current = target * easeProgress;
              
              counter.innerText = current.toFixed(decimals);
              
              if (progress < 1) {
                requestAnimationFrame(animateCounter);
              } else {
                counter.innerText = target.toFixed(decimals);
              }
            };
            requestAnimationFrame(animateCounter);
          });
          // Only animate counters once
          obs.unobserve(entry.target);
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
});
