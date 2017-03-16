import * as express from "express";
import * as child_process from "child_process"

let revision: string = child_process
  .execSync("git rev-parse HEAD")
  .toString().trim();

const router = express.Router();

router.get('/version', async(req: express.Request, res: express.Response) => {
  let json: any = {
    success: true,
    revision
  };

  res.json(json);
});


export default router;
