module.exports = (context) => ({
    plugins: {
        'postcss-each': {},
        'stylelint': context.env === 'test' ? false : {},
        'postcss-cssnext': context.env === 'test' ? false : {}
    }
})
