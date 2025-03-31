import axios from 'axios';
import { WeatherData } from './types';

// const API_KEY = '08b0e3c8972643f9a4ef5928d2d0e4db';

export const fetchWeatherData = async (currentCity: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(
      `https://devapi.qweather.com/v7/weather/7d?location=${currentCity}&key=${API_KEY}`
    );

    return response.data;
  } catch (error) {
    console.error('获取天气数据失败:', error);
    throw error;
  }
};