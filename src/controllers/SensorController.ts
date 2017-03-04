import * as util from 'util';
import * as express from 'express';
import * as Debug from 'debug';
import Sensor from "../models/Sensor";
import Seat from "../models/Seat";

const debug = Debug("app:api");
const router = express.Router();

function errorResponse(message: string) {
  return {
    success: 'false',
    message
  }
}

router.post('/sensors/:id', async (req: express.Request, res: express.Response) => {
  debug('Sensor post\n %O', req.body);

  if (!req.body.temperature) {
    return res.status(400).json(errorResponse("Temperature has to be a float"));
  }

  if (!req.body.luminosity) {
    return res.status(400).json(errorResponse("Luminosity has to be an int"));
  }

  if (!req.body.luminosity) {
    return res.status(400).json(errorResponse("Luminosity has to be an int"));
  }

  if (!req.body.seats) {
    return res.status(400).json(errorResponse("seats needs to be defined"));
  }

  let seats = await Sensor.getSeats(req.params.id);

  if (seats.length !== Object.keys(req.body.seats).length) {
    return res.status(500).json(errorResponse("Seat configuration in DB does not match"));
  }

  let p = [];
  let updatedSeatIds = [];
  for (let i = 0; i < seats.length; i++) {
    let isOccupied = req.body.seats[(i + 1).toString()];
    let seatId = seats[i].seat_id;
    updatedSeatIds.push({
      id: seatId,
      isOccupied
    });

    p.push(Seat.update(seatId, !isOccupied));
  }

  await Promise.all(p);

  return res.json({
    success: true,
    updatedSeatIds
  });
});

export default router;
