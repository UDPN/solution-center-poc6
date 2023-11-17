module.exports = {
  plugins: {
    "postcss-import": {},
    tailwindcss: {},
    autoprefixer: {},
    // "postcss-pxtorem": {
    //   rootValue: 16,
    //   unitPrecision: 5,
    //   propList: ["*"],
    //   // selectorBlackList: [],
    //   // replace: true,
    //   mediaQuery: false,
    //   minPixelValue: 3,
    //   // exclude: /node_modules/i,
    // },
    ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
  },
};
