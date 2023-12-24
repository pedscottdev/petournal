// module.exports = {
//   plugins: [
//     'postcss-import',
//     'tailwindcss',
//     'autoprefixer',
//     process.env.NODE_ENV === 'production'
//       ? [
//           '@fullhuman/postcss-purgecss',
//           {
//             content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
//             defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
//           },
//         ]
//       : undefined,
//   ],
// };

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}