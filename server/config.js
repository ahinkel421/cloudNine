exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://test:test123@ds125556.mlab.com:25556/cloudnine';
exports.PORT = process.env.PORT || 8080;
