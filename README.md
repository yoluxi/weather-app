# 城市天气预报应用

这是一个使用 React 和 TypeScript 开发的单页应用，用于显示中国各主要城市未来七天的天气预报信息。应用通过和风天气 API 获取实时天气数据，并以美观的卡片形式展示。

![应用截图](screenshot.png)

## 功能特点

- 显示未来七天的天气预报
- 支持搜索和选择中国主要城市
- 展示每日温度范围、天气状况、湿度、风向和风力等信息
- 使用和风天气图标直观展示天气状况
- 响应式设计，适配不同屏幕尺寸
- 美观的 UI 设计，包含卡片悬停效果

## 技术栈

- React 18
- TypeScript
- styled-components (CSS-in-JS 解决方案)
- react-select (可搜索的下拉选择器)
- Axios (HTTP 请求库)
- 和风天气 API 和图标库

## 安装与运行

1. 克隆项目到本地

```bash
git clone <仓库地址>
cd weather
```

2. Install dependencies

```bash
npm install
```

3. Configure API Key

In the `src/api.ts` file, replace `API_KEY` with your API key obtained from the [QWeather Developer Platform](https://dev.qweather.com/).

```typescript
const API_KEY = 'your-qweather-api-key';
```

4. Start the development server

```bash
npm start
```

The application will run at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
/src
  /components
    - WeatherCard.tsx (Weather card component)
  - App.tsx (Main application component)
  - api.ts (API service)
  - types.ts (TypeScript type definitions)
  - index.tsx (Application entry)
  - index.css (Global styles)
```

## Building for Production

```bash
npm run build
```

The built files will be generated in the `build` directory and can be deployed to any static file server.

## Notes

- The free version of QWeather API has daily call limits, please use it reasonably
- This application displays weather for Shanghai by default; to change this, modify the `LOCATION` parameter in `api.ts`

## License

MIT