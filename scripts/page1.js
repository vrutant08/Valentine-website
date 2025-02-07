// Wait until the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {

    // Animate each line to appear one by one when its segment is in view
    const segments = document.querySelectorAll('.segment');
    segments.forEach(segment => {
      // Use a lower threshold and a rootMargin to trigger earlier
      const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const lines = segment.querySelectorAll('.line');
            lines.forEach((line, index) => {
              setTimeout(() => {
                line.style.transition = 'opacity 1s ease-in';
                line.style.opacity = 1;
              }, index * 500); // 500ms delay per line
            });
            // Once the segment is animated, unobserve it so the animation doesn’t trigger again
            observerInstance.unobserve(segment);
          }
        });
      }, { 
        threshold: 0.2,          // lower threshold: 20% of the element is visible
        rootMargin: '0px 0px -20% 0px' // triggers earlier when the element approaches the viewport
      });
      observer.observe(segment);
    });
  
    // Easter Egg interaction: clicking on the icon shows an alert (customize as needed)
    const easterEggs = document.querySelectorAll('.easter-egg');
    easterEggs.forEach(egg => {
      egg.addEventListener('click', () => {
        alert(egg.getAttribute('data-info'));
      });
    });
  
    // Popup (Grand Finale) functionality
    const finalPopup = document.getElementById('final-popup');
    const closePopupBtn = document.querySelector('.close-popup');
  
    function openPopup() {
      finalPopup.classList.remove('hidden');
    }
  
    function closePopup() {
      finalPopup.classList.add('hidden');
    }
  
    closePopupBtn.addEventListener('click', closePopup);
  
    // Example trigger: when the user scrolls to the bottom, open the popup.
    window.addEventListener('scroll', () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        openPopup();
      }
    });
  });
  