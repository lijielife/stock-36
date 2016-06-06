module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },   
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "sourceType": "module"
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "rules": {       
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ]
    },
    "plugins": [
        "react"
    ]
}