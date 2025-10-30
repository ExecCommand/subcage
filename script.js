// script.js - loading logic and accessibility
// - Shows loading screen with video for first visit (5s). Uses sessionStorage to show only once.
// - After hide, main content is displayed and video paused for performance.

const LOADING_KEY = 'subcage_loaded_v3';
const LOADING_TIME = 5000; // milliseconds

document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loading-screen');
  const loadingVideo = document.getElementById('loading-video');
  const mainContent = document.getElementById('main-content') || document.getElementById('main-content'); // defensive

  const firstLoad = !sessionStorage.getItem(LOADING_KEY);

  if (firstLoad) {
    setTimeout(() => {
      hideLoading();
      sessionStorage.setItem(LOADING_KEY, '1');
    }, LOADING_TIME);
  } else {
    hideLoading();
  }

  // Ensure video is muted to allow autoplay on mobile
  if (loadingVideo) loadingVideo.muted = true;
});

function hideLoading() {
  const loadingScreen = document.getElementById('loading-screen');
  const loadingVideo = document.getElementById('loading-video');
  const mainContent = document.getElementById('main-content') || document.querySelector('main');

  if (loadingScreen) loadingScreen.style.display = 'none';
  if (mainContent) mainContent.classList.remove('hidden');

  // pause and remove source to save bandwidth
  if (loadingVideo) {
    try {
      loadingVideo.pause();
      loadingVideo.removeAttribute('src');
      loadingVideo.load();
    } catch (e) {
      // ignore
    }
  }
}
