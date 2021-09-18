module.exports = {
    purge: [ './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}' ],
    theme: {
        extend: {
            colors: {
                primary: '#2a89b5',
                'dar-gray': '#4b4b4b',
                'dark-gray': '#333333',
                'light-gray-0': '#eaeaea',
                'light-gray-1': '#4b4b4b',
                'light-gray-2': '#808080',
                'renderer-gray': '#e0e0e0', // 'renderer-gray': 'rgba(54,54,54,0.98)',
                red: '#e34850',
                'green-400': '#2d9d78',
                'green-500': '#268e6c',
            },
        },
    },
    variants: {},
    plugins: [],
};
