'use strict';

const step = require('../../step/controllers/step');

/**
 * contract controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::contract.contract', ({ strapi }) => ({
    // Method 1: Creating an entirely custom action

    async myFind(ctx) {
        let sanitizedQueryParams = await this.sanitizeQuery(ctx);
        const { id } = ctx.state.user;
        sanitizedQueryParams.filters = {
            ...sanitizedQueryParams.filters, contractor: {
                user: {
                    id: {
                        $eq: id || null
                    }
                }
            }
        }
        const entity = await strapi.service('api::contract.contract').find(sanitizedQueryParams)
        const sanitizeResult = await this.sanitizeOutput(entity)

        try {
            ctx.body = sanitizeResult;
        } catch (err) {
            ctx.body = err;
        }

    },
    async myFindOne(ctx) {
        let sanitizedQueryParams = await this.sanitizeQuery(ctx);
        const { id } = ctx.state.user;
        sanitizedQueryParams.populate = {
            contractor: {
                populate: ["user"]
            },
            document: "*",
            purpose: "*",
            steps: {
                populate: ["photos"]
            },
        }
        console.log(sanitizedQueryParams)
        // const entity = await strapi.entityService.findOne('api::contractor.contractor', ctx.params.id);
        const entity = await strapi.service('api::contract.contract').findOne(ctx.params.id, sanitizedQueryParams)
        try {
            console.log(entity)
            if (entity.contractor.user.id !== id) {
                ctx.body = { status: "error" };
            } else {
                const sanitizeResult = await this.sanitizeOutput(entity, ctx)
                ctx.body = sanitizeResult;
            }
        } catch (err) {
            ctx.body = err;
        }
    },
}));
