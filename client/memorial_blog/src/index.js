import dva from "dva";
import "./index.css";
// import { createBrowserHistory as createHistory } from 'history';
const createHistory = require("history").createHashHistory
// const createHistory = history.createHashHistory;
// 1. Initialize
// const app = dva();
const app = dva({
  history: createHistory({
      basename:'/addr'
  }),
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);

require('./models').default.forEach(key => app.model(key.default))


// 4. Router
app.router(require("./router").default);

// 5. Start
app.start("#root");
