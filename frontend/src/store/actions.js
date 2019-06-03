/*
  Actions are similar to mutations, the differences being that:
  . Instead of mutating the state, actions commit mutations.
  . Actions can contain arbitrary asynchronous operations.
*/

const actions = {
  /*
  Action handlers receive a context object which exposes the same set of methods/properties on the store instance, so you can call context.commit to commit a mutation, or access the state and getters via context.state and context.getters. We can even call other actions with context.dispatch
  In practice, we often use ES2015 argument destructuring to simplify the code a bit (especially when we need to call commit multiple times
  */
  // setAppName ({ commit }, data) {
  //   commit('SET_APP_NAME', data);
  // },
};

export default actions;