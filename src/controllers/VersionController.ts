import * as express from "express";
import * as child_process from "child_process"

let revision: string = null;

try {
  revision = child_process
    .execSync("git rev-parse HEAD")
    .toString().trim();
} catch(e) {
  console.log("Unable to get git revision");
}

const router = express.Router();

router.get('/version', async(req: express.Request, res: express.Response) => {
  let json: any = {
    success: true,
    revision
  };

  res.json(json);
});


export default router;
