import { DeployFactory } from "./utils";

const main = async () => {
  await DeployFactory();
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
