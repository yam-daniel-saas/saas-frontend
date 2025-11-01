import { I18nManager } from 'react-native';

export const isRTL = true;

// Need to set RTL ASAP to ensure the app is rendered correctly. Waiting for i18n to init is too late.
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);
