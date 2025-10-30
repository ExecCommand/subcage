/* script.js
   - Loading screen (5s on first visit using sessionStorage)
   - Optional audio play if available and allowed by browser
   - Video thumbnails inject YouTube iframe on click/Enter
*/

const LOADING_DURATION = 5000; // ms
const LOADING_SOUND_ENABLED = true; // set to false to disable sound

document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loading-screen');
  const mainContent = document.getElementById('main-content');
  const loadingAudio = document.getElementById('loading-audio');

  const firstLoad = !sessionStorage.getItem('subcage_loaded');

  if (LOADING_SOUND_ENABLED && loadingAudio) {
    // Try to play; browsers might block autoplay without user gesture
    loadingAudio.volume = 0.9;
    const tryPlay = loadingAudio.play();
    if (tryPlay && tryPlay.catch) tryPlay.catch(() => {/* autoplay blocked */});
  }

  if (firstLoad) {
    setTimeout(() => {
      hideLoading();
      sessionStorage.setItem('subcage_loaded', '1');
    }, LOADING_DURATION);
  } else {
    // Hide immediately for subsequent visits
    hideLoading();
  }

  // Video thumbnail behavior
  const thumbs = document.querySelectorAll('.video-thumb');
  thumbs.forEach(thumb => {
    const parent = thumb.closest('.video-box');
    const embed = parent.getAttribute('data-embed');
    thumb.addEventListener('click', () => injectIframe(parent, embed));
    thumb.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        injectIframe(parent, embed);
      }
    });
  });
});

function hideLoading(){
  const loadingScreen = document.getElementById('loading-screen');
  const mainContent = document.getElementById('main-content');
  if (loadingScreen) loadingScreen.style.display = 'none';
  if (mainContent) mainContent.classList.remove('hidden');
  // stop audio if playing
  const loadingAudio = document.getElementById('loading-audio');
  if (loadingAudio && !loadingAudio.paused) {
    try { loadingAudio.pause(); loadingAudio.currentTime = 0; } catch(e){}
  }
}

function injectIframe(container, embedUrl){
  if (!embedUrl) return;
  const iframe = document.createElement('iframe');
  iframe.src = embedUrl.includes('?') ? embedUrl + '&autoplay=1' : embedUrl + '?autoplay=1';
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
  iframe.setAttribute('allowfullscreen', 'true');
  // Empty container and append
  container.innerHTML = '';
  container.appendChild(iframe);
}
