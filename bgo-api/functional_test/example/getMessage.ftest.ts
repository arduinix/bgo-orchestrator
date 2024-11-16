import { handler } from "src/services/exampleService/getMessage/getMessage";

handler().then((result) => {
  console.log(result);
});
