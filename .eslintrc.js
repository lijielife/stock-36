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
        "indent": [
            "error",
            "tab",
            {"SwitchCase": 1}
        ],
        "linebreak-style": [
            "error", 
            "unix"
        ],    
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