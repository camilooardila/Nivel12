class ScenaPregunta1 extends Phaser.Scene {
    constructor() {
        super({ key: 'ScenaPregunta1' });
        this.gameState = 'showing_code';
        this.selectedOption = null;
        this.codeLines = [];
        this.neuralNodes = [];
        this.glitchEffect = null;
        this.electricFlow = [];
    }

    preload() {
        // Cargar la música de fondo
        this.load.audio('backgroundMusic', 'assets/scenaPrincipal/musica.mp3');
        
        // Cargar assets de audio con archivos de respaldo
        this.load.audio('click', ['assets/sounds/click.wav', 'assets/sounds/click_backup.wav']);
        this.load.audio('success', ['assets/sounds/success.wav']);
        this.load.audio('error', ['assets/sounds/error.wav']);
        
        // Manejo de errores de carga de audio
        this.load.on('loaderror', (file) => {
            console.warn(`Error cargando archivo de audio: ${file.key}`);
        });
        
        // Configurar audio context para mejor compatibilidad
        this.load.on('complete', () => {
            if (this.sound.context && this.sound.context.state === 'suspended') {
                this.sound.context.resume();
            }
        });
    }

    create() {
        // Configurar la música de fondo
        this.musicManager = MusicManager.getInstance();
        if (!this.musicManager.isPlaying()) {
            const backgroundMusic = this.sound.add('backgroundMusic');
            this.musicManager.setMusic(backgroundMusic);
            this.musicManager.playMusic();
        }
        
        // Configurar el contexto de audio
        if (this.sound.context && this.sound.context.state === 'suspended') {
            this.sound.context.resume();
        }

        // Configuración de dimensiones
        this.centerX = this.cameras.main.width / 2;
        this.centerY = this.cameras.main.height / 2;

        // Crear fondo futurista
        this.createFuturisticBackground();
        
        // Crear título principal
        this.createTitle();
        
        // Crear consola de simulación
        this.createConsole();
        
        // Crear editor de código
        this.createCodeEditor();
        
        // Crear pregunta y opciones
        this.createQuestion();
        
        // Crear red neuronal visual
        this.createNeuralNetwork();
        
        // Efectos de sonido
        this.createSounds();
        
        // Iniciar animaciones de fondo
        this.startBackgroundAnimations();
    }

    createFuturisticBackground() {
        // Fondo base con gradiente
        const bg = this.add.rectangle(this.centerX, this.centerY, this.cameras.main.width, this.cameras.main.height, 0x0a0a0a);
        
        // Crear partículas de fondo flotantes
        this.createFloatingParticles();
        
        // Líneas de conexión animadas
        this.createAnimatedConnections();
        
        // Efectos de luz ambiental
        this.createAmbientLighting();

        // Crear líneas de la cuadrícula con animación
        const gridSpacing = 50;
        for (let x = 0; x < this.cameras.main.width; x += gridSpacing) {
            const line = this.add.line(0, 0, x, 0, x, this.cameras.main.height, 0x1a1a2e, 0.3);
            
            // Animación de pulso para las líneas verticales
            this.tweens.add({
                targets: line,
                alpha: { from: 0.1, to: 0.4 },
                duration: 3000 + Phaser.Math.Between(0, 2000),
                repeat: -1,
                yoyo: true,
                delay: Phaser.Math.Between(0, 1000)
            });
        }
        
        for (let y = 0; y < this.cameras.main.height; y += gridSpacing) {
            const line = this.add.line(0, 0, 0, y, this.cameras.main.width, y, 0x1a1a2e, 0.3);
            
            // Animación de pulso para las líneas horizontales
            this.tweens.add({
                targets: line,
                alpha: { from: 0.1, to: 0.4 },
                duration: 3000 + Phaser.Math.Between(0, 2000),
                repeat: -1,
                yoyo: true,
                delay: Phaser.Math.Between(0, 1000)
            });
        }
    }
    
    createFloatingParticles() {
        // Crear partículas flotantes de diferentes tamaños y colores
        const colors = [0x00ff00, 0x0099ff, 0xff6600, 0xff0066, 0x9900ff];
        
        for (let i = 0; i < 20; i++) {
            const color = colors[Phaser.Math.Between(0, colors.length - 1)];
            const size = Phaser.Math.Between(1, 3);
            
            const particle = this.add.circle(
                Phaser.Math.Between(0, this.cameras.main.width),
                Phaser.Math.Between(0, this.cameras.main.height),
                size,
                color,
                0.6
            );
            
            // Movimiento flotante aleatorio
            this.tweens.add({
                targets: particle,
                x: particle.x + Phaser.Math.Between(-100, 100),
                y: particle.y + Phaser.Math.Between(-100, 100),
                alpha: { from: 0.6, to: 0.2 },
                duration: 5000 + Phaser.Math.Between(0, 3000),
                repeat: -1,
                yoyo: true,
                delay: i * 100
            });
            
            // Rotación y escala
            this.tweens.add({
                targets: particle,
                scale: { from: 1, to: 1.5 },
                duration: 3000 + Phaser.Math.Between(0, 2000),
                repeat: -1,
                yoyo: true,
                delay: i * 150
            });
        }
    }
    
    createAnimatedConnections() {
        // Crear líneas de conexión que aparecen y desaparecen
        for (let i = 0; i < 10; i++) {
            const startX = Phaser.Math.Between(0, this.cameras.main.width);
            const startY = Phaser.Math.Between(0, this.cameras.main.height);
            const endX = Phaser.Math.Between(0, this.cameras.main.width);
            const endY = Phaser.Math.Between(0, this.cameras.main.height);
            
            const connection = this.add.line(0, 0, startX, startY, endX, endY, 0x00ffff, 0.2);
            connection.setLineWidth(1);
            
            // Animación de aparición y desaparición
            this.tweens.add({
                targets: connection,
                alpha: { from: 0, to: 0.5, to: 0 },
                duration: 4000 + Phaser.Math.Between(0, 2000),
                repeat: -1,
                delay: i * 400
            });
        }
    }
    
    createAmbientLighting() {
        // Crear efectos de luz ambiental
        const lightColors = [0x00ff00, 0x0099ff, 0xff6600];
        
        for (let i = 0; i < 5; i++) {
            const color = lightColors[i % lightColors.length];
            const light = this.add.circle(
                Phaser.Math.Between(100, this.cameras.main.width - 100),
                Phaser.Math.Between(100, this.cameras.main.height - 100),
                Phaser.Math.Between(50, 100),
                color,
                0.1
            );
            
            // Efecto de respiración
            this.tweens.add({
                targets: light,
                scale: { from: 1, to: 1.3 },
                alpha: { from: 0.1, to: 0.3 },
                duration: 3000 + Phaser.Math.Between(0, 2000),
                repeat: -1,
                yoyo: true,
                delay: i * 600
            });
        }
    }

    createTitle() {
        // Título principal con efectos
        const titleText = this.add.text(this.centerX, 60, 'CORRIGIENDO LA RED NEURONAL', {
            fontSize: '32px',
            fontFamily: 'Courier New, monospace',
            fill: '#00ffff',
            stroke: '#ffffff',
            strokeThickness: 2,
            shadow: {
                offsetX: 0,
                offsetY: 0,
                color: '#00ffff',
                blur: 10,
                stroke: true,
                fill: true
            }
        }).setOrigin(0.5);

        // Animación de entrada del título
        titleText.setScale(0);
        this.tweens.add({
            targets: titleText,
            scale: 1,
            duration: 1000,
            ease: 'Back.easeOut'
        });

        // Efecto de parpadeo sutil
        this.tweens.add({
            targets: titleText,
            alpha: { from: 1, to: 0.8 },
            duration: 2000,
            repeat: -1,
            yoyo: true,
            ease: 'Sine.easeInOut'
        });

        // Subtítulo
        const subtitle = this.add.text(this.centerX, 100, 'CONSOLA DE SIMULACIÓN DE IA', {
            fontSize: '16px',
            fontFamily: 'Courier New, monospace',
            fill: '#ffffff',
            alpha: 0.8
        }).setOrigin(0.5);

        subtitle.setAlpha(0);
        this.tweens.add({
            targets: subtitle,
            alpha: 0.8,
            duration: 1500,
            delay: 500,
            ease: 'Power2.easeOut'
        });
    }

    createConsole() {
        // Marco de la consola
        const consoleFrame = this.add.rectangle(this.centerX, this.centerY + 20, 900, 500, 0x1a1a2e, 0.9);
        consoleFrame.setStrokeStyle(2, 0x00ffff);
        
        // Barra superior de la consola
        const topBar = this.add.rectangle(this.centerX, this.centerY - 230, 900, 30, 0x00ffff, 0.8);
        
        const consoleTitle = this.add.text(this.centerX - 430, this.centerY - 235, '● NEURAL_NETWORK_DEBUGGER.exe', {
            fontSize: '14px',
            fontFamily: 'Courier New, monospace',
            fill: '#000000'
        });

        // Indicadores de estado
        this.statusIndicator = this.add.circle(this.centerX + 400, this.centerY - 230, 8, 0xff0000);
        this.tweens.add({
            targets: this.statusIndicator,
            alpha: { from: 1, to: 0.3 },
            duration: 1000,
            repeat: -1,
            yoyo: true
        });
    }

    createCodeEditor() {
        // Posición más hacia la derecha (35% del ancho de pantalla)
        const leftX = this.cameras.main.width * 0.35;
        const editorWidth = this.cameras.main.width * 0.35;
        const editorHeight = 300; // Misma altura que el área de preguntas
        
        // Contenedor principal del editor - alineado con el quiz (centerY - 50)
        const editorContainer = this.add.container(leftX, this.centerY - 50);
        
        // Fondo del editor con diseño moderno
        const editorBg = this.add.rectangle(0, 0, editorWidth, editorHeight, 0x1e1e1e, 0.95);
        editorBg.setStrokeStyle(3, 0x00ff00);
        
        // Sombra del editor
        const editorShadow = this.add.rectangle(5, 5, editorWidth, editorHeight, 0x0a0a0a, 0.4);
        
        // Barra superior del editor
        const headerBg = this.add.rectangle(0, -editorHeight/2 + 30, editorWidth, 60, 0x2d2d2d, 1);
        headerBg.setStrokeStyle(2, 0x00ff00);
        
        // Título del editor con icono
        const editorTitle = this.add.text(0, -editorHeight/2 + 30, '⚡ CÓDIGO NEURONAL', {
            fontSize: '18px',
            fontFamily: 'Courier New, monospace',
            fill: '#00ff00',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Código con error
        const codeText = `float peso1 = 0.5;
float peso2 = 0.5;
float sesgo = 1.0;

void setup() {
  Serial.begin(9600);
}
void loop() {
  float entrada1 = analogRead(A0);
  float entrada2 = analogRead(A1);
  float salida = (entrada1 * peso1) + 
                 (entrada2 * peso2) + sesgo;
  if (salida > 500) {
    Serial.println("Decisión: Aceptar.");
  }
}`;

        this.codeDisplay = this.add.text(0, -editorHeight/2 + 80, codeText, {
            fontSize: '11px',
            fontFamily: 'Courier New, monospace',
            fill: '#00ff00',
            lineSpacing: 1,
            wordWrap: { width: editorWidth - 40 }
        }).setOrigin(0.5, 0);

        // Resaltar líneas problemáticas
        this.highlightErrorLines();

        // Cursor parpadeante mejorado con efectos
        this.cursor = this.add.rectangle(0, -editorHeight/2 + 300, 2, 15, 0x00ff00);
        this.tweens.add({
            targets: this.cursor,
            alpha: { from: 1, to: 0 },
            duration: 500,
            repeat: -1,
            yoyo: true
        });
        
        // Efecto de escritura de código (simulación)
        this.createTypingEffect();
        
        // Partículas flotantes alrededor del editor
        this.createCodeParticles(editorContainer);
        
        // Agregar elementos al contenedor
        editorContainer.add([editorShadow, editorBg, headerBg, editorTitle, this.codeDisplay, this.cursor]);
        
        // ANIMACIONES DE ENTRADA ESPECTACULARES
        // Inicializar el contenedor fuera de pantalla
        editorContainer.setX(-editorWidth);
        editorContainer.setAlpha(0);
        editorContainer.setScale(0.8);
        
        // Animación de deslizamiento desde la izquierda
        this.tweens.add({
            targets: editorContainer,
            x: leftX,
            alpha: 1,
            scale: 1,
            duration: 1200,
            ease: 'Back.easeOut',
            delay: 200
        });
        
        // Efecto de brillo en el borde
        this.tweens.add({
            targets: editorBg,
            strokeAlpha: { from: 0.3, to: 1 },
            duration: 800,
            repeat: 3,
            yoyo: true,
            delay: 1000
        });
        
        // Animación del título con rebote
        editorTitle.setScale(0);
        this.tweens.add({
            targets: editorTitle,
            scale: 1,
            duration: 600,
            ease: 'Bounce.easeOut',
            delay: 1400
        });
        
        // Efecto de aparición gradual del código
        this.codeDisplay.setAlpha(0);
        this.tweens.add({
            targets: this.codeDisplay,
            alpha: 1,
            duration: 1000,
            delay: 1600
        });
    }
    
    createTypingEffect() {
        // Crear efecto de líneas de código que aparecen gradualmente
        const typingIndicator = this.add.text(0, -this.cameras.main.height * 0.35 + 350, '█', {
            fontSize: '12px',
            fontFamily: 'Courier New, monospace',
            fill: '#00ff00'
        }).setOrigin(0.5);
        
        // Animación del indicador de escritura
        this.tweens.add({
            targets: typingIndicator,
            alpha: { from: 1, to: 0 },
            duration: 400,
            repeat: -1,
            yoyo: true,
            delay: 2000
        });
        
        // Hacer que desaparezca después de un tiempo
        this.time.delayedCall(5000, () => {
            typingIndicator.destroy();
        });
    }
    
    createCodeParticles(container) {
        // Crear partículas flotantes con símbolos de código
        const symbols = ['{ }', '< >', '[ ]', '( )', '++', '--', '==', '!=', '&&', '||'];
        
        for (let i = 0; i < 8; i++) {
            const symbol = symbols[Phaser.Math.Between(0, symbols.length - 1)];
            const particle = this.add.text(
                Phaser.Math.Between(-200, 200),
                Phaser.Math.Between(-150, 150),
                symbol,
                {
                    fontSize: '10px',
                    fontFamily: 'Courier New, monospace',
                    fill: '#00ff00',
                    alpha: 0.3
                }
            ).setOrigin(0.5);
            
            // Animación flotante
            this.tweens.add({
                targets: particle,
                y: particle.y - 20,
                alpha: { from: 0.3, to: 0.1 },
                duration: 3000 + Phaser.Math.Between(0, 2000),
                repeat: -1,
                yoyo: true,
                delay: i * 200
            });
            
            // Rotación sutil
            this.tweens.add({
                targets: particle,
                rotation: Phaser.Math.PI2,
                duration: 8000 + Phaser.Math.Between(0, 4000),
                repeat: -1,
                delay: i * 300
            });
            
            container.add(particle);
        }
    }

    highlightErrorLines() {
        // Resaltar líneas 10 y 11 (las que tienen el error)
        const errorHighlight1 = this.add.rectangle(this.centerX - 200, this.centerY - 60, 450, 15, 0xff0000, 0.2);
        const errorHighlight2 = this.add.rectangle(this.centerX - 200, this.centerY - 45, 450, 15, 0xff0000, 0.2);
        
        this.tweens.add({
            targets: [errorHighlight1, errorHighlight2],
            alpha: { from: 0.2, to: 0.05 },
            duration: 1000,
            repeat: -1,
            yoyo: true
        });
    }

    createQuestion() {
        // Área de la pregunta - posición un poco más a la izquierda (75% del ancho de pantalla)
        const rightX = this.cameras.main.width * 0.75;
        const questionBg = this.add.rectangle(rightX, this.centerY - 50, 360, 300, 0x2a1810, 0.95);
        questionBg.setStrokeStyle(1, 0xff6600);

       const questionText = this.add.text(rightX, this.centerY - 170, 
    '¿Cuál es el problema\nen este código?', {
        fontSize: '20px',
        fontFamily: 'Courier New, monospace',
        fill: '#ffaa00',
        align: 'center',
        lineSpacing: 5
    }
).setOrigin(0.5);


        // Opciones de respuesta
        const options = [
            'A) Falta normalización de valores de entrada',
            'B) No hay estructura de aprendizaje',
            'C) Se necesita int en lugar de float',
            'D) Usar digitalRead() en lugar de analogRead()'
        ];

        // Colores para cada opción
        const optionColors = [
            { bg: 0x2a4d3a, border: 0x4caf50, text: '#ffffff', hover: 0x388e3c },
            { bg: 0x1a237e, border: 0x3f51b5, text: '#ffffff', hover: 0x303f9f },
            { bg: 0x4a148c, border: 0x9c27b0, text: '#ffffff', hover: 0x7b1fa2 },
            { bg: 0xbf360c, border: 0xff5722, text: '#ffffff', hover: 0xe64a19 }
        ];

        this.optionButtons = [];
        options.forEach((option, index) => {
            const y = this.centerY - 100 + (index * 45); // Reducido el espaciado entre opciones
            const colors = optionColors[index];
            const rightX = this.cameras.main.width * 0.75;
            
            // Botón de opción con colores personalizados - contenedores más reducidos
            const button = this.add.rectangle(rightX, y, 320, 32, colors.bg, 0.8);
            button.setStrokeStyle(2, colors.border);
            button.setInteractive();
            
            // Texto de la opción - centrado dentro del contenedor
            const optionText = this.add.text(rightX, y, option, {
                fontSize: '11px', // Reducido el tamaño de fuente
                fontFamily: 'Courier New, monospace',
                fill: colors.text,
                wordWrap: { width: 300 }, // Ancho ajustado para el contenedor
                align: 'center'
            }).setOrigin(0.5);

            // Efectos hover mejorados
            button.on('pointerover', () => {
                button.setFillStyle(colors.hover);
                button.setStrokeStyle(3, 0x00ffff);
                
                // Animación de escala
                this.tweens.add({
                    targets: button,
                    scaleX: 1.05,
                    scaleY: 1.05,
                    duration: 150,
                    ease: 'Power2.easeOut'
                });
            });

            button.on('pointerout', () => {
                if (this.selectedOption !== index) {
                    button.setFillStyle(colors.bg);
                    button.setStrokeStyle(2, colors.border);
                    
                    // Volver al tamaño normal
                    this.tweens.add({
                        targets: button,
                        scaleX: 1,
                        scaleY: 1,
                        duration: 150,
                        ease: 'Power2.easeOut'
                    });
                }
            });

            // Click handler con animación
            button.on('pointerdown', () => {
                // Efecto de click
                this.tweens.add({
                    targets: button,
                    scaleX: { from: 1.05, to: 0.95, to: 1.02 },
                    scaleY: { from: 1.05, to: 0.95, to: 1.02 },
                    duration: 200,
                    ease: 'Power2.easeOut'
                });
                
                this.selectOption(index, button, optionText, colors);
            });

            this.optionButtons.push({ button, text: optionText, colors });
        });

        // Botón de confirmar
        this.confirmButton = this.add.rectangle(this.centerX + 200, this.centerY + 120, 200, 40, 0x00aa00, 0.8);
        this.confirmButton.setStrokeStyle(2, 0x00ff00);
        this.confirmButton.setInteractive();
        this.confirmButton.setAlpha(0.5);

        const confirmText = this.add.text(this.centerX + 200, this.centerY + 120, 'CONFIRMAR', {
            fontSize: '16px',
            fontFamily: 'Courier New, monospace',
            fill: '#ffffff'
        }).setOrigin(0.5);

        this.confirmButton.on('pointerdown', () => {
            if (this.selectedOption !== null) {
                this.checkAnswer();
            }
        });
    }

    createNeuralNetwork() {
        // Red neuronal visual en la parte inferior
        const networkY = this.centerY + 200;
        
        // Nodos de entrada
        for (let i = 0; i < 3; i++) {
            const node = this.add.circle(this.centerX - 200 + (i * 100), networkY, 15, 0x666666);
            node.setStrokeStyle(2, 0x00ffff);
            this.neuralNodes.push(node);
        }

        // Nodos ocultos
        for (let i = 0; i < 2; i++) {
            const node = this.add.circle(this.centerX - 50 + (i * 100), networkY, 15, 0x666666);
            node.setStrokeStyle(2, 0x00ffff);
            this.neuralNodes.push(node);
        }

        // Nodo de salida
        const outputNode = this.add.circle(this.centerX + 200, networkY, 15, 0x666666);
        outputNode.setStrokeStyle(2, 0x00ffff);
        this.neuralNodes.push(outputNode);

        // Conexiones entre nodos
        this.createNeuralConnections(networkY);
    }

    createNeuralConnections(networkY) {
        const graphics = this.add.graphics();
        graphics.lineStyle(2, 0x444444, 0.6);

        // Conexiones de entrada a oculta
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 2; j++) {
                graphics.moveTo(this.centerX - 200 + (i * 100), networkY);
                graphics.lineTo(this.centerX - 50 + (j * 100), networkY);
            }
        }

        // Conexiones de oculta a salida
        for (let i = 0; i < 2; i++) {
            graphics.moveTo(this.centerX - 50 + (i * 100), networkY);
            graphics.lineTo(this.centerX + 200, networkY);
        }

        graphics.strokePath();
        this.networkConnections = graphics;
    }

    createHoverParticles(container, color) {
        // Crear pequeñas partículas que aparecen al hacer hover
        for (let i = 0; i < 5; i++) {
            const particle = this.add.circle(
                Phaser.Math.Between(-100, 100),
                Phaser.Math.Between(-20, 20),
                Phaser.Math.Between(2, 4),
                color,
                0.6
            );
            
            container.add(particle);
            
            // Animación de las partículas
            this.tweens.add({
                targets: particle,
                y: particle.y - 30,
                alpha: 0,
                scale: 0,
                duration: 800,
                ease: 'Power2.easeOut',
                onComplete: () => {
                    particle.destroy();
                }
            });
        }
    }
    
    createClickWave(container, color) {
        // Crear efecto de onda al hacer click
        const wave = this.add.circle(0, 0, 5, color, 0.3);
        wave.setStrokeStyle(2, color, 0.8);
        
        container.add(wave);
        
        // Animación de la onda expansiva
        this.tweens.add({
            targets: wave,
            radius: 80,
            alpha: 0,
            strokeAlpha: 0,
            duration: 600,
            ease: 'Power2.easeOut',
            onComplete: () => {
                wave.destroy();
            }
        });
    }

    createSounds() {
        // Crear sonidos con verificación de existencia
        try {
            this.clickSound = this.sound.add('click', { volume: 0.5 });
        } catch (e) {
            console.warn('No se pudo cargar el sonido click:', e);
            this.clickSound = null;
        }
        
        try {
            this.successSound = this.sound.add('success', { volume: 0.7 });
        } catch (e) {
            console.warn('No se pudo cargar el sonido success:', e);
            this.successSound = null;
        }
        
        try {
            this.errorSound = this.sound.add('error', { volume: 0.7 });
        } catch (e) {
            console.warn('No se pudo cargar el sonido error:', e);
            this.errorSound = null;
        }
    }

    startBackgroundAnimations() {
        // Animación de los nodos neurales
        this.neuralNodes.forEach((node, index) => {
            this.tweens.add({
                targets: node,
                alpha: { from: 0.6, to: 1 },
                duration: 1500 + (index * 200),
                repeat: -1,
                yoyo: true,
                ease: 'Sine.easeInOut'
            });
        });
    }

    selectOption(index, button, text, colors) {
        // Resetear opciones anteriores
        this.optionButtons.forEach((opt, i) => {
            opt.button.setFillStyle(opt.colors.bg);
            opt.button.setStrokeStyle(2, opt.colors.border);
            opt.text.setFill(opt.colors.text);
            
            // Resetear escala
            this.tweens.add({
                targets: opt.button,
                scaleX: 1,
                scaleY: 1,
                duration: 200,
                ease: 'Power2.easeOut'
            });
        });

        // Seleccionar nueva opción con efectos especiales
        button.setFillStyle(0x00aa00);
        button.setStrokeStyle(3, 0x00ffff);
        text.setFill('#00ffff');
        
        // Animación de selección
        this.tweens.add({
            targets: button,
            scaleX: 1.1,
            scaleY: 1.1,
            duration: 300,
            ease: 'Back.easeOut'
        });
        
        // Efecto de pulso
        this.tweens.add({
            targets: button,
            alpha: { from: 0.8, to: 1 },
            duration: 200,
            repeat: 2,
            yoyo: true
        });
        
        this.selectedOption = index;
        this.confirmButton.setAlpha(1);
        
        // Sonido de click
        if (this.clickSound) {
            this.clickSound.play();
        }
    }

    checkAnswer() {
        if (this.selectedOption === 0) { // Respuesta correcta (A)
            this.showCorrectAnswer();
        } else {
            this.showIncorrectAnswer();
        }
    }

    showCorrectAnswer() {
        // Animación espectacular de acierto
        this.createSuccessAnimation();
        this.createCelebrationParticles();
        this.createSuccessWave();
        
        // Cambiar indicador de estado a verde con animación
        this.tweens.add({
            targets: this.statusIndicator,
            scaleX: 1.5,
            scaleY: 1.5,
            duration: 300,
            ease: 'Back.easeOut',
            onComplete: () => {
                this.statusIndicator.setFillStyle(0x00ff00);
                this.tweens.add({
                    targets: this.statusIndicator,
                    scaleX: 1,
                    scaleY: 1,
                    duration: 200,
                    ease: 'Power2.easeOut'
                });
            }
        });
        
        // Efecto de brillo en toda la pantalla
        this.createScreenFlash(0x00ff00, 0.3);
        
        // Sonido de éxito
        if (this.successSound) {
            this.successSound.play();
        }

        // Mostrar código corregido después de la animación
        this.time.delayedCall(1000, () => {
            this.showCorrectedCode();
        });
        
        // Activar red neuronal
        this.time.delayedCall(1500, () => {
            this.activateNeuralNetwork();
        });
        
        // Mensaje de éxito
        this.time.delayedCall(2000, () => {
            this.showSuccessMessage();
        });
    }

    createSuccessAnimation() {
        // Crear partículas de celebración
        const particles = [];
        for (let i = 0; i < 20; i++) {
            const particle = this.add.circle(
                this.centerX + (Math.random() - 0.5) * 200,
                this.centerY + (Math.random() - 0.5) * 200,
                Math.random() * 8 + 4,
                [0x00ff00, 0xffff00, 0x00ffff][Math.floor(Math.random() * 3)],
                0.8
            );
            particles.push(particle);
            
            // Animación de explosión
            this.tweens.add({
                targets: particle,
                x: particle.x + (Math.random() - 0.5) * 400,
                y: particle.y + (Math.random() - 0.5) * 400,
                alpha: 0,
                scale: { from: 0.2, to: 1.5 },
                duration: 1500,
                ease: 'Power2.easeOut',
                onComplete: () => {
                    particle.destroy();
                }
            });
        }
        
        // Crear ondas de energía
        for (let i = 0; i < 3; i++) {
            const wave = this.add.circle(this.centerX, this.centerY, 10, 0x00ff00, 0.3);
            wave.setStrokeStyle(3, 0x00ffff);
            
            this.tweens.add({
                targets: wave,
                scale: 8,
                alpha: 0,
                duration: 1000,
                delay: i * 200,
                ease: 'Power2.easeOut',
                onComplete: () => {
                    wave.destroy();
                }
            });
        }
        
        // Texto de felicitaciones flotante
        const congratsText = this.add.text(this.centerX, this.centerY - 100, '¡EXCELENTE!', {
            fontSize: '48px',
            fontFamily: 'Courier New, monospace',
            fill: '#00ff00',
            stroke: '#ffffff',
            strokeThickness: 3,
            shadow: {
                offsetX: 0,
                offsetY: 0,
                color: '#00ff00',
                blur: 20,
                stroke: true,
                fill: true
            }
        }).setOrigin(0.5);
        
        // Animación del texto de felicitaciones
        congratsText.setScale(0);
        this.tweens.add({
            targets: congratsText,
            scale: { from: 0, to: 1.2 },
            duration: 600,
            ease: 'Back.easeOut',
            yoyo: true,
            repeat: 1,
            onComplete: () => {
                this.tweens.add({
                    targets: congratsText,
                    alpha: 0,
                    y: congratsText.y - 50,
                    duration: 800,
                    delay: 500,
                    onComplete: () => {
                        congratsText.destroy();
                    }
                });
            }
        });
        
        // Efecto de brillo en toda la pantalla
        const flashOverlay = this.add.rectangle(this.centerX, this.centerY, 
            this.cameras.main.width, this.cameras.main.height, 0x00ff00, 0.3);
        
        this.tweens.add({
            targets: flashOverlay,
            alpha: 0,
            duration: 300,
            onComplete: () => {
                flashOverlay.destroy();
            }
        });
        
        // Hacer que la consola principal brille
        this.tweens.add({
            targets: this.consoleFrame,
            scaleX: { from: 1, to: 1.05 },
            scaleY: { from: 1, to: 1.05 },
            duration: 400,
            yoyo: true,
            ease: 'Sine.easeInOut'
        });
    }

    showCorrectedCode() {
        // Código corregido
        const correctedCode = `float peso1 = 0.5;
float peso2 = 0.5;
float sesgo = 1.0;

void setup() {
  Serial.begin(9600);
}
void loop() {
  float entrada1 = analogRead(A0) / 1023.0; // Normalización
  float entrada2 = analogRead(A1) / 1023.0; // Normalización
  float salida = (entrada1 * peso1) + 
                 (entrada2 * peso2) + sesgo;
  if (salida > 1.0) {
    Serial.println("Decisión: Aceptar.");
  }
}`;

        // Animación de transición del código
        this.tweens.add({
            targets: this.codeDisplay,
            alpha: 0,
            duration: 500,
            onComplete: () => {
                this.codeDisplay.setText(correctedCode);
                this.codeDisplay.setFill('#00ff00');
                this.tweens.add({
                    targets: this.codeDisplay,
                    alpha: 1,
                    duration: 500
                });
            }
        });
    }

    activateNeuralNetwork() {
        // Iluminar nodos en verde
        this.neuralNodes.forEach((node, index) => {
            this.time.delayedCall(index * 200, () => {
                node.setFillStyle(0x00ff00);
                node.setStrokeStyle(3, 0x00ffff);
                
                // Efecto de pulso
                this.tweens.add({
                    targets: node,
                    scaleX: 1.5,
                    scaleY: 1.5,
                    duration: 300,
                    yoyo: true,
                    ease: 'Power2.easeOut'
                });
            });
        });

        // Crear flujo eléctrico
        this.createElectricFlow();
    }

    createElectricFlow() {
        const networkY = this.centerY + 200;
        
        // Partículas de flujo eléctrico
        for (let i = 0; i < 10; i++) {
            this.time.delayedCall(i * 100, () => {
                const particle = this.add.circle(this.centerX - 200, networkY, 3, 0x00ffff);
                
                this.tweens.add({
                    targets: particle,
                    x: this.centerX + 200,
                    duration: 2000,
                    ease: 'Power2.easeInOut',
                    onComplete: () => {
                        particle.destroy();
                    }
                });
            });
        }
    }

    showSuccessMessage() {
        const successBg = this.add.rectangle(this.centerX, this.centerY + 300, 800, 80, 0x004400, 0.9);
        successBg.setStrokeStyle(2, 0x00ff00);
        
        const successText = this.add.text(this.centerX, this.centerY + 300, 
            '¡BIEN HECHO! Ahora la IA procesa los datos correctamente\nantes de tomar una decisión.', {
            fontSize: '16px',
            fontFamily: 'Courier New, monospace',
            fill: '#00ff00',
            align: 'center',
            lineSpacing: 5
        }).setOrigin(0.5);

        // Animación de entrada
        successBg.setScale(0);
        successText.setAlpha(0);
        
        this.tweens.add({
            targets: successBg,
            scale: 1,
            duration: 500,
            ease: 'Back.easeOut'
        });
        
        this.tweens.add({
            targets: successText,
            alpha: 1,
            duration: 800,
            delay: 300
        });

        // Transición a la escena CircuitosQuemados después de 3 segundos
        this.time.delayedCall(3000, () => {
            this.scene.start('CircuitosQuemados');
        });
    }

    showIncorrectAnswer() {
        // Animaciones de error espectaculares
        this.createErrorExplosion();
        this.createShakeEffect();
        this.createErrorParticles();
        
        // Cambiar indicador a rojo con animación dramática
        this.tweens.add({
            targets: this.statusIndicator,
            scaleX: 2,
            scaleY: 2,
            duration: 200,
            ease: 'Power2.easeOut',
            onComplete: () => {
                this.statusIndicator.setFillStyle(0xff0000);
                this.tweens.add({
                    targets: this.statusIndicator,
                    alpha: { from: 1, to: 0 },
                    scaleX: 1,
                    scaleY: 1,
                    duration: 150,
                    repeat: 8,
                    yoyo: true
                });
            }
        });

        // Efecto de flash rojo en pantalla
        this.createScreenFlash(0xff0000, 0.4);

        // Sonido de error
        if (this.errorSound) {
            this.errorSound.play();
        }

        // Crear efecto glitch
        this.createGlitchEffect();
        
        // Mensaje de error humorístico
        this.showErrorMessage();
    }

    createGlitchEffect() {
        // Efecto de glitch en toda la pantalla
        const glitchOverlay = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0xff0000, 0.1);
        glitchOverlay.setOrigin(0, 0);
        
        // Líneas de interferencia
        for (let i = 0; i < 20; i++) {
            const line = this.add.rectangle(
                Math.random() * this.cameras.main.width,
                Math.random() * this.cameras.main.height,
                this.cameras.main.width,
                2,
                0xff0000,
                0.8
            );
            
            this.tweens.add({
                targets: line,
                alpha: 0,
                duration: 100 + Math.random() * 200,
                onComplete: () => line.destroy()
            });
        }

        // Shake de cámara
        this.cameras.main.shake(1000, 0.01);
        
        // Destruir overlay después del efecto
        this.time.delayedCall(1000, () => {
            glitchOverlay.destroy();
        });
    }

    // Nuevos métodos para animaciones de feedback visual
    createCelebrationParticles() {
        // Partículas de celebración doradas y verdes
        for (let i = 0; i < 30; i++) {
            const particle = this.add.circle(
                this.centerX + (Math.random() - 0.5) * 100,
                this.centerY + (Math.random() - 0.5) * 100,
                Math.random() * 6 + 2,
                [0x00ff00, 0xffff00, 0x00ffff, 0xffffff][Math.floor(Math.random() * 4)],
                0.9
            );
            
            // Animación de explosión hacia afuera
            this.tweens.add({
                targets: particle,
                x: particle.x + (Math.random() - 0.5) * 600,
                y: particle.y + (Math.random() - 0.5) * 600 - 200,
                alpha: 0,
                scale: { from: 0.1, to: 2 },
                rotation: Math.random() * Math.PI * 4,
                duration: 2000 + Math.random() * 1000,
                ease: 'Power2.easeOut',
                onComplete: () => particle.destroy()
            });
        }
    }

    createSuccessWave() {
        // Ondas de éxito concéntricas
        for (let i = 0; i < 5; i++) {
            const wave = this.add.circle(this.centerX, this.centerY, 20, 0x00ff00, 0);
            wave.setStrokeStyle(4, 0x00ff00, 0.8);
            
            this.tweens.add({
                targets: wave,
                radius: 300 + (i * 50),
                strokeAlpha: 0,
                duration: 1500,
                delay: i * 150,
                ease: 'Power2.easeOut',
                onComplete: () => wave.destroy()
            });
        }
    }

    createScreenFlash(color, intensity) {
        // Flash de pantalla completa
        const flash = this.add.rectangle(
            this.centerX, this.centerY,
            this.cameras.main.width, this.cameras.main.height,
            color, intensity
        );
        
        this.tweens.add({
            targets: flash,
            alpha: 0,
            duration: 400,
            ease: 'Power2.easeOut',
            onComplete: () => flash.destroy()
        });
    }

    createErrorExplosion() {
        // Explosión de partículas rojas
        for (let i = 0; i < 25; i++) {
            const particle = this.add.circle(
                this.centerX + (Math.random() - 0.5) * 50,
                this.centerY + (Math.random() - 0.5) * 50,
                Math.random() * 8 + 3,
                [0xff0000, 0xff4444, 0xffaa00][Math.floor(Math.random() * 3)],
                0.8
            );
            
            // Animación de explosión caótica
            this.tweens.add({
                targets: particle,
                x: particle.x + (Math.random() - 0.5) * 400,
                y: particle.y + (Math.random() - 0.5) * 400,
                alpha: 0,
                scale: { from: 0.2, to: 1.8 },
                rotation: Math.random() * Math.PI * 6,
                duration: 1200 + Math.random() * 800,
                ease: 'Power3.easeOut',
                onComplete: () => particle.destroy()
            });
        }
    }

    createShakeEffect() {
        // Efecto de temblor en elementos principales
        const elementsToShake = [this.consoleFrame, this.codeDisplay];
        
        elementsToShake.forEach(element => {
            if (element) {
                this.tweens.add({
                    targets: element,
                    x: element.x + Math.random() * 10 - 5,
                    y: element.y + Math.random() * 10 - 5,
                    duration: 50,
                    repeat: 15,
                    yoyo: true,
                    ease: 'Power2.easeInOut'
                });
            }
        });
    }

    createErrorParticles() {
        // Partículas de error que caen como lluvia
        for (let i = 0; i < 15; i++) {
            const particle = this.add.rectangle(
                Math.random() * this.cameras.main.width,
                -20,
                Math.random() * 3 + 1,
                Math.random() * 20 + 10,
                0xff0000,
                0.7
            );
            
            this.tweens.add({
                targets: particle,
                y: this.cameras.main.height + 50,
                rotation: Math.random() * Math.PI * 2,
                alpha: 0,
                duration: 2000 + Math.random() * 1000,
                ease: 'Power1.easeIn',
                onComplete: () => particle.destroy()
            });
        }
    }

    showErrorMessage() {
        const errorMessages = [
            'ERROR CRÍTICO: La IA ha decidido que las papas fritas\nson la moneda oficial.',
            'FALLO DEL SISTEMA: La IA quiere encender 300 ventiladores\nal mismo tiempo.',
            'DECISIÓN ABSURDA: La IA cree que los gatos\nson la solución a todos los problemas.',
            'ERROR NEURAL: La IA ha decidido que el color azul\nsabe a matemáticas.'
        ];

        const randomMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];
        
        const errorBg = this.add.rectangle(this.centerX, this.centerY + 300, 800, 80, 0x440000, 0.9);
        errorBg.setStrokeStyle(2, 0xff0000);
        
        const errorText = this.add.text(this.centerX, this.centerY + 300, randomMessage, {
            fontSize: '16px',
            fontFamily: 'Courier New, monospace',
            fill: '#ff0000',
            align: 'center',
            lineSpacing: 5
        }).setOrigin(0.5);

        // Animación de entrada con glitch
        errorBg.setScale(0);
        errorText.setAlpha(0);
        
        this.tweens.add({
            targets: errorBg,
            scale: 1,
            duration: 300,
            ease: 'Power2.easeOut'
        });
        
        this.tweens.add({
            targets: errorText,
            alpha: 1,
            duration: 500,
            delay: 200
        });

        // Efecto de parpadeo en el texto de error
        this.tweens.add({
            targets: errorText,
            alpha: { from: 1, to: 0.3 },
            duration: 300,
            repeat: -1,
            yoyo: true,
            delay: 1000
        });

        // Permitir reintentar después de 3 segundos
        this.time.delayedCall(3000, () => {
            this.resetQuestion();
        });
    }

    resetQuestion() {
        // Resetear selección
        this.selectedOption = null;
        this.confirmButton.setAlpha(0.5);
        
        // Resetear botones
        this.optionButtons.forEach(opt => {
            opt.button.setFillStyle(0x333333);
            opt.button.setStrokeStyle(1, 0x666666);
            opt.text.setFill('#ffffff');
        });

        // Limpiar mensajes
        this.children.list.forEach(child => {
            if (child.type === 'Rectangle' && 
                (child.fillColor === 0x004400 || child.fillColor === 0x440000)) {
                child.destroy();
            }
            if (child.type === 'Text' && 
                (child.style.fill === '#00ff00' || child.style.fill === '#ff0000')) {
                if (child.text.includes('BIEN HECHO') || child.text.includes('ERROR')) {
                    child.destroy();
                }
            }
        });
    }
}