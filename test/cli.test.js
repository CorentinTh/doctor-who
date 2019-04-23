import path from 'path';
import {exec} from "child_process";

function cli(args = []) {
    return new Promise(resolve => {
        exec(`node ${path.join(__dirname, "..", "bin", "cli.js")} ${args.join(" ")}`,
            (error, stdout, stderr) => {
                resolve({
                    code: error && error.code ? error.code : 0,
                    error,
                    stdout,
                    stderr
                });
            });
    });
}

describe("cli", () => {

    it("should return a value without args", async () => {
        const res = await cli();

        expect(res.code).toEqual(0);
        expect(res.stdout.length).toBeGreaterThan(0);
    });

    // TODO: add more tests

});
