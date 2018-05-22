import Route from '@ember/routing/route';

export default Route.extend({
    queryParams: {
        page: {
            refreshModel: true
        },
        size: {
            refreshModel: true
        },
    },

    model(params) {
        return {
            pipeline: this.get('store').queryRecord('pipeline', { 
                repoSource: params.repoSource, 
                repoOwner: params.repoOwner, 
                repoName: params.repoName,
                reload: true,
            }),
            builds: this.get('store').query('build', { 
                repoSource: params.repoSource, 
                repoOwner: params.repoOwner, 
                repoName: params.repoName,
                page: {
                    number: params.page,
                    size: params.size
                },
                reload: true,
            }),
            pagination: {
                linkRoute: "pipeline-builds",
                activePage: params.page,
                previousPage: params.page-1,
                hasPreviousPage: params.page > 1,
                nextPage: params.page+1,
                hasNextPage: params.page < 10,
                totalPages: 10,
            },
        };
    }
});
