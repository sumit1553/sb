'use client';

import { useEffect, useState } from 'react';
import { DeviceCapabilities } from '@/lib/types';
import { detectFullCapabilities } from '@/lib/browserCapabilities';

const DEFAULT_CAPABILITIES: DeviceCapabilities = {
  isSecureContext: false,
  hasCamera: false,
  hasMicrophone: false,
  canSimultaneousCameras: false,
  supportedMimeType: null,
  canRecordCanvas: false,
  canShare: false,
  canSpeech: false,
  deviceTier: 'mid',
  isIOS: false,
  isAndroid: false,
  isMobile: false,
  browser: 'unknown',
};

export function useDeviceCapabilities(): {
  capabilities: DeviceCapabilities;
  loading: boolean;
} {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>(DEFAULT_CAPABILITIES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    detectFullCapabilities().then(caps => {
      setCapabilities(caps);
      setLoading(false);
    });
  }, []);

  return { capabilities, loading };
}
