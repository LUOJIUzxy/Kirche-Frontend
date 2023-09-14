// next.config.js
// module.exports = {
//   images: {
//     domains: ['assets.maccarianagency.com'],
//   },
// }

//const withTM = require('next-transpile-modules')(['@babel/preset-react'])
//There is an NPM module for this next-transpile-modules that allows you to specify which modules to transpile.
module.exports = ({
  images: {
    domains: ['assets.maccarianagency.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/signin-cover',
        permanent: true,
      },
    ];
  },
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     use: [
  //       {
  //         loader: '@svgr/webpack',
  //         options: {
  //           svgoConfig: {
  //             plugins: [
  //               {
  //                 name: 'removeViewBox',
  //                 active: false,
  //               },
  //             ],
  //           },
  //         },
  //       },
  //     ],
  //   });

  //   return config;
  // },
});