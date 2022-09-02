import initApp from "./app/init-context";
import *  as email  from "./notify/email";
import minimist from 'minimist'
import * as db from './app/init-db'

const main = async () => {
  const argv = minimist(process.argv.slice(2));
  console.log("start neoledgers:",__dirname);  
  console.dir(argv)

  const appCtxt = initApp();
  for ( const file of [
    "./app/init-db",
    "./app/init-http",
    "./app/init-redis",
    "./app/init-apollo",
  ]) {
    await require(file).default(appCtxt)
  }
     
  appCtxt.http.listen(4000, () => {
    console.log("ledgers-api listening on: 4000");
  });
};

main().catch((e) => {
  console.error("main error:", e);
});
