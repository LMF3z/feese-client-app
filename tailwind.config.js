module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        elephant: ['Elephant'],
      },
      colors: {
        // final Colors
        primaryColor: '#051028',
        secondaryColor: '#0f1e3f',
        grayItemList: '#3e3e3f',
        buttonSuccessColor: '#1ada5c',
        buttonErrorColor: '#db1b2a',
        placeholderColor: '#222f58',
        borderBaseColor: '#2f3552',
        textWhite: '#f7f7f6',
        SelectColor: '#0e162c',
        smoothTextColor: '#b5bcc9',

        blue: '#1a72d4',
        custom_gray: '#f3f5f7',
        custom_bg: '#1d1d42',
        dark: '#444444',
        dark_rgba: 'rgba(68,68,68,0.8)',
        text_base_color: '#949396',
        violet: '#6a5df8',
        // -----------------------------
        theme_bg: '#0a0d14',
        theme_primary_color: '#556ff7',
        theme_second_color: '#28364e',
        theme_text_color: '#ffffff',
      },
      spacing: {
        '5%': '5%',
        '10%': '10%',
        '35%': '35%',
        '60%': '60%',
        '70%': '70%',
        '75%': '75%',
        '80%': '80%',
        '85%': '85%',
        '85.8%': '85.8%',
        '90%': '90%',
        '94.5%': '94.5%',
        '95%': '95%',
        '99%': '99%',
        '90vh': '90vh',
        '80vh': '80vh',
        '70vh': '70vh',
        '60vh': '60vh',
        '65vh': '65vh',
        '55vh': '55vh',
        '50vh': '50vh',
        '40vh': '40vh',
        '10vh': '10vh',
      },
      gridTemplateRows: {
        // Simple 8 row grid
        8: 'repeat(8, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
};
