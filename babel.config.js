module.exports = {
    presets: [
        ["@babel/preset-env", { targets: { node: "current" } }], //pega a versao do node
        "@babel/preset-typescript", //faz a conversao
    ],
    plugins: [
        [
            "module-resolver",
            {
                alias: {//do path: do tsconfig.json sem os /* e com o caminho para as pastas
                    "@modules": "./src/modules"
                    ,
                    "@config": "./src/config"
                    ,
                    "@shared": "./src/shared"
                    ,
                    "@errors": "./src/errors"
                    ,
                    "@utils": "./src/utils"

                }
            }
        ],
        "babel-plugin-transform-typescript-metadata",
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: true }],
    ]
}