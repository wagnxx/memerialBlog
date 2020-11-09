import React from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import Courses from "./Courses";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
});
const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>my first pollo React App</h2>
      <Courses />
    </div>
  </ApolloProvider>
);

// export default () => <div>xxxh</div>;

export default App;
