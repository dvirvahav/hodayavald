/*
 * Premium Hairdresser & Makeup Artist Website - Custom JavaScript
 */

(function() {
  'use strict';

  // Preloader
  window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(function() {
        preloader.style.opacity = '0';
        setTimeout(function() {
          preloader.style.display = 'none';
        }, 500);
      }, 500);
    }
  });

  // Initialize AOS Animation
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });

  // Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      if (this.getAttribute('href') === '#') return;
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });

  // Portfolio Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Back to Top Button
  const backToTopButton = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('active');
    } else {
      backToTopButton.classList.remove('active');
    }
  });

  backToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Form Submission (Prevent default for demo)
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form elements
      const formElements = Array.from(this.elements);
      let isValid = true;
      
      // Simple validation
      formElements.forEach(element => {
        if (element.hasAttribute('required') && !element.value.trim()) {
          isValid = false;
          element.classList.add('is-invalid');
        } else {
          element.classList.remove('is-invalid');
        }
      });
      
      if (isValid) {
        // Show success message (in a real site, this would submit to a server)
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> שולח...';
        
        setTimeout(() => {
          // Reset form
          this.reset();
          
          // Create success alert
          const successAlert = document.createElement('div');
          successAlert.className = 'alert alert-success mt-3';
          successAlert.textContent = 'ההודעה נשלחה בהצלחה! נחזור אליך בהקדם.';
          
          // Insert alert after form
          this.parentNode.insertBefore(successAlert, this.nextSibling);
          
          // Reset button
          submitButton.disabled = false;
          submitButton.textContent = originalText;
          
          // Remove alert after 5 seconds
          setTimeout(() => {
            successAlert.remove();
          }, 5000);
        }, 1500);
      }
    });
  });

  // Lightbox Options
  lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true,
    'albumLabel': "תמונה %1 מתוך %2",
    'fadeDuration': 300
  });

  // Add CSS class for Instagram hover effect
  const instagramItems = document.querySelectorAll('.instagram-item');
  instagramItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.classList.add('instagram-hover');
    });
    
    item.addEventListener('mouseleave', function() {
      this.classList.remove('instagram-hover');
    });
  });

  // Add additional styles for back to top button
  const style = document.createElement('style');
  style.textContent = `
    .back-to-top {
      position: fixed;
      right: 30px;
      bottom: 30px;
      width: 40px;
      height: 40px;
      background: var(--primary);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease-in-out;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .back-to-top.active {
      opacity: 1;
      visibility: visible;
    }
    
    .back-to-top:hover {
      background: var(--dark);
      transform: translateY(-3px);
    }
    
    #preloader {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: white;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.5s ease-in-out;
    }
    
    .instagram-item {
      display: block;
      position: relative;
      overflow: hidden;
      border-radius: 5px;
      margin-bottom: 15px;
    }
    
    .instagram-item img {
      transition: transform 0.5s ease;
    }
    
    .instagram-item:hover img {
      transform: scale(1.1);
    }
    
    .instagram-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(212, 175, 55, 0.7);
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 1;
    }
    
    .instagram-item::after {
      content: '\\f16d';
      font-family: 'Font Awesome 5 Brands';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 2rem;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 2;
    }
    
    .instagram-item:hover::before,
    .instagram-item:hover::after {
      opacity: 1;
    }
  `;
  document.head.appendChild(style);

})();
