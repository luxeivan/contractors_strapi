'use strict';


/**
 * contractor controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::contractor.contractor', ({ strapi }) => ({
    // Method 1: Creating an entirely custom action
    
    async find(ctx) {
        let sanitizedQueryParams = await this.sanitizeQuery(ctx);
        const { id } = ctx.state.user;
        sanitizedQueryParams.filters = {
            ...sanitizedQueryParams.filters, user: {
                id: {
                    $eq: id || null
                }
            }
        }
        const entity = await strapi.service('api::contractor.contractor').find(sanitizedQueryParams)        
        const sanitizeResult = await this.sanitizeOutput(entity)

        try {
            ctx.body = sanitizeResult;
        } catch (err) {
            ctx.body = err;
        }
    },
}));

