import React from 'react';
import styled from 'styled-components';
import { DailyWeather } from '../types';

interface WeatherCardProps {
    weather: DailyWeather;
}


const Icon = ({ className }: { className: string }) => (
    <i className={className}></i>
);

const Card = styled.div`
  background: linear-gradient(to bottom, #87CEEB, #1E90FF);
  border-radius: 12px;
  padding: 16px;
  margin: 10px;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, opacity 0.5s ease;
  width: 200px;
  opacity: 1;
  animation: fadeIn 0.5s ease-in;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const DateInfo = styled.h3`
  margin: 0 0 10px 0;
  font-size: 18px;
  text-align: center;
`;

const Temperature = styled.div`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin: 10px 0;
`;


const WeatherText = styled.div`
  text-align: center;
  margin: 10px 0;
`;

const WeatherIcon = styled(Icon)`
  display: block;
  text-align: center;
  font-size: 50px;
`;



const WeatherDetail = styled.div`
  font-size: 14px;
  margin: 5px 0;
`;


const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = weekdays[date.getDay()];
    return `${month}月${day}日 ${weekday}`;
};


const WeatherCard: React.FC<WeatherCardProps> = React.memo(({ weather }) => {
    // 判断当前是白天还是晚上
    const isNight = () => {
        const currentHour = new Date().getHours();
        return currentHour < 6 || currentHour >= 18; // 晚上6点到早上6点认为是夜间
    };

    // 根据当前时间选择白天或晚上的图标
    const iconCode = isNight() ? weather.iconNight : weather.iconDay;
    return (
        <Card role="article" aria-label={`${formatDate(weather.fxDate)}天气信息`}>
            <DateInfo>{formatDate(weather.fxDate)}</DateInfo>
            <WeatherIcon
                className={`qi-${iconCode}`}
                aria-hidden="true"
            />
            <Temperature aria-label={`温度范围：${weather.tempMin}度到${weather.tempMax}度`}>
                {weather.tempMin}° - {weather.tempMax}°
            </Temperature>
            <WeatherText>{weather.textDay} / {weather.textNight}</WeatherText>
            <WeatherDetail aria-label={`湿度: ${weather.humidity}%`}>湿度: {weather.humidity}%</WeatherDetail>
            <WeatherDetail aria-label={`风向: ${weather.windDirDay}`}>风向: {weather.windDirDay}</WeatherDetail>
            <WeatherDetail aria-label={`风力: ${weather.windScaleDay}级`}>风力: {weather.windScaleDay}级</WeatherDetail>
        </Card>
    );
});

export default WeatherCard;