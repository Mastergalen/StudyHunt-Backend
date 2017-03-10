import * as express from 'express';
import * as _ from 'lodash';
import Library from "../models/Library";

const router = express.Router();

router.get('/global', async(req, res) => {
  let globalStats = await Library.global();

  return res.json(globalStats);
});

export default router;
