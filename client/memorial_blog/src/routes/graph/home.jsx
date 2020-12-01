import React from "react";
import { Tabs } from "antd";
import { ApolloProvider } from "react-apollo";
// import ApolloClient from "apollo-boost";
import Courses from "./Courses";
import SubscribePage from "./SubScribe";
import client from './apolloSetup'
const App = () => (
  <ApolloProvider client={client}>
    <h2>my First pollo rapp</h2>
    <Tabs defaultActiveKey="2">
      <Tabs.TabPane key="1" tab={"Query & Mutation"}>
        <Courses />
      </Tabs.TabPane>
      <Tabs.TabPane key="2" tab={"subscriptions"}>
        <SubscribePage />
      </Tabs.TabPane>
    </Tabs>
  </ApolloProvider>
);

// export default () => <div>xxxh</div>;

export default App;
