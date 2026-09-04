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
}

export const audio = new AudioEngine();
