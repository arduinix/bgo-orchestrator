import { handler } from "src/services/example/getMessage";

handler().then((result) => {
  console.log(result);
});
