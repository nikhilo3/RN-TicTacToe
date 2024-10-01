import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

// type BoxProps = PropsWithChildren<{
//   item: string | null; // Accept 'O', 'X', or null
// }>

interface BoxProps {
    item: string | null; // Accept 'O', 'X', or null
}


const Box: React.FC<BoxProps> = ({ item } ) => {
  return (
      <Text style={styles.text}>{item}</Text>
  );
};

export default Box;

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40,
  }
});