
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


/* -----------------------------------------
   PRISM X ICON REGISTRATION
----------------------------------------- */

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
   PRISM X TYPES
----------------------------------------- */

type PrismMuxElement = HTMLElement & {
  media?: HTMLMediaElement;
};


/* -----------------------------------------
   PRISM X CONTROLS
----------------------------------------- */

function initPrismControls() {

  const player = document.querySelector<HTMLElement>(
    '.media-skin[data-theme="scaffold"][data-preset="video"]'
  );

  if (!player || player.dataset.prismControlsReady) return;

  player.dataset.prismControlsReady = 'true';

  const media = player.querySelector<HTMLElement>(
    'mux-video, video'
  );

  const settingsMenu = player.querySelector<HTMLElement>(
    '.media-menu-popup'
  );

  let hideTimer: ReturnType<typeof setTimeout> | undefined;

  let pointerInsidePlayer = false;
  let pointerInsideMenu = false;


  /* -----------------------------------------
     SHOW CONTROLS
  ----------------------------------------- */

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


  /* -----------------------------------------
     INITIAL CONTROLS
  ----------------------------------------- */

  showControls();


  /* -----------------------------------------
     POINTER ENTER
  ----------------------------------------- */

  player.addEventListener('pointerenter', (event) => {

    if (event.pointerType === 'touch') return;

    pointerInsidePlayer = true;

    showControls();

    resetHideTimer();

  });


  /* -----------------------------------------
     POINTER MOVE
  ----------------------------------------- */

  player.addEventListener('pointermove', (event) => {

    if (event.pointerType === 'touch') return;

    pointerInsidePlayer = true;

    showControls();

    resetHideTimer();

  });


  /* -----------------------------------------
     POINTER LEAVE
  ----------------------------------------- */

  player.addEventListener('pointerleave', (event) => {

    if (event.pointerType === 'touch') return;

    pointerInsidePlayer = false;

    const nextTarget = event.relatedTarget as Node | null;

    if (
      settingsMenu &&
      nextTarget &&
      settingsMenu.contains(nextTarget)
    ) {

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


  /* -----------------------------------------
     SETTINGS MENU PROTECTION
  ----------------------------------------- */

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


  /* -----------------------------------------
     VIDEO PLAYING / PAUSED
  ----------------------------------------- */

  if (media) {

    media.addEventListener('playing', () => {

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


  /* -----------------------------------------
     PRISM X KEYBOARD ACCESSIBILITY
  ----------------------------------------- */

  player.setAttribute('tabindex', '0');


  // Get the actual Mux media element dynamically.
  // It may not be ready immediately when the player loads.

  const getMedia = (): HTMLMediaElement | null => {

    const mux = player.querySelector(
      'mux-video'
    ) as PrismMuxElement | null;

    return mux?.media ?? null;

  };


  // Attempt initial focus without scrolling.
  // Browsers may restrict automatic focus.

  requestAnimationFrame(() => {

    if (document.activeElement === document.body) {

      player.focus({
        preventScroll: true
      });

    }

  });


  /* -----------------------------------------
     KEYBOARD SHORTCUTS
  ----------------------------------------- */

  document.addEventListener('keydown', (event) => {

    if (!player.isConnected) return;


    const target = event.target as HTMLElement;


    // Don't interfere with typing.

    if (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target.isContentEditable
    ) {

      return;

    }


    // Don't interfere with browser shortcuts.

    if (
      event.ctrlKey ||
      event.altKey ||
      event.metaKey
    ) {

      return;

    }


    const active = document.activeElement;


    // Only work when the page or player has focus.

    if (
      active !== document.body &&
      active !== document.documentElement &&
      active !== player &&
      !player.contains(active)
    ) {

      return;

    }


    const video = getMedia();

    if (!video) return;


    switch (event.code) {

      /* SPACE: PLAY / PAUSE */

      case 'Space': {

        // Preserve native button behaviour.

        if (
          target !== player &&
          target.closest('button')
        ) {

          return;

        }

        event.preventDefault();

        if (video.paused) {

          video.play().catch((error) => {

            console.warn(
              'PRISM X playback error:',
              error
            );

          });

        } else {

          video.pause();

        }

        break;

      }


      /* LEFT ARROW: BACKWARD 10 SECONDS */

      case 'ArrowLeft': {

        // Let sliders and buttons use their own keyboard controls.

        if (
          target !== player &&
          target.closest(
            'button, [role="slider"], input'
          )
        ) {

          return;

        }

        event.preventDefault();

        video.currentTime = Math.max(
          0,
          video.currentTime - 10
        );

        break;

      }


      /* RIGHT ARROW: FORWARD 10 SECONDS */

      case 'ArrowRight': {

        if (
          target !== player &&
          target.closest(
            'button, [role="slider"], input'
          )
        ) {

          return;

        }

        event.preventDefault();

        video.currentTime = Math.min(
          Number.isFinite(video.duration)
            ? video.duration
            : Infinity,
          video.currentTime + 10
        );

        break;

      }

    }

  });


  console.log('PRISM X controls and keyboard initialized');

}


/* -----------------------------------------
   WAIT FOR PLAYER
----------------------------------------- */

const startPrismControls = () => {

  const findPlayer = () => {

    return document.querySelector(
      '.media-skin[data-theme="scaffold"][data-preset="video"]'
    );

  };


  const observer = new MutationObserver(() => {

    if (findPlayer()) {

      observer.disconnect();

      initPrismControls();

    }

  });


  observer.observe(document.documentElement, {

    childList: true,

    subtree: true

  });


  // Player may already exist.

  if (findPlayer()) {

    observer.disconnect();

    initPrismControls();

  }

};


startPrismControls();

