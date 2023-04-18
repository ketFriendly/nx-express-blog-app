import "reflect-metadata"
import dotenv from "dotenv";
import { Action, createExpressServer, useContainer } from "routing-controllers";
import { Container } from 'typedi';
import { ArticleController } from './controllers/article.controller';
import { UserController } from "./controllers/user.controller";
import { datasource } from "./db/db-config"
import cookieParser from "cookie-parser"
import { AuthMiddleware } from "./middlewares/auth.middleware";


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
  authorizationChecker: async (action: Action) => {
    const authorizationToken = action.request.headers.cookie;
    return await AuthMiddleware(authorizationToken);
},
  controllers: [ArticleController, UserController], 
});

app.use(cookieParser())

if (!module.require.main) { 
    app.listen(port);
}

export default {app, datasource};

