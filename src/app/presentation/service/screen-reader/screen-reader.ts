import { Injectable, signal, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScreenReaderService implements OnDestroy {
  private readonly STORAGE_PREFIX = 'smart-travel-screen-reader-';

  // State signals
  readonly readFocusedElement = signal<boolean>(this.getInitialState('focus', false));
  readonly readSelectedText = signal<boolean>(this.getInitialState('selection', false));

  private synth = window.speechSynthesis;
  private focusListener: (event: FocusEvent) => void;
  private mouseUpListener: (event: MouseEvent) => void;
  private lastReadText: string = '';

  constructor() {
    this.focusListener = (event: FocusEvent) => {
      if (this.readFocusedElement()) {
        const target = event.target as HTMLElement;
        const textToRead = target.getAttribute('aria-label') || target.textContent;
        if (textToRead && textToRead.trim()) {
          this.speak(textToRead.trim());
        }
      }
    };

    this.mouseUpListener = () => {
      if (this.readSelectedText()) {
        // Usamos setTimeout para permitir que el navegador actualice o limpie la selección
        // al hacer un clic simple (deseleccionar).
        setTimeout(() => {
          const selectedText = window.getSelection()?.toString();
          if (selectedText && selectedText.trim()) {
            const textToRead = selectedText.trim();
            // Solo leemos si el texto es distinto al último leído, para evitar
            // repetir la lectura si el usuario hace clics secundarios sin quitar la selección
            if (this.lastReadText !== textToRead) {
              this.speak(textToRead);
              this.lastReadText = textToRead;
            }
          } else {
            // Si la selección se limpió, reseteamos el último texto leído
            this.lastReadText = '';
          }
        }, 50);
      }
    };

    document.addEventListener('focusin', this.focusListener);
    document.addEventListener('mouseup', this.mouseUpListener);
  }

  ngOnDestroy(): void {
    document.removeEventListener('focusin', this.focusListener);
    document.removeEventListener('mouseup', this.mouseUpListener);
    this.stopSpeaking();
  }

  speak(text: string): void {
    this.stopSpeaking();
    if (this.synth) {
      const utterance = new SpeechSynthesisUtterance(text);
      this.synth.speak(utterance);
    }
  }

  stopSpeaking(): void {
    if (this.synth && this.synth.speaking) {
      this.synth.cancel();
    }
  }

  setPreferences(prefs: { readFocusedElement: boolean, readSelectedText: boolean }): void {
    this.readFocusedElement.set(prefs.readFocusedElement);
    this.readSelectedText.set(prefs.readSelectedText);
  }

  commitPreferences(prefs: { readFocusedElement: boolean, readSelectedText: boolean }): void {
    this.setPreferences(prefs);
    localStorage.setItem(`${this.STORAGE_PREFIX}focus`, prefs.readFocusedElement.toString());
    localStorage.setItem(`${this.STORAGE_PREFIX}selection`, prefs.readSelectedText.toString());
  }

  private getInitialState(key: string, defaultValue: boolean): boolean {
    const saved = localStorage.getItem(`${this.STORAGE_PREFIX}${key}`);
    if (saved !== null) {
      return saved === 'true';
    }
    return defaultValue;
  }
}
