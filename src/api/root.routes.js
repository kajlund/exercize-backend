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
        handler: (_req, res) => {
          res.status(200).json({
            success: true,
            status: 200,
            message: 'OK',
            data: { response: 'pong' },
          });
        },
      },
    ],
  };
}
