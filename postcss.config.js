module.exports = (context) => ({
    plugins: {
        'postcss-each': {},
        'stylelint': context.env === 'development' ? {} : false,
        'postcss-nesting': context.env === 'development' ? {} : false,
        'postcss-cssnext': context.env === 'development' ? {} : false
    }
})
