module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "@nuxtjs/eslint-config-typescript",
        "plugin:nuxt/recommended",
        "plugin:prettier/recommended"
    ],

    "rules": {
        "vue/multi-word-component-names": 0,
        "array-callback-return": "off",
        "no-unused-expressions": "off",
        "no-sequences": "off",
        "vue/require-default-prop": "off",

        // "vue/no-multiple-template-root": 0,
        "prettier/prettier": ["error", { "singleQuote": true, "semi": false }]
    }
};