declare module '../components/KiriScanner.jsx' {
  import type { ComponentType } from 'react';

  interface KiriScannerProps {
    onScanComplete?: (url: string) => void;
  }

  export const KiriScanner: ComponentType<KiriScannerProps>;
}

export {};
