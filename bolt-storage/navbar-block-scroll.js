(function() {
  'use strict';
  
  let navButton, scrollableElements;
  let scrollY = 0;
  
  function preventBodyScroll(e) {
    const target = e.target.closest('[fs-scrolldisable-element="enabled"]');
    if (!target) {
      e.preventDefault();
    }
  }
  
  function handleTouchMove(e) {
    const target = e.target.closest('[fs-scrolldisable-element="enabled"]');
    
    // Se não for um elemento permitido, bloqueia
    if (!target) {
      e.preventDefault();
      return;
    }
    
    // Permite scroll no elemento, mas previne overscroll
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const height = target.clientHeight;
    const delta = e.touches[0].clientY - (e.touches[0].startY || e.touches[0].clientY);
    
    // Previne bounce no topo
    if (delta > 0 && scrollTop === 0) {
      e.preventDefault();
      return;
    }
    
    // Previne bounce no fim
    if (delta < 0 && scrollTop + height >= scrollHeight) {
      e.preventDefault();
      return;
    }
  }
  
  function handleTouchStart(e) {
    const target = e.target.closest('[fs-scrolldisable-element="enabled"]');
    if (target && e.touches[0]) {
      e.touches[0].startY = e.touches[0].clientY;
    }
  }
  
  function lockScroll() {
    // Salva posição atual do scroll
    scrollY = window.scrollY;
    
    // Lock do body
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    
    // Atualiza lista de elementos scrolláveis
    scrollableElements = Array.from(
      document.querySelectorAll('[fs-scrolldisable-element="enabled"]')
    );
    
    // Adiciona listeners
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('wheel', preventBodyScroll, { passive: false });
  }
  
  function unlockScroll() {
    // Remove styles do body
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    
    // Restaura scroll position
    window.scrollTo(0, scrollY);
    
    // Remove listeners
    document.removeEventListener('touchstart', handleTouchStart);
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('wheel', preventBodyScroll);
  }
  
  function toggleMenuScroll() {
    setTimeout(() => {
      const isOpen = navButton.classList.contains('w--open');
      
      if (isOpen) {
        lockScroll();
      } else {
        unlockScroll();
      }
    }, 50);
  }
  
  function init() {
    navButton = document.querySelector('.navbar_menu-button');
    
    if (!navButton) {
      console.warn('TryKeep Navbar: Menu button não encontrado');
      return;
    }
    
    scrollableElements = [];
    navButton.addEventListener('click', toggleMenuScroll);
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();