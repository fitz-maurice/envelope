import React, {useState, useCallback, useContext} from 'react';
import {WebView} from 'react-native-webview';

import AppContext from '../../../config/context';

const TermsAndPrivacy = ({navigation}) => {
  const context = useContext(AppContext);

  return <WebView source={{ uri: navigation.getParam('uri') }} onLoad={() => context.setLoading(false)} />;
};

TermsAndPrivacy.navigationOptions = ({navigation}) => ({
  title: navigation.getParam('name'),
});

export default TermsAndPrivacy;
