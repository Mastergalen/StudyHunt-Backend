require("dotenv").config();
import * as mocha from "mocha";
import * as chai from "chai";
import Library from "../src/models/Library";

let should = chai.should();

describe('Library', () => {
  it('should get history of vacancies for Engineering Hub', async () => {
    let libraries = await Library.search("Engineering Hub");
    let engineeringHub = libraries[0];

    let history = await Library.getHistory(engineeringHub.id);

    console.log(history);
  });
});
