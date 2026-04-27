// 引入 express 库
const express = require('express');
const app = express();

// 允许解析 JSON 格式的请求体
app.use(express.json());

// --- Mock 数据（保持不变）---
const exitsData = {
  "people_square": [
    { exit_name: "A", order_count: 320, avg_wait_minutes: 6.5, shop_count: 5 },
    // ... 其他出口数据
  ]
};

// --- 核心修改：新增一个更包容的路由处理器 ---
// 这个路由会捕获所有发到 /api 开头的请求，并打印日志，方便调试
app.all('/api/*', (req, res) => {
  console.log(`[${req.method}] 请求路径: ${req.originalUrl}`);
  console.log('请求体:', req.body); // 打印 POST 请求携带的数据

  // 通过解析请求路径，调用对应的业务逻辑
  if (req.path.includes('/exits')) {
    // 从路径中提取 stationId
    const stationId = req.params.stationId || (req.path.match(/\/stations\/([^\/]+)/) || [])[1];
    if(stationId && exitsData[stationId]) {
        return res.json(exitsData[stationId]);
    }
    return res.json([]);
  }
  
  // 如果还是找不到对应的路径，返回 404
  res.status(404).json({ error: '未找到对应的数据接口' });
});

// --- 你原本定义的路由也可以保留，以便单独测试 ---
app.get('/api/platform/analytics/stations/:stationId/exits', (req, res) => {
  const stationId = req.params.stationId;
  const data = exitsData[stationId];
  res.json(data || []);
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Mock API running on port ${port}`));
