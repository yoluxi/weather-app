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

const GitHubLink = styled.a`
  position: fixed;
  top: 20px;
  right: 20px;
  color: #333;
  font-size: 30px;
  z-index: 1000;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    color: #1E90FF;
  }
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
  const [weatherCache, setWeatherCache] = useState<Record<string, { data: DailyWeather[], timestamp: number }>>({});

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
      <GitHubLink
        href="https://github.com/yoluxi/weather-app"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View source code on GitHub"
      >
        <svg height="32" viewBox="0 0 16 16" width="32" aria-hidden="true">
          <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
        </svg>
      </GitHubLink>
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
