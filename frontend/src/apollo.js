import Vue from "vue";
import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";

export const apolloClient = new ApolloClient({
  uri: "/graphql"
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

Vue.use(VueApollo);

export default apolloProvider;
