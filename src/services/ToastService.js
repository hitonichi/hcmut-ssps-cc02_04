class _ToastService {
  toasts;
  onUpdate;

  constructor() {
    this.toasts = [];
  }

  static generateId() {
    return Math.floor(Date.now() + Math.random() * 100).toString(10);
  }

  setOnUpdate(newOnUpdate) {
    this.onUpdate = newOnUpdate;
  }

  createToast(newToast) {
    const _newToast = Object.assign({}, newToast);
    _newToast.id = _ToastService.generateId();
    this.toasts = [...this.toasts, _newToast];
    this.onUpdate && this.onUpdate();
    console.log('[INFO] ToastService: a toast created', this.toasts);
  }

  removeToast(toastId) {
    this.toasts = this.toasts.filter((t) => {
      return t.id !== toastId;
    });
    this.onUpdate && this.onUpdate();
    console.log('[INFO] ToastService: a toast removed');
  }
}

export const ToastService = new _ToastService();
