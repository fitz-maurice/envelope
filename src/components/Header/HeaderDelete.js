import React, {useContext} from 'react';
import {StyleSheet, Alert, Text, useWindowDimensions} from 'react-native';

// Envelope
import {ThemeContext} from '../../theme';
import {AppContext, deleteCard} from '../../services';

const HeaderDelete = ({navigation, imageKey, uid}) => {
  const context = useContext(AppContext);
  const {theme} = useContext(ThemeContext);
  const fs = 17 * useWindowDimensions().fontScale;

  /**
   * _deleteCard
   *
   * Prompt the user to delete a card
   */
  const _deleteCard = () => {
    Alert.alert('Delete Card?', 'Are you sure? This cannot be undone.', [
      {text: 'No', style: 'cancel', onPress: () => {}},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => _realDelete(),
      },
    ]);
  };

  /**
   * _realDelete
   *
   * Actually delete a card
   */
  const _realDelete = () => {
    context.setLoading(true);
    deleteCard(uid, imageKey).then(() => {
      context.setLoading(false);
      navigation.navigate('Home');
    });
  };

  /***************************************************************
   * STYLES
   **************************************************************/
  const styles = StyleSheet.create({
    delete: {
      fontSize: fs,
      marginRight: 8,
      color: theme.red,
    },
  });

  return (
    <Text style={styles.delete} onPress={_deleteCard}>
      Delete
    </Text>
  );
};

export {HeaderDelete};
