import axios from 'axios';
import { WeatherData } from './types';

const API_KEY = process.env.API_KEY || '';

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