import React from 'react';
import { SafeAreaView, Text, Button, StyleSheet } from 'react-native';

const ExploreScreen = () => {
    return (
      <SafeAreaView style={styles.container}>
        <Text>ExploreScreen</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </SafeAreaView>
    );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
