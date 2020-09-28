module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    inset: {
      '1/2': '50%'
    },
    extend: {
      colors: {
        'accent-1': '#333',
      },
      spacing: {
        128: '32rem',
        256: '64rem',
        288: '72rem'
      },
    },
  },
  variants: {},
  plugins: [],
}
