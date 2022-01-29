import { Core, Worker } from "@temporalio/worker";
import * as activities from "./activities";

run().catch((err) => console.log(err));

async function run() {
  await Core.install({
    serverOptions: {
      address: "temporal:7233",
    },
  });

  const worker = await Worker.create({
    workflowsPath: require.resolve("./workflows"),
    activities,
    taskQueue: "survey",
  });

  await worker.run();
}
