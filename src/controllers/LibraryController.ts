import * as express from 'express';

const router = express.Router();

router.get('/libraries', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(
  [
    {
      "id": 1,
      "name": "Main Library",
      "available": "23",
      "capacity": "123",
      "energyEfficiency": "3",
    },
    {
      "id": 2,
      "name": "Science Library",
      "available": "4",
      "capacity": "8",
      "energyEfficiency": "80",
    }
  ]
  , null, 3));
});

router.get('/libraries/{id}', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(
  {
    "id": 1,
    "name": "UCL Science Library",
    "available": "4",
    "capacity": "8",
    "energyEfficiency": "80",
  }
  , null, 3));
});

router.post('/test', (req, res) => {
  console.log(req.body);

  res.send('success');
});

export default router;
