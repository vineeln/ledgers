import dotenv from 'dotenv-safe';
import minimist from 'minimist';
import Container from 'typedi';
import initApp from "./app/init-context";
import { ServerConfigOptions } from './app/init-server';
import Logger from './lib/Logger';

const logger = Logger(module);

const main = async () => {
  const argv = minimist(process.argv.slice(2));
  dotenv.config();
  logger.info("start api-server:", __dirname);

  const appCtxt = initApp("ledgers-api");

  const file = argv["init"];
  if ( !file ) {
    logger.error("server config missing: --init <file>")
    return;
  }
  const rfile = process.cwd() + "/" + file.replace(/\.[^/.]+$/, "")

  logger.info("starting server using config:", rfile);
  
  const config = require(rfile).__SERVER_CONFIG__;

  for (const mod of config.modules as { module: string, config: string }[]) {
    await require(mod.module).default(appCtxt, (config as any)[mod.config])
  }

  const serverConfig:ServerConfigOptions = Container.get('ServerConfigOptions')
  appCtxt.http.listen(serverConfig.port, () => {
    logger.info("ledgers-api listening on: ", serverConfig.port);
  });
};

main().catch((e) => {
  console.error("ledgers-api error:", e);
});

