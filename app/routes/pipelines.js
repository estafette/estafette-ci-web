import Route from '@ember/routing/route';

export default Route.extend({
    queryParams: {
        page: {
            refreshModel: true
        },
        size: {
            refreshModel: true
        },
        status: {
            refreshModel: true
        },
    },

    model(params) {
        return {            
            pinnedLabels: //this.get('store').findAll('label'),
            [
                {
                    key: "team",
                    value: "estafette"
                },
                {
                    key: "language",
                    value: "golang"
                },
                {
                    key: "language",
                    value: "nodejs"
                }
            ],
            pipelines: this.get('store').query('pipeline', { page: {
                number: params.page,
                size: params.size
              },
              filter: {
                  status: params.status
              }
            }),
            pagination: {
                linkRoute: "pipelines",
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
