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
                    value: "nodejs"
                }
            ],
            origins: [
                {
                    repoSource: "github.com",
                    repoOwner: "estafette",
                    repoName: "estafette-ci-api",
                    repoBranch: "master",
                    repoRevision: "d97625",
                    buildVersion: "0.0.228-beta",
                    buildStatus: "succeeded",
                    buildProgress: 100,
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
                            buildStatus: "running"
                        }
                    ]
                },
                {
                    repoSource: "github.com",
                    repoOwner: "estafette",
                    repoName: "estafette-ci-web",
                    repoBranch: "master",
                    repoRevision: "d97625",
                    buildVersion: "0.0.13",
                    buildStatus: "running",
                    buildProgress: 33,
                    labels: [
                        {
                            key: "app",
                            value: "estafette-ci-web"
                        },
                        {
                            key: "team",
                            value: "estafette"
                        },
                        {
                            key: "language",
                            value: "nodejs"
                        }
                    ],
                    destinationVersions: [
                        {
                            destination: {
                                name: "tooling",
                                type: "Kubernetes Engine"
                            },
                            buildVersion: "0.0.12",
                            buildStatus: "succeeded"
                        }
                    ]
                },
                {
                    repoSource: "github.com",
                    repoOwner: "estafette",
                    repoName: "estafette-ci-builder",
                    repoBranch: "master",
                    repoRevision: "d97625",
                    buildVersion: "0.0.260",
                    buildStatus: "failed",
                    buildProgress: 100,
                    labels: [
                        {
                            key: "app",
                            value: "estafette-ci-builder"
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
                                name: "beta",
                                type: "Docker Tag"
                            },
                            buildVersion: "0.0.260",
                            buildStatus: "succeeded"
                        },
                        {
                            destination: {
                                name: "stable",
                                type: "Docker Tag"
                            },
                            buildVersion: "0.0.260",
                            buildStatus: "running"
                        },
                        {
                            destination: {
                                name: "latest",
                                type: "Docker Tag"
                            },
                            buildVersion: "0.0.259",
                            buildStatus: "succeeded"
                        },
                    ]
                },
                {
                    repoSource: "github.com",
                    repoOwner: "estafette",
                    repoName: "estafette-ci-libraries",
                    repoBranch: "master",
                    repoRevision: "d97625",
                    buildVersion: "0.0.19",
                    buildStatus: "succeeded",
                    buildProgress: 100,
                    labels: [
                        {
                            key: "app",
                            value: "estafette-ci-libraries"
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
                                name: "github-tag",
                                type: "Git Tag"
                            },
                            buildVersion: "0.0.19",
                            buildStatus: "failed"
                        },
                    ]
                },
                {
                    repoSource: "github.com",
                    repoOwner: "estafette",
                    repoName: "estafette-extension-github-status",
                    repoBranch: "master",
                    repoRevision: "d97625",
                    buildVersion: "0.0.19",
                    buildStatus: "succeeded",
                    buildProgress: 100,
                    labels: [
                        {
                            key: "app",
                            value: "estafette-extension-github-status"
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
                                name: "beta",
                                type: "Docker Tag"
                            },
                            buildVersion: "0.0.19",
                            buildStatus: "running"
                        },
                        {
                            destination: {
                                name: "stable",
                                type: "Docker Tag"
                            },
                            buildVersion: "0.0.17",
                            buildStatus: "succeeded"
                        },
                        {
                            destination: {
                                name: "latest",
                                type: "Docker Tag"
                            },
                            buildVersion: "0.0.17",
                            buildStatus: "succeeded"
                        },
                    ]
                },
                {
                    repoSource: "github.com",
                    repoOwner: "estafette",
                    repoName: "estafette-extension-bitbucket-status",
                    repoBranch: "master",
                    repoRevision: "d97625",
                    buildVersion: "0.0.17",
                    buildStatus: "succeeded",
                    buildProgress: 100,
                    labels: [
                        {
                            key: "app",
                            value: "estafette-extension-bitbucket-status"
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
                                name: "beta",
                                type: "Docker Tag"
                            },
                            buildVersion: "0.0.17",
                            buildStatus: "succeeded"
                        },
                        {
                            destination: {
                                name: "stable",
                                type: "Docker Tag"
                            },
                            buildVersion: "0.0.17",
                            buildStatus: "running"
                        },
                        {
                            destination: {
                                name: "latest",
                                type: "Docker Tag"
                            },
                            buildVersion: "-",
                            buildStatus: ""
                        },
                    ]
                },
                {
                    repoSource: "github.com",
                    repoOwner: "estafette",
                    repoName: "estafette-extension-slack-build-status",
                    repoBranch: "master",
                    repoRevision: "d97625",
                    buildVersion: "0.0.21",
                    buildStatus: "succeeded",
                    buildProgress: 100,
                    labels: [
                        {
                            key: "app",
                            value: "estafette-extension-slack-build-status"
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
                                name: "beta",
                                type: "Docker Tag"
                            },
                            buildVersion: "0.0.21",
                            buildStatus: "succeeded"
                        },
                        {
                            destination: {
                                name: "stable",
                                type: "Docker Tag"
                            },
                            buildVersion: "0.0.21",
                            buildStatus: "succeeded"
                        },
                        {
                            destination: {
                                name: "latest",
                                type: "Docker Tag"
                            },
                            buildVersion: "0.0.21",
                            buildStatus: "succeeded"
                        },
                    ]
                },
                {
                    repoSource: "github.com",
                    repoOwner: "estafette",
                    repoName: "estafette-extension-git-clone",
                    repoBranch: "master",
                    repoRevision: "d97625",
                    buildVersion: "0.0.14",
                    buildStatus: "succeeded",
                    buildProgress: 100,
                    labels: [
                        {
                            key: "app",
                            value: "estafette-extension-git-clone"
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
                                name: "beta",
                                type: "Docker Tag"
                            },
                            buildVersion: "0.0.14",
                            buildStatus: "succeeded"
                        },
                        {
                            destination: {
                                name: "stable",
                                type: "Docker Tag"
                            },
                            buildVersion: "0.0.14",
                            buildStatus: "succeeded"
                        },
                        {
                            destination: {
                                name: "latest",
                                type: "Docker Tag"
                            },
                            buildVersion: "0.0.14",
                            buildStatus: "succeeded"
                        },
                    ]
                },
                {
                    repoSource: "github.com",
                    repoOwner: "estafette",
                    repoName: "estafette-cloudflare-dns",
                    repoBranch: "master",
                    repoRevision: "d97625",
                    buildVersion: "0.0.108",
                    buildStatus: "running",
                    buildProgress: 66,
                    labels: [
                        {
                            key: "app",
                            value: "estafette-cloudflare-dns"
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
                                name: "development",
                                type: "Kubernetes Engine"
                            },
                            buildVersion: "0.0.107",
                            buildStatus: "succeeded"
                        },
                        {
                            destination: {
                                name: "staging",
                                type: "Kubernetes Engine"
                            },
                            buildVersion: "0.0.107",
                            buildStatus: "succeeded"
                        },
                        {
                            destination: {
                                name: "production",
                                type: "Kubernetes Engine"
                            },
                            buildVersion: "0.0.107",
                            buildStatus: "succeeded"
                        },
                        {
                            destination: {
                                name: "tooling",
                                type: "Kubernetes Engine"
                            },
                            buildVersion: "0.0.107",
                            buildStatus: "succeeded"
                        },
                    ]
                },
                {
                    repoSource: "github.com",
                    repoOwner: "estafette",
                    repoName: "estafette-letsencrypt-certificate",
                    repoBranch: "master",
                    repoRevision: "d97625",
                    buildVersion: "0.0.91",
                    buildStatus: "succeeded",
                    buildProgress: 100,
                    labels: [
                        {
                            key: "app",
                            value: "estafette-letsencrypt-certificate"
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
                                name: "development",
                                type: "Kubernetes Engine"
                            },
                            buildVersion: "0.0.91",
                            buildStatus: "succeeded"
                        },
                        {
                            destination: {
                                name: "staging",
                                type: "Kubernetes Engine"
                            },
                            buildVersion: "0.0.91",
                            buildStatus: "succeeded"
                        },
                        {
                            destination: {
                                name: "production",
                                type: "Kubernetes Engine"
                            },
                            buildVersion: "0.0.91",
                            buildStatus: "succeeded"
                        },
                        {
                            destination: {
                                name: "tooling",
                                type: "Kubernetes Engine"
                            },
                            buildVersion: "0.0.91",
                            buildStatus: "succeeded"
                        },
                    ]
                },
                {
                    repoSource: "github.com",
                    repoOwner: "estafette",
                    repoName: "estafette-gke-preemptible-killer",
                    repoBranch: "master",
                    repoRevision: "d97625",
                    buildVersion: "1.0.38",
                    buildStatus: "running",
                    buildProgress: 98,
                    labels: [
                        {
                            key: "app",
                            value: "estafette-gke-preemptible-killer"
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
                                name: "development",
                                type: "Kubernetes Engine"
                            },
                            buildVersion: "1.0.38",
                            buildStatus: "succeeded"
                        },
                        {
                            destination: {
                                name: "staging",
                                type: "Kubernetes Engine"
                            },
                            buildVersion: "1.0.38",
                            buildStatus: "succeeded"
                        },
                        {
                            destination: {
                                name: "production",
                                type: "Kubernetes Engine"
                            },
                            buildVersion: "1.0.38",
                            buildStatus: "succeeded"
                        },
                        {
                            destination: {
                                name: "tooling",
                                type: "Kubernetes Engine"
                            },
                            buildVersion: "1.0.38",
                            buildStatus: "succeeded"
                        },
                    ]
                },
                {
                    repoSource: "github.com",
                    repoOwner: "estafette",
                    repoName: "estafette-gke-node-pool-shifter",
                    repoBranch: "master",
                    repoRevision: "d97625",
                    buildVersion: "1.0.13",
                    buildStatus: "succeeded",
                    buildProgress: 100,
                    labels: [
                        {
                            key: "app",
                            value: "estafette-gke-node-pool-shifter"
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
                                name: "development",
                                type: "Kubernetes Engine"
                            },
                            buildVersion: "1.0.13",
                            buildStatus: "succeeded"
                        },
                        {
                            destination: {
                                name: "staging",
                                type: "Kubernetes Engine"
                            },
                            buildVersion: "1.0.13",
                            buildStatus: "succeeded"
                        },
                        {
                            destination: {
                                name: "production",
                                type: "Kubernetes Engine"
                            },
                            buildVersion: "1.0.13",
                            buildStatus: "succeeded"
                        },
                        {
                            destination: {
                                name: "tooling",
                                type: "Kubernetes Engine"
                            },
                            buildVersion: "-",
                            buildStatus: ""
                        },
                    ]
                },
            ]
        };
    }
});
