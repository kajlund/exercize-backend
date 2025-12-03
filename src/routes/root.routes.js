export function getRootRoutes() {
  return {
    group: {
      prefix: '',
      middleware: [],
    },
    routes: [
      {
        method: 'get',
        path: '/ping',
        middleware: [],
        handler: (_req, res) => res.status(200).send('pong'),
      },
    ],
  };
}
