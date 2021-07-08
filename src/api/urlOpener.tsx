import React from 'react';
import {Linking} from 'react-native';
import InAppBrowser, {RedirectResult} from 'react-native-inappbrowser-reborn';

export default async function urlOpener(url: string, redirectUrl: string) {
  // const {url, redirectUrl} = arg;

  await InAppBrowser.isAvailable();
  const {type, url: newUrl}: any = await InAppBrowser.openAuth(
    url,
    redirectUrl,
    {
      showTitle: false,
      enableUrlBarHiding: true,
      enableDefaultShare: false,
      ephemeralWebSession: false,
    },
  );

  if (type === 'success') {
    Linking.openURL(newUrl);
  }
}
