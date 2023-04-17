import "reflect-metadata"
import dotenv from "dotenv";
import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from 'typedi';
import { ArticleController } from './controllers/article.controller';
import { datasource } from "./db/db-config"



const db = datasource.initialize()
  .then(() => {
      console.log("Data Source has been initialized!")
  })
  .catch((err) => {
      console.error("Error during Data Source initialization:", err)
  })

dotenv.config();

const port = process.env.SERVER_PORT || 3000;

useContainer(Container);

const app = createExpressServer({
    controllers: [ArticleController], 
});

if (!module.require.main) { 
    app.listen(port);
}

export default {app, datasource};

