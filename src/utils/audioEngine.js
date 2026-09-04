export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.initialized = false;
  }

  init() {
    if (!this.initialized) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.initialized = true;
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, type, duration, vol) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("AudioEngine: Error playing tone", e);
    }
  }

  playHover() {
    this.playTone(600, 'sine', 0.05, 0.02);
  }

  playClick() {
    this.playTone(900, 'sine', 0.08, 0.05);
  }

  playSnap() {
    // Low thud for snapping to edge
    this.playTone(150, 'triangle', 0.15, 0.1);
  }

  playSweep(up = true) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(up ? 200 : 800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(up ? 800 : 200, this.ctx.currentTime + 0.15);
      
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch (e) {
      console.warn("AudioEngine: Error playing sweep", e);
    }
  }

  playSlideChange(isNext = true) {
    if (!this.ctx) return;
    try {
      // Sleek, premium UI swoop using a lowpass-filtered triangle wave
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();
      
      osc.type = 'triangle'; // Gives a glassy/sleek texture without the grain of noise
      
      // Sweep frequency up for next, down for prev
      osc.frequency.setValueAtTime(isNext ? 150 : 350, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(isNext ? 350 : 150, this.ctx.currentTime + 0.25);
      
      // Lowpass filter sweeps down to make it sound "polished" and remove harsh highs
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2000, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.25);
      
      gain.gain.setValueAtTime(0, this.ctx.currentTime);
      // Audible but not overwhelming
      gain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch(e) {}
  }

  playTypingTick() {
    if (!this.ctx) return;
    try {
      // Creamy switch (thock), but lighter-toned and slightly more audible
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine'; // Smooth and round
      
      // Start higher (400Hz) to remove the heavy bass tone, making it lighter and creamier
      const freq = 400 + Math.random() * 60; 
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      // Drop to 150Hz instead of 100Hz to avoid muddy low-end
      osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0, this.ctx.currentTime);
      // Increased gain (0.18) for better audibility
      gain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch(e) {}
  }

  playBassDrop() {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(10, this.ctx.currentTime + 2); // Deep drop
      
      gain.gain.setValueAtTime(0.5, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 2);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 2);
    } catch(e) {}
  }

  playAlert() {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      
      // Siren wobble
      osc.frequency.setValueAtTime(400, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(600, this.ctx.currentTime + 0.25);
      osc.frequency.linearRampToValueAtTime(400, this.ctx.currentTime + 0.5);
      osc.frequency.linearRampToValueAtTime(600, this.ctx.currentTime + 0.75);
      osc.frequency.linearRampToValueAtTime(400, this.ctx.currentTime + 1.0);
      
      gain.gain.setValueAtTime(0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime + 0.9);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 1.0);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 1.0);
    } catch(e) {}
  }

  playAccessGranted() {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      
      // Pleasant double chime
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.setValueAtTime(800, this.ctx.currentTime + 0.15);
      
      gain.gain.setValueAtTime(0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      
      gain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 0.16);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.5);
    } catch(e) {}
  }

  playDecryptTick() {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine'; // High, glassy blip
      osc.frequency.setValueAtTime(1500 + Math.random() * 1000, this.ctx.currentTime);
      
      gain.gain.setValueAtTime(0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.02, this.ctx.currentTime + 0.005); // VERY soft
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.02);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.02);
    } catch(e) {}
  }

  playDecryptDone() {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1600, this.ctx.currentTime + 0.2); // subtle ascending chime
      
      gain.gain.setValueAtTime(0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    } catch(e) {}
  }
}

export const audio = new AudioEngine();
