/* script.js - updated
   - Loading screen: shows video background and chains; shows for 5s on first visit (sessionStorage)
   - Video iframes embedded directly 
   - Interactive elements have thin red/grey border via .interactive
*/

const LOADING_DURATION = 5000; // ms
const LOADING_SOUND_ENABLED = false; // keep loading silent by default

document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loading-screen');
  const mainContent = document.getElementById('main-content');
  const loadingVideo = document.getElementById('loading-video');

  const firstLoad = !sessionStorage.getItem('subcage_loaded_v2');

  if (LOADING_SOUND_ENABLED && loadingVideo) {
    loadingVideo.muted = false;
    loadingVideo.volume = 0.9;
  }

  if (firstLoad) {
    // show loading for LOADING_DURATION, then hide
    setTimeout(() => {
      hideLoading();
      sessionStorage.setItem('subcage_loaded_v2', '1');
    }, LOADING_DURATION);
  } else {
    hideLoading();
  }
});

function hideLoading(){
  const loadingScreen = document.getElementById('loading-screen');
  const mainContent = document.getElementById('main-content');
  if (loadingScreen) loadingScreen.style.display = 'none';
  if (mainContent) mainContent.classList.remove('hidden');
  // pause loading video if present
  const loadingVideo = document.getElementById('loading-video');
  if (loadingVideo && !loadingVideo.paused) {
    try{ loadingVideo.pause(); loadingVideo.currentTime = 0; } catch(e){}
  }
}

window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.querySelector('.main-content');

    setTimeout(() => {
        loadingScreen.style.display = 'none';
        mainContent.classList.remove('hidden');
    }, 5000);
});
