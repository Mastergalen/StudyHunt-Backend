import * as util from 'util';
import * as express from 'express';

const router = express.Router();

function errorResponse(message: string) {
  return {
    success: 'false',
    message
  }
}

router.post('/sensors/:id', async (req: express.Request, res: express.Response) => {

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

  return res.json({success: true});
});

export default router;
