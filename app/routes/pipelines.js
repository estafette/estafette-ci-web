import Route from '@ember/routing/route';

export default Route.extend({
    model() {
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
            pipelines: this.get('store').findAll('pipeline'),
        };
    }
});
