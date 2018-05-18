export default function() {

  this.namespace = 'api';
  this.timing = 500;

  this.get('/labels', () => {
    return {
      data: [
        {
          "id": "5",
          "type": "label",
          "attributes": {
            "key": "team",
            "value": "estafette"
          }
        }
      ]
    }
  });

  this.get('/pipelines', () => {
    return {
      data: [
            {
                "id": "github/estafette/estafette-ci-api",
                "type": "pipeline",
                "attributes": {
                  "repoSource": "github",
                  "repoOwner": "estafette",
                  "repoName": "estafette-ci-api",
                  "repoBranch": "master",
                  "repoRevision": "d97625",
                  "buildVersion": "0.0.228-beta",
                  "buildStatus": "succeeded",
                  "buildProgress": 100,
                  "labels": [
                      {
                          "key": "app",
                          "value": "estafette-ci-api"
                      },
                      {
                          "key": "team",
                          "value": "estafette"
                      },
                      {
                          "key": "language",
                          "value": "golang"
                      }
                  ],
                  "targetVersions": [
                      {
                          "target": {
                              "name": "tooling",
                              "type": "Kubernetes Engine"
                          },
                          "buildVersion": "0.0.228",
                          "buildStatus": "running"
                      }
                  ]
              }
            },
            {
                "id": "github/estafette/estafette-ci-web",
                "type": "pipeline",
                "attributes": {
                  
                "repoSource": "github",
                "repoOwner": "estafette",
                "repoName": "estafette-ci-web",
                "repoBranch": "master",
                "repoRevision": "d97625",
                "buildVersion": "0.0.13",
                "buildStatus": "running",
                "buildProgress": 33,
                "labels": [
                    {
                        "key": "app",
                        "value": "estafette-ci-web"
                    },
                    {
                        "key": "team",
                        "value": "estafette"
                    },
                    {
                        "key": "language",
                        "value": "nodejs"
                    }
                ],
                "targetVersions": [
                    {
                        "target": {
                            "name": "tooling",
                            "type": "Kubernetes Engine"
                        },
                        "buildVersion": "0.0.12",
                        "buildStatus": "succeeded"
                    }
                ]
              }
            },
            {
                "id": "github/estafette/estafette-ci-builder",
                "type": "pipeline",
                "attributes": {
                  
                  "repoSource": "github",
                "repoOwner": "estafette",
                "repoName": "estafette-ci-builder",
                "repoBranch": "master",
                "repoRevision": "d97625",
                "buildVersion": "0.0.260",
                "buildStatus": "failed",
                "buildProgress": 100,
                "labels": [
                    {
                        "key": "app",
                        "value": "estafette-ci-builder"
                    },
                    {
                        "key": "team",
                        "value": "estafette"
                    },
                    {
                        "key": "language",
                        "value": "golang"
                    }
                ],
                "targetVersions": [
                    {
                        "target": {
                            "name": "beta",
                            "type": "Docker Tag"
                        },
                        "buildVersion": "0.0.260",
                        "buildStatus": "succeeded"
                    },
                    {
                        "target": {
                            "name": "stable",
                            "type": "Docker Tag"
                        },
                        "buildVersion": "0.0.260",
                        "buildStatus": "running"
                    },
                    {
                        "target": {
                            "name": "latest",
                            "type": "Docker Tag"
                        },
                        "buildVersion": "0.0.259",
                        "buildStatus": "succeeded"
                    },
                ]
              }
            },
            {
              "id": "github/estafette/estafette-ci-libraries",
              "type": "pipeline",
              "attributes": {
                  
                "repoSource": "github",
                "repoOwner": "estafette",
                "repoName": "estafette-ci-libraries",
                "repoBranch": "master",
                "repoRevision": "d97625",
                "buildVersion": "0.0.19",
                "buildStatus": "succeeded",
                "buildProgress": 100,
                "labels": [
                    {
                        "key": "app",
                        "value": "estafette-ci-libraries"
                    },
                    {
                        "key": "team",
                        "value": "estafette"
                    },
                    {
                        "key": "language",
                        "value": "golang"
                    }
                ],
                "targetVersions": [
                    {
                        "target": {
                            "name": "github-tag",
                            "type": "Git Tag"
                        },
                        "buildVersion": "0.0.19",
                        "buildStatus": "failed"
                    },
                ]
              }
            },
            {
              "id": "github/estafette/estafette-extension-github-status",
              "type": "pipeline",
              "attributes": {
                  
                "repoSource": "github",
                "repoOwner": "estafette",
                "repoName": "estafette-extension-github-status",
                "repoBranch": "master",
                "repoRevision": "d97625",
                "buildVersion": "0.0.19",
                "buildStatus": "succeeded",
                "buildProgress": 100,
                "labels": [
                    {
                        "key": "app",
                        "value": "estafette-extension-github-status"
                    },
                    {
                        "key": "team",
                        "value": "estafette"
                    },
                    {
                        "key": "language",
                        "value": "golang"
                    }
                ],
                "targetVersions": [
                    {
                        "target": {
                            "name": "beta",
                            "type": "Docker Tag"
                        },
                        "buildVersion": "0.0.19",
                        "buildStatus": "running"
                    },
                    {
                        "target": {
                            "name": "stable",
                            "type": "Docker Tag"
                        },
                        "buildVersion": "0.0.17",
                        "buildStatus": "succeeded"
                    },
                    {
                        "target": {
                            "name": "latest",
                            "type": "Docker Tag"
                        },
                        "buildVersion": "0.0.17",
                        "buildStatus": "succeeded"
                    },
                ]
              }
            },
            {
              "id": "github/estafette/estafette-extension-bitbucket-status",
              "type": "pipeline",
              "attributes": {
                  
                "repoSource": "github",
                "repoOwner": "estafette",
                "repoName": "estafette-extension-bitbucket-status",
                "repoBranch": "master",
                "repoRevision": "d97625",
                "buildVersion": "0.0.17",
                "buildStatus": "succeeded",
                "buildProgress": 100,
                "labels": [
                    {
                        "key": "app",
                        "value": "estafette-extension-bitbucket-status"
                    },
                    {
                        "key": "team",
                        "value": "estafette"
                    },
                    {
                        "key": "language",
                        "value": "golang"
                    }
                ],
                "targetVersions": [
                    {
                        "target": {
                            "name": "beta",
                            "type": "Docker Tag"
                        },
                        "buildVersion": "0.0.17",
                        "buildStatus": "succeeded"
                    },
                    {
                        "target": {
                            "name": "stable",
                            "type": "Docker Tag"
                        },
                        "buildVersion": "0.0.17",
                        "buildStatus": "running"
                    },
                    {
                        "target": {
                            "name": "latest",
                            "type": "Docker Tag"
                        },
                        "buildVersion": "-",
                        "buildStatus": ""
                    },
                ]
              }
            },
            {
              "id": "github/estafette/estafette-slack-buildStatus",
              "type": "pipeline",
              "attributes": {
                  
                "repoSource": "github",
                "repoOwner": "estafette",
                "repoName": "estafette-extension-slack-buildStatus",
                "repoBranch": "master",
                "repoRevision": "d97625",
                "buildVersion": "0.0.21",
                "buildStatus": "succeeded",
                "buildProgress": 100,
                "labels": [
                    {
                        "key": "app",
                        "value": "estafette-extension-slack-buildStatus"
                    },
                    {
                        "key": "team",
                        "value": "estafette"
                    },
                    {
                        "key": "language",
                        "value": "golang"
                    }
                ],
                "targetVersions": [
                    {
                        "target": {
                            "name": "beta",
                            "type": "Docker Tag"
                        },
                        "buildVersion": "0.0.21",
                        "buildStatus": "succeeded"
                    },
                    {
                        "target": {
                            "name": "stable",
                            "type": "Docker Tag"
                        },
                        "buildVersion": "0.0.21",
                        "buildStatus": "succeeded"
                    },
                    {
                        "target": {
                            "name": "latest",
                            "type": "Docker Tag"
                        },
                        "buildVersion": "0.0.21",
                        "buildStatus": "succeeded"
                    },
                ]
              }
            },
            {
              "id": "github/estafette/estafette-extension-git-clone",
              "type": "pipeline",
              "attributes": {
                  
                "repoSource": "github",
                "repoOwner": "estafette",
                "repoName": "estafette-extension-git-clone",
                "repoBranch": "master",
                "repoRevision": "d97625",
                "buildVersion": "0.0.14",
                "buildStatus": "succeeded",
                "buildProgress": 100,
                "labels": [
                    {
                        "key": "app",
                        "value": "estafette-extension-git-clone"
                    },
                    {
                        "key": "team",
                        "value": "estafette"
                    },
                    {
                        "key": "language",
                        "value": "golang"
                    }
                ],
                "targetVersions": [
                    {
                        "target": {
                            "name": "beta",
                            "type": "Docker Tag"
                        },
                        "buildVersion": "0.0.14",
                        "buildStatus": "succeeded"
                    },
                    {
                        "target": {
                            "name": "stable",
                            "type": "Docker Tag"
                        },
                        "buildVersion": "0.0.14",
                        "buildStatus": "succeeded"
                    },
                    {
                        "target": {
                            "name": "latest",
                            "type": "Docker Tag"
                        },
                        "buildVersion": "0.0.14",
                        "buildStatus": "succeeded"
                    },
                ]
              }
            },
            {
              "id": "github/estafette/estafette-cloudflare-dns",
              "type": "pipeline",
              "attributes": {
                  
                "repoSource": "github",
                "repoOwner": "estafette",
                "repoName": "estafette-cloudflare-dns",
                "repoBranch": "master",
                "repoRevision": "d97625",
                "buildVersion": "0.0.108",
                "buildStatus": "running",
                "buildProgress": 66,
                "labels": [
                    {
                        "key": "app",
                        "value": "estafette-cloudflare-dns"
                    },
                    {
                        "key": "team",
                        "value": "estafette"
                    },
                    {
                        "key": "language",
                        "value": "golang"
                    }
                ],
                "targetVersions": [
                    {
                        "target": {
                            "name": "development",
                            "type": "Kubernetes Engine"
                        },
                        "buildVersion": "0.0.107",
                        "buildStatus": "succeeded"
                    },
                    {
                        "target": {
                            "name": "staging",
                            "type": "Kubernetes Engine"
                        },
                        "buildVersion": "0.0.107",
                        "buildStatus": "succeeded"
                    },
                    {
                        "target": {
                            "name": "production",
                            "type": "Kubernetes Engine"
                        },
                        "buildVersion": "0.0.107",
                        "buildStatus": "succeeded"
                    },
                    {
                        "target": {
                            "name": "tooling",
                            "type": "Kubernetes Engine"
                        },
                        "buildVersion": "0.0.107",
                        "buildStatus": "succeeded"
                    },
                ]
              }
            },
            {
              "id": "github/estafette/estafette-letsencrypt-certificate",
              "type": "pipeline",
              "attributes": {
                  
                "repoSource": "github",
                "repoOwner": "estafette",
                "repoName": "estafette-letsencrypt-certificate",
                "repoBranch": "master",
                "repoRevision": "d97625",
                "buildVersion": "0.0.91",
                "buildStatus": "succeeded",
                "buildProgress": 100,
                "labels": [
                    {
                        "key": "app",
                        "value": "estafette-letsencrypt-certificate"
                    },
                    {
                        "key": "team",
                        "value": "estafette"
                    },
                    {
                        "key": "language",
                        "value": "golang"
                    }
                ],
                "targetVersions": [
                    {
                        "target": {
                            "name": "development",
                            "type": "Kubernetes Engine"
                        },
                        "buildVersion": "0.0.91",
                        "buildStatus": "succeeded"
                    },
                    {
                        "target": {
                            "name": "staging",
                            "type": "Kubernetes Engine"
                        },
                        "buildVersion": "0.0.91",
                        "buildStatus": "succeeded"
                    },
                    {
                        "target": {
                            "name": "production",
                            "type": "Kubernetes Engine"
                        },
                        "buildVersion": "0.0.91",
                        "buildStatus": "succeeded"
                    },
                    {
                        "target": {
                            "name": "tooling",
                            "type": "Kubernetes Engine"
                        },
                        "buildVersion": "0.0.91",
                        "buildStatus": "succeeded"
                    },
                ]
              }
            },
            {
              "id": "github/estafette/estafette-gke-preemptible-killer",
              "type": "pipeline",
              "attributes": {
                  
                "repoSource": "github",
                "repoOwner": "estafette",
                "repoName": "estafette-gke-preemptible-killer",
                "repoBranch": "master",
                "repoRevision": "d97625",
                "buildVersion": "1.0.38",
                "buildStatus": "running",
                "buildProgress": 98,
                "labels": [
                    {
                        "key": "app",
                        "value": "estafette-gke-preemptible-killer"
                    },
                    {
                        "key": "team",
                        "value": "estafette"
                    },
                    {
                        "key": "language",
                        "value": "golang"
                    }
                ],
                "targetVersions": [
                    {
                        "target": {
                            "name": "development",
                            "type": "Kubernetes Engine"
                        },
                        "buildVersion": "1.0.38",
                        "buildStatus": "succeeded"
                    },
                    {
                        "target": {
                            "name": "staging",
                            "type": "Kubernetes Engine"
                        },
                        "buildVersion": "1.0.38",
                        "buildStatus": "succeeded"
                    },
                    {
                        "target": {
                            "name": "production",
                            "type": "Kubernetes Engine"
                        },
                        "buildVersion": "1.0.38",
                        "buildStatus": "succeeded"
                    },
                    {
                        "target": {
                            "name": "tooling",
                            "type": "Kubernetes Engine"
                        },
                        "buildVersion": "1.0.38",
                        "buildStatus": "succeeded"
                    },
                ]
              }
            },
            {
              "id": "github/estafette/estafette-gke-node-pool-shifter",
              "type": "pipeline",
              "attributes": {
                  
                "repoSource": "github",
                "repoOwner": "estafette",
                "repoName": "estafette-gke-node-pool-shifter",
                "repoBranch": "master",
                "repoRevision": "d97625",
                "buildVersion": "1.0.13",
                "buildStatus": "succeeded",
                "buildProgress": 100,
                "labels": [
                    {
                        "key": "app",
                        "value": "estafette-gke-node-pool-shifter"
                    },
                    {
                        "key": "team",
                        "value": "estafette"
                    },
                    {
                        "key": "language",
                        "value": "golang"
                    }
                ],
                "targetVersions": [
                    {
                        "target": {
                            "name": "development",
                            "type": "Kubernetes Engine"
                        },
                        "buildVersion": "1.0.13",
                        "buildStatus": "succeeded"
                    },
                    {
                        "target": {
                            "name": "staging",
                            "type": "Kubernetes Engine"
                        },
                        "buildVersion": "1.0.13",
                        "buildStatus": "succeeded"
                    },
                    {
                        "target": {
                            "name": "production",
                            "type": "Kubernetes Engine"
                        },
                        "buildVersion": "1.0.13",
                        "buildStatus": "succeeded"
                    },
                    {
                        "target": {
                            "name": "tooling",
                            "type": "Kubernetes Engine"
                        },
                        "buildVersion": "-",
                        "buildStatus": ""
                    },
                ]
              }
            },
        ]
    };
  });


  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */
}
