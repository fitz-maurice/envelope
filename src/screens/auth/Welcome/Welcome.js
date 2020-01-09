import React from 'react';
import {View} from 'react-native';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {Container, Content, Footer, Button, Text} from 'native-base';

// Styles
import styles from './styles';

const Welcome = ({navigation}) => {
  const s = useDynamicStyleSheet(styles);

  return (
    <Container style={s.background}>
      {/* Logo */}
      <Text style={s.logo}>Envelope</Text>

      {/* Action Buttons */}
      <Content padder scrollEnabled={false} contentContainerStyle={s.container}>
        <Button style={{marginBottom: 10}}><Text>Email</Text></Button>
        <Button style={{marginBottom: 10}}><Text>Apple</Text></Button>
        <Button style={{marginBottom: 10}}><Text>Google</Text></Button>
      </Content>

      {/* Footer */}
      <Footer style={[s.background, s.footer]}>
        <Text style={s.footerText}>&copy; Envelope, privacy, etc</Text>
      </Footer>
    </Container>
  );
};

export default Welcome;
