import * as express from 'express';
import * as _ from 'lodash';
import Library from "../models/Library";

const router = express.Router();

router.get('/libraries', async (req, res) => {

  let libraries = await Library.fetchAll();

  for (let l of libraries) {
    l.capacity = await Library.countAllSeats(l.id);
    l.available = await Library.countVacantSeats(l.id);
    l.seats = await Library.getSeats(l.id);
  }

  return res.json(libraries);
});

router.get('/libraries/:id', async (req, res) => {
  try {
    let library: any = await Library.fetch(req.params.id);

    if (!library) {
      return res.status(404).json({
        success: false,
        message: 'Not found'
      });
    }

    let dimensions = await Library.getGridDimensions(req.params.id);

    library.capacity = await Library.countAllSeats(req.params.id);
    library.available = await Library.countVacantSeats(req.params.id);
    library.seats = {
      gridHeight: dimensions[0],
      gridWidth: dimensions[1],
      spaceMap: {
        seats: await Library.getSeats(req.params.id)
      }
    }

    return res.json(library);
  } catch (e) {
    console.error(e);
  }
});

export default router;
