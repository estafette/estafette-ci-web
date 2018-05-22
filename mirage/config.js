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
                "id": "github.com/estafette/estafette-ci-api",
                "type": "pipelines",
                "attributes": {
                  "repo-source": "github.com",
                  "repo-owner": "estafette",
                  "repo-name": "estafette-ci-api",
                  "repo-branch": "master",
                  "repo-revision": "ad8925fb46c540b662f61eb89049b27142124df8",
                  "build-version": "0.0.228-beta",
                  "build-status": "succeeded",
                  "build-progress": 100,
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
                  "target-versions": [
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
                "id": "github.com/estafette/estafette-ci-web",
                "type": "pipelines",
                "attributes": {
                  
                "repo-source": "github.com",
                "repo-owner": "estafette",
                "repo-name": "estafette-ci-web",
                "repo-branch": "master",
                "repo-revision": "ad8925fb46c540b662f61eb89049b27142124df8",
                "build-version": "0.0.13",
                "build-status": "running",
                "build-progress": 33,
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
                "target-versions": [
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
                "id": "github.com/estafette/estafette-ci-builder",
                "type": "pipelines",
                "attributes": {
                  
                  "repo-source": "github.com",
                "repo-owner": "estafette",
                "repo-name": "estafette-ci-builder",
                "repo-branch": "master",
                "repo-revision": "ad8925fb46c540b662f61eb89049b27142124df8",
                "build-version": "0.0.260",
                "build-status": "failed",
                "build-progress": 100,
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
                "target-versions": [
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
              "id": "github.com/estafette/estafette-ci-libraries",
              "type": "pipelines",
              "attributes": {
                  
                "repo-source": "github.com",
                "repo-owner": "estafette",
                "repo-name": "estafette-ci-libraries",
                "repo-branch": "master",
                "repo-revision": "ad8925fb46c540b662f61eb89049b27142124df8",
                "build-version": "0.0.19",
                "build-status": "succeeded",
                "build-progress": 100,
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
                "target-versions": [
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
              "id": "github.com/estafette/estafette-extension-github-status",
              "type": "pipelines",
              "attributes": {
                  
                "repo-source": "github.com",
                "repo-owner": "estafette",
                "repo-name": "estafette-extension-github-status",
                "repo-branch": "master",
                "repo-revision": "ad8925fb46c540b662f61eb89049b27142124df8",
                "build-version": "0.0.19",
                "build-status": "succeeded",
                "build-progress": 100,
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
                "target-versions": [
                    {
                        "target": {
                            "name": "beta",
                            "type": "Docker Tag"
                        },
                        "build-version": "0.0.19",
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
              "id": "github.com/estafette/estafette-extension-bitbucket-status",
              "type": "pipelines",
              "attributes": {
                  
                "repo-source": "github.com",
                "repo-owner": "estafette",
                "repo-name": "estafette-extension-bitbucket-status",
                "repo-branch": "master",
                "repo-revision": "ad8925fb46c540b662f61eb89049b27142124df8",
                "build-version": "0.0.17",
                "build-status": "succeeded",
                "build-progress": 100,
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
                "target-versions": [
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
              "id": "github.com/estafette/estafette-slack-buildStatus",
              "type": "pipelines",
              "attributes": {
                  
                "repo-source": "github.com",
                "repo-owner": "estafette",
                "repo-name": "estafette-extension-slack-buildStatus",
                "repo-branch": "master",
                "repo-revision": "ad8925fb46c540b662f61eb89049b27142124df8",
                "build-version": "0.0.21",
                "build-status": "succeeded",
                "build-progress": 100,
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
                "target-versions": [
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
              "id": "github.com/estafette/estafette-extension-git-clone",
              "type": "pipelines",
              "attributes": {
                  
                "repo-source": "github.com",
                "repo-owner": "estafette",
                "repo-name": "estafette-extension-git-clone",
                "repo-branch": "master",
                "repo-revision": "ad8925fb46c540b662f61eb89049b27142124df8",
                "build-version": "0.0.14",
                "build-status": "succeeded",
                "build-progress": 100,
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
                "target-versions": [
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
              "id": "github.com/estafette/estafette-cloudflare-dns",
              "type": "pipelines",
              "attributes": {
                  
                "repo-source": "github.com",
                "repo-owner": "estafette",
                "repo-name": "estafette-cloudflare-dns",
                "repo-branch": "master",
                "repo-revision": "ad8925fb46c540b662f61eb89049b27142124df8",
                "build-version": "0.0.108",
                "build-status": "running",
                "build-progress": 66,
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
                "target-versions": [
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
              "id": "github.com/estafette/estafette-letsencrypt-certificate",
              "type": "pipelines",
              "attributes": {
                  
                "repo-source": "github.com",
                "repo-owner": "estafette",
                "repo-name": "estafette-letsencrypt-certificate",
                "repo-branch": "master",
                "repo-revision": "ad8925fb46c540b662f61eb89049b27142124df8",
                "build-version": "0.0.91",
                "build-status": "succeeded",
                "build-progress": 100,
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
                "target-versions": [
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
              "id": "github.com/estafette/estafette-gke-preemptible-killer",
              "type": "pipelines",
              "attributes": {
                  
                "repo-source": "github.com",
                "repo-owner": "estafette",
                "repo-name": "estafette-gke-preemptible-killer",
                "repo-branch": "master",
                "repo-revision": "ad8925fb46c540b662f61eb89049b27142124df8",
                "build-version": "1.0.38",
                "build-status": "running",
                "build-progress": 98,
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
                "target-versions": [
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
              "id": "github.com/estafette/estafette-gke-node-pool-shifter",
              "type": "pipelines",
              "attributes": {
                  
                "repo-source": "github.com",
                "repo-owner": "estafette",
                "repo-name": "estafette-gke-node-pool-shifter",
                "repo-branch": "master",
                "repo-revision": "ad8925fb46c540b662f61eb89049b27142124df8",
                "build-version": "1.0.13",
                "build-status": "succeeded",
                "build-progress": 100,
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
                "target-versions": [
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

  this.get('/pipelines/:repoSource/:repoOwner/:repoName', () => {
    return {
      data: {
        "id": "github.com/estafette/estafette-ci-api",
        "type": "pipelines",
        "attributes": {
          "repo-source": "github.com",
          "repo-owner": "estafette",
          "repo-name": "estafette-ci-api",
          "repo-branch": "master",
          "repo-revision": "ad8925fb46c540b662f61eb89049b27142124df8",
          "build-version": "0.0.228-beta",
          "build-status": "succeeded",
          "build-progress": 100,
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
          "target-versions": [
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
      }
    }
  });


  this.get('/pipelines/:repoSource/:repoOwner/:repoName/builds', () => {
    return {
      data: [
            {
                "id": "github.com/estafette/estafette-ci-api",
                "type": "pipelines",
                "attributes": {
                  "repo-source": "github.com",
                  "repo-owner": "estafette",
                  "repo-name": "estafette-ci-api",
                  "repo-branch": "master",
                  "repo-revision": "ad8925fb46c540b662f61eb89049b27142124df8",
                  "build-version": "0.0.228-beta",
                  "build-status": "succeeded",
                  "build-progress": 100,
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
              }
            },
            {
              "id": "github.com/estafette/estafette-ci-api",
              "type": "pipelines",
              "attributes": {
                "repo-source": "github.com",
                "repo-owner": "estafette",
                "repo-name": "estafette-ci-api",
                "repo-branch": "master",
                "repo-revision": "ad8925fb46c540b662f61eb89049b27142124df8",
                "build-version": "0.0.227-beta",
                "build-status": "succeeded",
                "build-progress": 100,
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

