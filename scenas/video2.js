class scenaVideo2 extends Phaser.Scene {
  constructor() {
    super({ key: "scenaVideo2" });
  }

  preload() {
    // Cargar la música de fondo
    
    
    this.load.video("video2", "assets/video2/video2.mp4", "loadeddata");
  }

  create() {
    const screenWidth = this.sys.game.config.width;
    const screenHeight = this.sys.game.config.height;

    // Configurar la música de fondo
    this.musicManager = MusicManager.getInstance();
    if (!this.musicManager.isPlaying()) {
      const backgroundMusic = this.sound.add('backgroundMusic');
      this.musicManager.setMusic(backgroundMusic);
      this.musicManager.playMusic();
    }

    // Pausar la música usando el AudioManager
    const audioManager = this.scene.get("AudioManager");
    if (audioManager) {
      audioManager.pauseMusic();
    }

    this.add.rectangle(
      screenWidth / 2,
      screenHeight / 2,
      screenWidth,
      screenHeight,
      0x000000
    );

    const video = this.add.video(screenWidth / 2, screenHeight / 2, "video2");

    const videoElement = video.video;
    videoElement.muted = false;

    video.on("play", () => {
      const videoWidth = videoElement.videoWidth;
      const videoHeight = videoElement.videoHeight;

      if (videoWidth && videoHeight) {
        const videoAspectRatio = videoWidth / videoHeight;
        const screenAspectRatio = screenWidth / screenHeight;

        if (videoAspectRatio > screenAspectRatio) {
          video.setDisplaySize(screenWidth, screenWidth / videoAspectRatio);
        } else {
          video.setDisplaySize(screenHeight * videoAspectRatio, screenHeight);
        }
      }
    });

    video.play();

    // --- Barra de volumen interactiva ---
    const sliderContainer = document.createElement('div');
    sliderContainer.style.position = 'absolute';
    sliderContainer.style.right = '20px';
    sliderContainer.style.top = '50%';
    sliderContainer.style.transform = 'translateY(-50%)';
    sliderContainer.style.zIndex = 1000;
    sliderContainer.style.background = 'rgba(30,30,30,0.85)';
    sliderContainer.style.borderRadius = '16px';
    sliderContainer.style.padding = '20px 15px';
    sliderContainer.style.display = 'flex';
    sliderContainer.style.flexDirection = 'column';
    sliderContainer.style.alignItems = 'center';
    sliderContainer.style.justifyContent = 'space-between'; // Pushes label to bottom
    sliderContainer.style.width = '50px';
    sliderContainer.style.height = '220px'; // Altura ajustada
    sliderContainer.style.boxShadow = '0 4px 16px rgba(0,0,0,0.35)';

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = 0;
    slider.max = 100;
    slider.value = 100; // Start at max volume (top)
    slider.style.webkitAppearance = 'slider-vertical'; // For WebKit browsers
    slider.style.writingMode = 'vertical-lr'; // Standard property for vertical elements
    slider.style.transform = 'rotate(180deg)'; // Invert the visual direction
    slider.style.width = '8px'; // This is the thickness
    slider.style.height = '150px'; // This is the length
    slider.style.accentColor = '#1abc9c';
    slider.title = 'Volumen general';
    sliderContainer.appendChild(slider);

    const valueLabel = document.createElement('span');
    valueLabel.innerText = '100';
    valueLabel.style.fontSize = '1.2em';
    valueLabel.style.color = '#1abc9c';
    valueLabel.style.fontWeight = 'bold';
    sliderContainer.appendChild(valueLabel);

    document.body.appendChild(sliderContainer);

    // Acceso al MusicManager
    let musicManager = null;
    if (window.MusicManager && typeof window.MusicManager.getInstance === 'function') {
      musicManager = window.MusicManager.getInstance();
    } else if (typeof MusicManager !== 'undefined' && typeof MusicManager.getInstance === 'function') {
      musicManager = MusicManager.getInstance();
    }

    // Inicializar volumen
    videoElement.volume = 1;
    if (musicManager && musicManager.music) {
      musicManager.music.setVolume(0.15); // Ambiente bajo desde el inicio
    }

    slider.addEventListener('input', function() {
      const vol = slider.value / 100;
      videoElement.volume = vol;
      videoElement.muted = vol === 0;
      valueLabel.innerText = slider.value;
      if (musicManager && musicManager.music) {
        musicManager.music.setVolume(vol * 0.15);
      }
    });

    video.on("complete", () => {
      // Reanudar la música antes de cambiar de escena
      if (audioManager) {
        audioManager.resumeMusic();
      }
      if (sliderContainer && sliderContainer.parentNode) {
        sliderContainer.parentNode.removeChild(sliderContainer);
      }
      this.scene.start("Rompecabezas");
    });
  }
}

window.scenaVideo2 = scenaVideo2;
