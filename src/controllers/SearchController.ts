import * as express from 'express';
import * as _ from 'lodash';
import Library from "../models/Library";

const router = express.Router();

router.get('/search', async (req, res) => {
  try {
    let libraries = await Library.search(req.query.q);

    for (let l of libraries) {
      l.capacity = await Library.countAllSeats(l.id);
      l.available = await Library.countVacantSeats(l.id);
    }

    return res.json(libraries);
  } catch (e) {
    console.error(e);
  }
});

export default router;
