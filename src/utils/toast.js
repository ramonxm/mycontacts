import EventManager from '../lib/EventManager';

export const toastManager = new EventManager();

export default function toast({ type, text, duration }) {
  toastManager.emit('addtoast', { type, text, duration });
}
