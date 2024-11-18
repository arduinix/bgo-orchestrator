import { helloExample } from "lib/helloExample";

export const handler = async () => {
  console.log("Retrieving message...");
  return helloExample();
};
