import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchWeatherData } from './api';
import { DailyWeather } from './types';
import WeatherCard from './components/WeatherCard';
import CitySelector from './components/CitySelector';
import { useCallback } from 'react';
import SkeletonCard from './components/SkeletonCard';
import ErrorBoundary from './components/ErrorBoundary';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  color: #333;
  font-size: 32px;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 16px;
`;

const WeatherContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 20px;
  color: #666;
  margin-top: 50px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  font-size: 20px;
  color: #ff0000;
  margin-top: 50px;
`;

function App() {
  const [weatherData, setWeatherData] = useState<DailyWeather[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentCity, setCurrentCity] = useState<string>('101020100'); // 默认上海
  const [cityName, setCityName] = useState<string>('上海');
  const [weatherCache, setWeatherCache] = useState<Record<string, {data: DailyWeather[], timestamp: number}>>({});
  
  const getWeatherData = useCallback(async () => {
    try {
      setLoading(true);
      
      // 检查缓存是否存在且未过期（10分钟内有效）
      const now = Date.now();
      const cachedData = weatherCache[currentCity];
      if (cachedData && now - cachedData.timestamp < 10 * 60 * 1000) {
        setWeatherData(cachedData.data);
        setLoading(false);
        return;
      }
      
      const data = await fetchWeatherData(currentCity);
      if (data.code === '200') {
        setWeatherData(data.daily);
        // 更新缓存
        setWeatherCache(prev => ({
          ...prev,
          [currentCity]: {
            data: data.daily,
            timestamp: now
          }
        }));
      } else {
        setError(`获取天气数据失败: ${data.code}`);
      }
    } catch (err) {
      setError('获取天气数据时发生错误');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currentCity, weatherCache]);

  useEffect(() => {
    getWeatherData();
  }, [getWeatherData]);
  
  const handleCityChange = (cityCode: string, name: string) => {
    setCurrentCity(cityCode);
    setCityName(name);
  };

  return (
    <AppContainer>
      <Header>
        <Title>{cityName}未来七天天气预报</Title>
        <CitySelector currentCity={currentCity} onCityChange={handleCityChange} />
        <Subtitle>实时天气数据，助您合理安排行程</Subtitle>
      </Header>
     <ErrorBoundary>
        {loading && <LoadingMessage>加载天气数据中...</LoadingMessage>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        {loading && (
          <WeatherContainer>
            {[...Array(7)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </WeatherContainer>
        )}
        
        {!loading && !error && (
          <WeatherContainer>
            {weatherData.map((weather, index) => (
              <WeatherCard key={index} weather={weather} />
            ))}
          </WeatherContainer>
        )}
     </ErrorBoundary>
   
    </AppContainer>
  );
}

export default App;
