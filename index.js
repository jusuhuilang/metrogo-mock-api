const express = require('express');
const app = express();

const exitsData = {
  "people_square": [
    { exit_name: "A", order_count: 320, avg_wait_minutes: 6.5, shop_count: 5 },
    { exit_name: "B", order_count: 580, avg_wait_minutes: 12.0, shop_count: 8 },
    { exit_name: "C", order_count: 210, avg_wait_minutes: 4.0, shop_count: 3 },
    { exit_name: "D", order_count: 450, avg_wait_minutes: 8.2, shop_count: 6 }
  ]
};

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
