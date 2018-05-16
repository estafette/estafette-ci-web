import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        return {
            pinnedLabels: [
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
                    value: "node"
                }
            ],
            origins: [
                {
                    repoSource: "github.com",
                    repoOwner: "estafette",
                    repoName: "estafette-ci-api",
                    repoBranch: "master",
                    repoRevision: "d97625",
                    buildVersion: "	0.0.228-beta",
                    labels: [
                        {
                            key: "app",
                            value: "estafette-ci-api"
                        },
                        {
                            key: "team",
                            value: "estafette"
                        },
                        {
                            key: "language",
                            value: "golang"
                        }
                    ],
                    destinationVersions: [
                        {
                            destination: {
                                name: "tooling",
                                type: "Kubernetes Engine"
                            },
                            buildVersion: "0.0.228",
                            status: "running"
                        }
                    ]
                }
            ]
        };
    }
});
