
import * as React from 'react';
import {
  Dimensions,
  Animated,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Box } from 'native-base';
import { useTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { ProductsCards } from '../'


const initialLayout = { width: Dimensions.get('window').width };


const HomeScreen = (props) => {
  const { categories } = props
  const [index, setIndex] = React.useState(0);
  const [allCategories, setCategories] = React.useState([]);
  const [routes, setRoutes] = React.useState([]);
  const { colors } = useTheme();

  React.useEffect(() => {
    setCategories(categories)
    setRoutes(categories)
  }, [categories])

  const renderTabBar = (props) => {
    const { navigationState, position } = props
    const inputRange = navigationState.routes.map((x, i) => i);
    return (
      <View style={{ height: 50 }}>
        <ScrollView horizontal>
          <Box flexDirection="row">
            {navigationState.routes.map((route, i) => {
              const opacity = position.interpolate({ inputRange, outputRange: inputRange.map((inputIndex) => inputIndex === i ? 1 : 0.5) });
              const color = index === i ? '#1f2937' : '#a1a1aa';
              const borderColor = index === i ? colors.themeColor : 'coolGray.200';
              return (
                <Box borderBottomWidth="3" borderColor={borderColor} flex={1} alignItems="center" p="3" cursor="pointer">
                  <Pressable onPress={() => { console.log(i); setIndex(i); }}>
                    <Animated.Text style={{ color }}>{route.title}</Animated.Text>
                  </Pressable>
                </Box>
              );
            })}
          </Box>
        </ScrollView>
      </View>
    );
  };

  const renderScreen = () => {
    const obj = {}
    for (let i = 0; i < allCategories.length; i++) {
      const category = allCategories[i];
      obj[category.key] = ProductsCards
    }
    return obj
  }

  const renderScene = SceneMap(renderScreen());

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}


const mapStateToProps = (props) => {
  const { products } = props;
  return {
    categories: products.categories
  };
};

export default connect(mapStateToProps, {})(HomeScreen);
