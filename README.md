# 城市天气预报应用

这是一个使用 React 和 TypeScript 开发的单页应用，用于显示中国各主要城市未来七天的天气预报信息。应用通过和风天气 API 获取实时天气数据，并以美观的卡片形式展示。

## 功能特点

- 显示未来七天的天气预报
- 支持搜索和选择中国主要城市
- 根据当前时间自动切换白天/夜间天气图标
- 展示每日温度范围、天气状况、湿度、风向和风力等信息
- 使用和风天气图标直观展示天气状况
- 响应式设计，适配不同屏幕尺寸
- 完整的无障碍功能支持
- 美观的 UI 设计，包含卡片悬停效果和平滑过渡动画

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
git clone https://github.com/yoluxi/weather-app.git
cd weather
```

2. 安装依赖

```bash
npm install
```

3. 配置 API 密钥

在 `src/api.ts` 文件中，将 `API_KEY` 替换为你从[和风天气开发平台](https://dev.qweather.com/)获取的 API 密钥。

```typescript
const API_KEY = '你的和风天气API密钥';
```

4. 启动开发服务器

```bash
npm start
```

应用将在 [http://localhost:3000](http://localhost:3000) 运行。

## 项目结构

```
/public
  - index.html (包含和风天气图标库引用)
  - favicon.ico
  - manifest.json
/src
  /components
    - WeatherCard.tsx (天气卡片组件)
    - CitySelector.tsx (城市选择组件)
    - SkeletonCard.tsx (加载骨架屏组件)
    - ErrorBoundary.tsx (错误边界组件)
  - App.tsx (主应用组件)
  - api.ts (API 服务)
  - types.ts (TypeScript 类型定义)
  - index.tsx (应用入口)
  - index.css (全局样式)
```

## 使用说明

1. 打开应用后，默认显示上海的天气预报
2. 使用顶部的城市选择器搜索并选择其他城市
3. 应用会自动获取并显示所选城市的天气预报
4. 每个天气卡片显示一天的天气信息，包括日期、天气图标、温度范围、天气状况、湿度、风向和风力
5. 天气图标会根据当前时间自动切换为白天或夜间图标


## 构建生产版本

```bash
npm run build
```

构建后的文件将生成在 `build` 目录中，可以部署到任何静态文件服务器。

## 注意事项

- 和风天气 API 免费版每天有调用次数限制，请合理使用
- 本应用使用和风天气图标库，需要保持网络连接以正确加载图标
- 为提高性能，应用实现了数据缓存，同一城市的天气数据在短时间内不会重复请求



## 许可证

MIT
```
