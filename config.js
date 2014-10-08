var config = {
  production: {
    backendUrl: 'http://maravedi.heroku.com',
    googleClientId: '147125267354-81lf7cfv1qi4cmedo90ff4fshjqblr7d.apps.googleusercontent.com',
    googleRedirectUri: 'http://maravedi.heroku.com/auth/google_oauth2/callback'
  },
  development: {
    backendUrl: 'http://127.0.0.1:3000',
    googleClientId: '147125267354-eg1dootuvr0odr0blj9q5ge66adqtohl.apps.googleusercontent.com',
    googleRedirectUri: 'http://127.0.0.1:3000/auth/google_oauth2/callback'
  }
};

module.exports = config[process.env.NODE_ENV];
