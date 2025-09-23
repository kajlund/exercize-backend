export default function getHomeRoutes() {
  return {
    group: {
      prefix: '',
      middleware: [],
    },
    routes: [
      {
        method: 'get',
        path: '/',
        middleware: [],
        handler: async (req, res) => {
          res.render('home', { page: 'Home', title: 'Exercize' });
        }
      },
    ]
  };
};
