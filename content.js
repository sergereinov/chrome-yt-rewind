/**
 * YouTube Player Rewind Extension
 * Adds 10s rewind/forward buttons to YouTube player
 * 
 * @author Generated by DeepSeek
 * @version 1.2
 * @license MIT
 */

// Wait for YouTube player to load
function waitForPlayer() {
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        const player = document.querySelector('video.html5-main-video, video');
        if (player) {
          clearInterval(checkInterval);
          resolve(player);
        }
      }, 500);
    });
  }
  
  // Create control buttons with improved visibility
  function createControls(playerContainer) {
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'yt-rewind-controls';
    controlsContainer.style.display = 'flex';
    controlsContainer.style.gap = '10px';
    controlsContainer.style.position = 'absolute';
    controlsContainer.style.bottom = '70px';
    controlsContainer.style.left = '20px';
    controlsContainer.style.zIndex = '9999';
    controlsContainer.style.transition = 'opacity 0.5s ease';
    controlsContainer.style.opacity = '0';
    controlsContainer.style.pointerEvents = 'auto';
  
    // Rewind 10s button
    const rewindButton = document.createElement('button');
    rewindButton.innerHTML = '« 10s';
    rewindButton.className = 'yt-rewind-btn';
    rewindButton.style.padding = '8px 16px';
    rewindButton.style.cursor = 'pointer';
    rewindButton.style.backgroundColor = 'rgba(30, 30, 30, 0.9)';
    rewindButton.style.color = 'white';
    rewindButton.style.border = '2px solid white';
    rewindButton.style.borderRadius = '6px';
    rewindButton.style.fontSize = '14px';
    rewindButton.style.fontWeight = 'bold';
    rewindButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
    rewindButton.style.textShadow = '0 1px 1px #000';
    
    // Forward 10s button
    const forwardButton = document.createElement('button');
    forwardButton.innerHTML = '10s »';
    forwardButton.className = 'yt-forward-btn';
    forwardButton.style.padding = '8px 16px';
    forwardButton.style.cursor = 'pointer';
    forwardButton.style.backgroundColor = 'rgba(30, 30, 30, 0.9)';
    forwardButton.style.color = 'white';
    forwardButton.style.border = '2px solid white';
    forwardButton.style.borderRadius = '6px';
    forwardButton.style.fontSize = '14px';
    forwardButton.style.fontWeight = 'bold';
    forwardButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
    forwardButton.style.textShadow = '0 1px 1px #000';
  
    controlsContainer.appendChild(rewindButton);
    controlsContainer.appendChild(forwardButton);
    
    return { controlsContainer, rewindButton, forwardButton };
  }
  
  // Main initialization function
  async function init() {
    try {
      const player = await waitForPlayer();
      const playerContainer = player.closest('.html5-video-player, .ytd-player');
      
      if (!playerContainer) return;
      
      const { controlsContainer, rewindButton, forwardButton } = createControls(playerContainer);
      playerContainer.appendChild(controlsContainer);
      playerContainer.style.position = 'relative';
      
      // Button click handlers
      rewindButton.addEventListener('click', () => {
        player.currentTime = Math.max(0, player.currentTime - 10);
      });
      
      forwardButton.addEventListener('click', () => {
        player.currentTime = Math.min(player.duration, player.currentTime + 10);
      });
  
      // Hide/show logic
      let hideTimeout;
      const hideDelay = 1000; // 1 second
      let isMouseOverControls = false;
  
      function showControls() {
        controlsContainer.style.opacity = '1';
        resetHideTimeout();
      }
  
      function hideControls() {
        if (!isMouseOverControls) {
          controlsContainer.style.opacity = '0';
        }
      }
  
      function resetHideTimeout() {
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(hideControls, hideDelay);
      }
  
      // Mouse enter/leave handlers for controls
      controlsContainer.addEventListener('mouseenter', () => {
        isMouseOverControls = true;
        showControls();
      });
  
      controlsContainer.addEventListener('mouseleave', () => {
        isMouseOverControls = false;
        resetHideTimeout();
      });
  
      // Mouse movement handlers for player area
      playerContainer.addEventListener('mouseenter', () => {
        showControls();
      });
  
      playerContainer.addEventListener('mousemove', () => {
        showControls();
      });
  
      playerContainer.addEventListener('mouseleave', () => {
        if (!isMouseOverControls) {
          resetHideTimeout();
        }
      });
  
      // Keyboard shortcuts
      document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        if (e.key === 'ArrowLeft') {
          player.currentTime = Math.max(0, player.currentTime - 10);
        } else if (e.key === 'ArrowRight') {
          player.currentTime = Math.min(player.duration, player.currentTime + 10);
        }
      });
      
    } catch (error) {
      console.error('YouTube Rewind Extension error:', error);
    }
  }
  
  // Initialize the extension
  init();
  