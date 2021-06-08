const config = {
  initialRouteName: 'User',
  screens: {
    // User: {
    //   path: 'article',
    //   screens: {
    // TopTab: {
    //   // path: 'toptabs',
    //   screens: {
    //     HomeTopTab: {
    //       initialRouteName: 'HomeTopTabStack',
    //       screens: {
    Article: {
      path: 'article/:_id',
    },
  },
};
export const linking = {
  prefixes: ['https://www.karobar.com', 'bottle-karobar://'],
  config,
};
