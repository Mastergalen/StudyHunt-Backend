import * as express from 'express';
import * as _ from 'lodash';
import Library from "../models/Library";

const router = express.Router();

router.get('/libraries', async (req, res) => {

  let libraries = await Library.fetchAll();

  console.log(libraries);

  for(let l of libraries) {
    l.capacity = await Library.countAllSeats(l.id);
    l.available = await Library.countVacantSeats(l.id);
    l.seats = await Library.getSeats(l.id);
  }

  return res.json(libraries);
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
