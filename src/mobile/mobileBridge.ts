import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { App as CapApp } from '@capacitor/app';

export interface MobileBackHandlerCallbacks {
  hasOpenModal: () => boolean;
  closeActiveModal: () => void;
}

export class MobileBridge {
  private static instance: MobileBridge;
  private isNative: boolean;

  private constructor() {
    this.isNative = Capacitor.isNativePlatform();
  }

  public static getInstance(): MobileBridge {
    if (!MobileBridge.instance) {
      MobileBridge.instance = new MobileBridge();
    }
    return MobileBridge.instance;
  }

  public async initialize(callbacks?: MobileBackHandlerCallbacks): Promise<void> {
    if (!this.isNative) return;

    try {
      // 1. Configure status bar for immersive dark space aesthetic
      await StatusBar.setStyle({ style: Style.Dark });
      await StatusBar.setOverlaysWebView({ overlay: true });
    } catch {
      // Ignore if not supported on platform
    }

    try {
      // 2. Hide native splash screen once React & Three.js are ready
      await SplashScreen.hide({ fadeOutDuration: 400 });
    } catch {
      // Ignore
    }

    // 3. Android Hardware Back Button navigation
    if (Capacitor.getPlatform() === 'android' && callbacks) {
      try {
        await CapApp.addListener('backButton', ({ canGoBack }) => {
          if (callbacks.hasOpenModal()) {
            callbacks.closeActiveModal();
            this.hapticImpact('light');
          } else if (canGoBack) {
            window.history.back();
          } else {
            CapApp.exitApp();
          }
        });
      } catch {
        // Ignore
      }
    }
  }

  public async hapticImpact(style: 'light' | 'medium' | 'heavy' = 'light'): Promise<void> {
    if (!this.isNative) return;
    try {
      const impactMap: Record<string, ImpactStyle> = {
        light: ImpactStyle.Light,
        medium: ImpactStyle.Medium,
        heavy: ImpactStyle.Heavy,
      };
      await Haptics.impact({ style: impactMap[style] || ImpactStyle.Light });
    } catch {
      // Silently ignore if haptics unavailable
    }
  }

  public async hapticNotification(type: 'success' | 'warning' | 'error'): Promise<void> {
    if (!this.isNative) return;
    try {
      const typeMap: Record<string, NotificationType> = {
        success: NotificationType.Success,
        warning: NotificationType.Warning,
        error: NotificationType.Error,
      };
      await Haptics.notification({ type: typeMap[type] || NotificationType.Success });
    } catch {
      // Silently ignore
    }
  }

  public isMobile(): boolean {
    return this.isNative;
  }

  public getPlatform(): string {
    return Capacitor.getPlatform();
  }
}
