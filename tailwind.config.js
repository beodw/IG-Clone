module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      teal: '#0095f6',
      white: '#ffffff',
      purple: '#3f3cbb',
      midnight: '#121063',
      metal: '#565584',
      tahiti: '#3ab7bf',
      silver: '#ecebff',
      'bubble-gum': '#ff77e9',
      bermuda: '#78dcca',
      'bright-teal': '#2B899D',
      beige: '#FFF5E9',
      pink: '#FDA4AF',
      black: '#000000',
      grey: '#efefef',
      green: '#22C55E',
      buttonActive: '#017189',
      cardCream: '#FFF6E6',
      cardPink: '#FBF1F0',
      cardGreen: '#DDECEF',
      highlighted: '#EEF7F9',
      greyBorder: '#F3F4F6',
      tealAlt: '#0A6375',
      searchBG: '#F8FCFC',
      red: '#DB1F35',
      bgGrey: '#fafafa',
      textGrey: '#8e8e8e',
      linkBlue: '#0095f6',
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
