const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
              'primary-color': '#0b1134',
              'link-color': '#000000',
              'border-radius-base': '2px', 
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
