import React, {useState, useCallback, useContext} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {Container, Content, Text} from 'native-base';

import styles from './styles';

const Acknowledgements = ({navigation}) => {

  return (
    <Container style={styles.container}>
      {/* Content */}
      <Content padder>
        <Text>Parts of Envelope may utilise the following copyright material, the use of which is hereby acknowledged:</Text>

        <Text>{'\n'}Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero cumque repudiandae fugit. Ab, alias officiis. Vero fuga sed similique. Dignissimos nam quidem quas illo voluptatibus aut asperiores necessitatibus rerum a?</Text>
        <Text>{'\n'}Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero cumque repudiandae fugit. Ab, alias officiis. Vero fuga sed similique. Dignissimos nam quidem quas illo voluptatibus aut asperiores necessitatibus rerum a?</Text>
        <Text>{'\n'}Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero cumque repudiandae fugit. Ab, alias officiis. Vero fuga sed similique. Dignissimos nam quidem quas illo voluptatibus aut asperiores necessitatibus rerum a?</Text>
        <Text>{'\n'}Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero cumque repudiandae fugit. Ab, alias officiis. Vero fuga sed similique. Dignissimos nam quidem quas illo voluptatibus aut asperiores necessitatibus rerum a?</Text>
        <Text>{'\n'}Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero cumque repudiandae fugit. Ab, alias officiis. Vero fuga sed similique. Dignissimos nam quidem quas illo voluptatibus aut asperiores necessitatibus rerum a?</Text>
        <Text>{'\n'}Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero cumque repudiandae fugit. Ab, alias officiis. Vero fuga sed similique. Dignissimos nam quidem quas illo voluptatibus aut asperiores necessitatibus rerum a?</Text>
        <Text>{'\n'}Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero cumque repudiandae fugit. Ab, alias officiis. Vero fuga sed similique. Dignissimos nam quidem quas illo voluptatibus aut asperiores necessitatibus rerum a?</Text>
        <Text>{'\n'}Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero cumque repudiandae fugit. Ab, alias officiis. Vero fuga sed similique. Dignissimos nam quidem quas illo voluptatibus aut asperiores necessitatibus rerum a?</Text>
        <Text>{'\n'}Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero cumque repudiandae fugit. Ab, alias officiis. Vero fuga sed similique. Dignissimos nam quidem quas illo voluptatibus aut asperiores necessitatibus rerum a?</Text>
        <Text>{'\n'}Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero cumque repudiandae fugit. Ab, alias officiis. Vero fuga sed similique. Dignissimos nam quidem quas illo voluptatibus aut asperiores necessitatibus rerum a?</Text>
        <Text>{'\n'}Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero cumque repudiandae fugit. Ab, alias officiis. Vero fuga sed similique. Dignissimos nam quidem quas illo voluptatibus aut asperiores necessitatibus rerum a?</Text>
        <Text>{'\n'}Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero cumque repudiandae fugit. Ab, alias officiis. Vero fuga sed similique. Dignissimos nam quidem quas illo voluptatibus aut asperiores necessitatibus rerum a?</Text>
      </Content>
    </Container>
  );
};

export default Acknowledgements;
