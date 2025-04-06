'use strict';

/**
 * contractor controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::contractor.contractor', ({ strapi }) => ({
    // Method 1: Creating an entirely custom action
    async myContractors(ctx) {
        try {
            ctx.body = '123123';
        } catch (err) {
            ctx.body = err;
        }
    },
}));

