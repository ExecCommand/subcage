window.addEventListener('load', () => {
  const loader = document.getElementById('loading-screen');
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 1000);
  }, 5000);
});
