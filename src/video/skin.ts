
import '../styles/video/scaffold.css';
import './skin.css';
import '@videojs/html/i18n';
import '@videojs/html/ui/container';
import '@videojs/html/ui/poster';
import '@videojs/html/ui/error-dialog';
import '@videojs/html/ui/dialog-backdrop';
import '@videojs/html/ui/dialog-popup';
import '@videojs/html/ui/dialog-title';
import '@videojs/html/ui/dialog-description';
import '@videojs/html/ui/dialog-close';
import '@videojs/html/ui/controls';
import '@videojs/html/ui/controls-backdrop';
import '@videojs/html/ui/controls-group';
import '@videojs/html/ui/buffering-indicator';
import '@videojs/html/ui/controls-content';
import '@videojs/html/ui/tooltip-group';
import '@videojs/html/ui/title';
import '@videojs/html/ui/airplay-button';
import '@videojs/html/ui/tooltip';
import '@videojs/html/ui/tooltip-label';
import '@videojs/html/ui/tooltip-shortcut';
import '@videojs/html/ui/cast-button';
import '@videojs/html/ui/pip-button';
import '@videojs/html/ui/fullscreen-button';
import '@videojs/html/ui/seek-button';
import '@videojs/html/ui/play-button';
import '@videojs/html/ui/time-slider';
import '@videojs/html/ui/time-slider-chapters';
import '@videojs/html/ui/slider-track';
import '@videojs/html/ui/slider-buffer';
import '@videojs/html/ui/slider-fill';
import '@videojs/html/ui/slider-thumb';
import '@videojs/html/ui/slider-preview';
import '@videojs/html/ui/slider-thumbnail';
import '@videojs/html/ui/slider-value';
import '@videojs/html/ui/time-slider-chapter-title';
import '@videojs/html/ui/mute-button';
import '@videojs/html/ui/volume-popover';
import '@videojs/html/ui/volume-slider';
import '@videojs/html/ui/time-group';
import '@videojs/html/ui/time';
import '@videojs/html/ui/time-separator';
import '@videojs/html/ui/captions-button';
import '@videojs/html/ui/menu';
import '@videojs/html/ui/menu-content';
import '@videojs/html/ui/menu-item';
import '@videojs/html/ui/menu-separator';
import '@videojs/html/ui/quality-radio-group';
import '@videojs/html/ui/menu-radio-item';
import '@videojs/html/ui/menu-item-indicator';
import '@videojs/html/ui/audio-track-radio-group';
import '@videojs/html/ui/playback-rate-radio-group';
import '@videojs/html/ui/captions-radio-group';
import '@videojs/html/ui/hotkey';
import '@videojs/html/ui/gesture';
import '@videojs/html/ui/status-announcer';
import '@videojs/html/ui/volume-indicator';
import '@videojs/html/ui/volume-indicator-fill';
import '@videojs/html/ui/volume-indicator-value';
import '@videojs/html/ui/status-indicator';
import '@videojs/html/ui/status-indicator-value';
import '@videojs/html/ui/seek-indicator';
import '@videojs/html/ui/seek-indicator-value';

import { registerIcons } from '@videojs/html/icons';

import {
  airPlayEnterIcon as airPlayEnterIconScaffold,
  airPlayExitIcon as airPlayExitIconScaffold,
  captionsOffIcon as captionsOffIconScaffold,
  captionsOnIcon as captionsOnIconScaffold,
  castEnterIcon as castEnterIconScaffold,
  castExitIcon as castExitIconScaffold,
  checkIcon as checkIconScaffold,
  chevronIcon as chevronIconScaffold,
  fullscreenEnterIcon as fullscreenEnterIconScaffold,
  fullscreenExitIcon as fullscreenExitIconScaffold,
  gearIcon as gearIconScaffold,
  pauseIcon as pauseIconScaffold,
  pipEnterIcon as pipEnterIconScaffold,
  pipExitIcon as pipExitIconScaffold,
  playIcon as playIconScaffold,
  restartIcon as restartIconScaffold,
  seekIcon as seekIconScaffold,
  speechIcon as speechIconScaffold,
  speedIcon as speedIconScaffold,
  spinnerIcon as spinnerIconScaffold,
  switchesIcon as switchesIconScaffold,
  volumeHighIcon as volumeHighIconScaffold,
  volumeLowIcon as volumeLowIconScaffold,
  volumeOffIcon as volumeOffIconScaffold,
} from '@videojs/html/icons/scaffold';

registerIcons('scaffold', {
  'airplay-enter': airPlayEnterIconScaffold,
  'airplay-exit': airPlayExitIconScaffold,
  'captions-off': captionsOffIconScaffold,
  'captions-on': captionsOnIconScaffold,
  'cast-enter': castEnterIconScaffold,
  'cast-exit': castExitIconScaffold,
  check: checkIconScaffold,
  chevron: chevronIconScaffold,
  'fullscreen-enter': fullscreenEnterIconScaffold,
  'fullscreen-exit': fullscreenExitIconScaffold,
  gear: gearIconScaffold,
  pause: pauseIconScaffold,
  'pip-enter': pipEnterIconScaffold,
  'pip-exit': pipExitIconScaffold,
  play: playIconScaffold,
  restart: restartIconScaffold,
  seek: seekIconScaffold,
  speech: speechIconScaffold,
  speed: speedIconScaffold,
  spinner: spinnerIconScaffold,
  switches: switchesIconScaffold,
  'volume-high': volumeHighIconScaffold,
  'volume-low': volumeLowIconScaffold,
  'volume-off': volumeOffIconScaffold,
});

/* -----------------------------------------
   PRISM X CONTROLS VISIBILITY
----------------------------------------- */



function initPrismControls() {
  const player = document.querySelector<HTMLElement>('.media-skin.media-container');


  if (!player) return;

  const media = player.querySelector<HTMLElement>('mux-video, video');
  const settingsMenu = player.querySelector<HTMLElement>('.media-menu-popup');

  let hideTimer: ReturnType<typeof setTimeout> | undefined;
  let pointerInsidePlayer = false;
  let pointerInsideMenu = false;

  const clearHideTimer = () => {
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = undefined;
    }
  };

  const showControls = () => {
    player.classList.add('prism-controls-visible');
    player.classList.remove('prism-controls-hidden');
    player.classList.remove('prism-center-controls-hidden');

  };

  const hideControls = () => {
    player.classList.remove('prism-controls-visible');
    player.classList.add('prism-controls-hidden');
  };

  const resetHideTimer = () => {
    clearHideTimer();

    if (pointerInsideMenu) return;

    hideTimer = setTimeout(() => {
      hideControls();
    }, 2000);
  };

  /* Initial load: show controls */
  showControls();
  // resetHideTimer();

  /* Mouse enters player */
  player.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'touch') return;

    pointerInsidePlayer = true;
    showControls();
    resetHideTimer();
  });

  /* Mouse moves inside player */
  player.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') return;

    pointerInsidePlayer = true;
    showControls();
    resetHideTimer();
  });

  /* Mouse leaves player */
  player.addEventListener('pointerleave', (event) => {
    if (event.pointerType === 'touch') return;

    pointerInsidePlayer = false;

    const nextTarget = event.relatedTarget as Node | null;

    if (settingsMenu && nextTarget && settingsMenu.contains(nextTarget)) {
      pointerInsideMenu = true;
      showControls();
      clearHideTimer();
      return;
    }

    clearHideTimer();

    if (!pointerInsideMenu) {
      hideControls();
    }
  });

  /* Settings dropdown protection */
  if (settingsMenu) {
    settingsMenu.addEventListener('pointerenter', () => {
      pointerInsideMenu = true;
      showControls();
      clearHideTimer();
    });

    settingsMenu.addEventListener('pointerleave', (event) => {
      pointerInsideMenu = false;

      const nextTarget = event.relatedTarget as Node | null;

      if (nextTarget && player.contains(nextTarget)) {
        pointerInsidePlayer = true;
        showControls();
        resetHideTimer();
      } else {
        pointerInsidePlayer = false;
        clearHideTimer();
        hideControls();
      }
    });
  }

  /* Video playing / paused state */
  if (media) {
    media.addEventListener('playing', () => {
      console.log('VIDEO PLAYING EVENT FIRED');
      console.log('MEDIA ELEMENT:', media);
      console.log('PLAYER CLASS:', player.className);
      console.log(
        'CENTER ELEMENT:',
        player.querySelector('.video-controls-center')
      );

      console.log(
        'CENTER COUNT:',
        player.querySelectorAll('.video-controls-center').length
      );

      player.classList.add('prism-is-playing');
      player.classList.add('prism-center-controls-hidden');
    });

    media.addEventListener('play', () => {
      player.classList.add('prism-center-controls-hidden');
    });

    media.addEventListener('pause', () => {
      player.classList.remove('prism-is-playing');
      showControls();
    });

    media.addEventListener('ended', () => {
      player.classList.remove('prism-is-playing');
      showControls();
    });
  }
}

/* Wait for player element */
const startPrismControls = () => {
  const observer = new MutationObserver(() => {
    const player = document.querySelector(
      '.media-skin[data-theme="scaffold"][data-preset="video"]'
    );

    if (player) {
      observer.disconnect();
      initPrismControls();
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  // Check if player already exists
  if (
    document.querySelector(
      '.media-skin[data-theme="scaffold"][data-preset="video"]'
    )
  ) {
    observer.disconnect();
    initPrismControls();
  }
};

startPrismControls();


/* Hide center controls immediately when video starts */

const prismPlayer = document.querySelector<HTMLElement>(
  '.media-skin.media-container'
);

const prismVideo = prismPlayer?.querySelector<HTMLElement>('mux-video, video');

if (prismPlayer && prismVideo) {
  prismVideo.addEventListener('playing', () => {
    prismPlayer.classList.add('prism-center-controls-hidden');
  });

  prismVideo.addEventListener('play', () => {
    prismPlayer.classList.add('prism-center-controls-hidden');
  });
}