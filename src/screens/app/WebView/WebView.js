import React, { useContext } from 'react';
import { WebView } from 'react-native-webview';

import AppContext from '../../../config/context';

const EnvelopeWebView = ({ navigation }) => {
  const context = useContext(AppContext);

  return (
    <WebView
      source={{ uri: navigation.getParam('uri') }}
      onLoad={() => context.setLoading(false)}
    />
  );
};

export default EnvelopeWebView;
