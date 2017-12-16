module.exports = {
  apps : [
      {
        name: "app",
        script: "./index.js",
        watch: true,
        env: {
            "NODE_ENV": "production",
            "SALT" : "auth-sharelet",
        }
     }
  ]
}
