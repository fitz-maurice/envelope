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
        <Button block style={{marginBottom: 10}} onPress={() => navigation.navigate('SignUpEmail')}>
          <Text>Email</Text>
        </Button>

        <Button block style={{marginBottom: 10}} onPress={() => alert('Apple')}>
          <Text>Apple</Text>
        </Button>
        <Button block style={{marginBottom: 10}} onPress={() => alert('Google')}>
          <Text>Google</Text>
        </Button>
      </Content>

      {/* Footer */}
      <Footer style={[s.background, s.footer]}>
        <Text style={s.footerText}>&copy; {new Date().getFullYear()} Envelope</Text>
      </Footer>
    </Container>
  );
};

export default Welcome;
