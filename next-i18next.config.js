// used for SSR (getServerSideProps)
// const path = require('path')
// const localePath = path.resolve('./public/locales')

module.exports = {
    debug: process.env.NODE_ENV === 'development',
    i18n: {
        locales: ['ru', 'en'],
        defaultLocale: 'ru',
        localeDetection: false,
    },
    // localePath,
    reloadOnPrerender: process.env.NODE_ENV === 'development',
    // serializeConfig: false,        
}