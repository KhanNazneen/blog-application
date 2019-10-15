let appConfig = {
    port: 8081,
    allowedCorsOrigin: '*',
    env: 'dev',
    db: {
    'uri': `mongodb+srv://najninmasood:${process.env.MONGO_ATLAS_PSWD}@blog-app-692hl.mongodb.net/blog-app?retryWrites=true&w=majority`
    },
    apiVersion: '/api/v1'
}

module.exports = {
    port: appConfig.port,
    allowedCorsOrigin: appConfig.allowedCorsOrigin,
    env: appConfig.env,
    db: appConfig.db,
    apiVersion: appConfig.apiVersion
}

// bqegP7MNaPDwy9fJ
