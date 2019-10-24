
const BaseService = require('./app/core/BaseService');
const BaseController = require('./app/core/BaseController');
global.BaseService = BaseService.default;
global.BaseController = BaseController.default;

module.exports = app => {
    app.config.coreMiddleware.unshift('transaction');

    if (app.config.env === 'local' || app.config.env === 'unittest') {
        app.beforeStart(async () => {
            await app.model.sync({ force: false, alter: true });
        });
    }
};
