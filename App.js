import React, { useState, useEffect } from 'react';
import Header from './Header.js';
import _ from 'lodash';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapView from 'react-native-maps';

import { apiMarkers } from './src/api/api-markers';
import { getAqiColor } from './src/utils.js';
import { ScrollView } from 'react-native-gesture-handler';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

const Tab = createMaterialBottomTabNavigator();

const w = Dimensions.get('window').width;

function Home() {
  return (

    <View style={styles.container}>


    </View>
  );
}

function City() {
  const [latLngs, setLatLngs] = useState([]);

  useEffect(() => {
    getMarkers();
  }, []);

  async function getMarkers() {
    const resp = await apiMarkers.getApiWithBounds();
    setLatLngs(resp);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 21.027764,
          longitude: 105.83416,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {latLngs.map((n, idx) => (
          <MapView.Marker
            key={idx}
            pinColor={getAqiColor(n.aqi)}
            title={n.aqi}
            description={n.city}
            coordinate={{
              latitude: n.lat,
              longitude: n.lon,
            }}
          />
        ))}
      </MapView>
    </View>
  );
}

function Statistics() {
  const [latLngs, setLatLngs] = useState([]);

  useEffect(() => {
    getMarkers();
  }, []);

  async function getMarkers() {
    const resp = await apiMarkers.getApiWithBounds();
    setLatLngs(resp);
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
      }}>
      <ScrollView contentContainerStyle={{ width: '100%' }}>
        {_.sortBy(latLngs, 'aqi')
          .reverse()
          .map((n, idx) => {
            return (
              <View
                key={idx}
                style={{
                  marginBottom: 12,
                  width: w,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  alignItems: 'center',
                }}>
                <Text style={{ width: 30 }}>{`#${idx}`}</Text>
                <Text
                  numberOfLines={2}
                  style={{
                    fontSize: 20,
                    flexGrow: 2,
                    maxWidth: 0.6 * w,
                    textAlign: 'left',
                  }}>
                  {n.city}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    width: 60,
                    height: 30,
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: getAqiColor(n.aqi),
                  }}>
                  {n.aqi}
                </Text>
              </View>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
}

function Tracking() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Theo dõi</Text>
    </View>
  );
}

function Feedback() {
  function onClickItem(title) {
    if (title === 'About') {
      alert('Ứng dụng HaNoiAir được phát triển bởi Nguyễn Tiến Huy - Đại học Bách Khoa Hà Nội');
    }
    if (title === 'Feedback') {
      alert('Chúng tôi cần ý kiến đóng góp của các bạn để phát triển ứng dụng hoàn thiện hơn. Mọi đóng góp xin liên hệ huyfrog@gmail.com');
    }
  }

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {['Notification', 'About', 'Rate This App', 'Feedback'].map((n) => {
        return (
          <TouchableOpacity
            onPress={() => onClickItem(n)}
            style={{
              width: '100%',
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderBottomColor: 'gray',
              borderBottomWidth: 0.6,
            }}>
            <Text style={{ fontSize: 20 }}>{n}</Text>
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Trang Chủ"
      activeColor="#F5FCFF"
      shifting={false}
      style={{ backgroundColor: 'tomato' }}>
      <Tab.Screen
        name="Trang Chủ"
        component={Home}
        options={{
          tabBarLabel: 'Trang Chủ',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Bản Đồ"
        component={City}
        options={{
          tabBarLabel: 'Bản Đồ',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Thống kê"
        component={Statistics}
        options={{
          tabBarLabel: 'Thống kê',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-bar" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Phản hồi"
        component={Feedback}
        options={{
          tabBarLabel: 'Phản hồi',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="feedback" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
