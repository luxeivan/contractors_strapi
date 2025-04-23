'use strict';


/**
 * contractor controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::contractor.contractor', ({ strapi }) => ({
    // Method 1: Creating an entirely custom action

    async myFind(ctx) {
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
    async myFindOne(ctx) {
        const { id } = ctx.state.user;
        // const entity = await strapi.entityService.findOne('api::contractor.contractor', ctx.params.id);
        const entity = await strapi.service('api::contractor.contractor').findOne(ctx.params.id, { populate: ["user","contracts"] })
        try {
            if (entity.user.id !== id) {
                ctx.body = { status: "error" };
            } else {
                // console.log(entity)
                const sanitizeResult = await this.sanitizeOutput(entity, ctx)
                ctx.body = sanitizeResult;
            }
        } catch (err) {
            ctx.body = err;
        }
    },
}));

