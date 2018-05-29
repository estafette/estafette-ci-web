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
    

      this.get('/pipelines/:repoSource/:repoOwner/:repoName/builds/:repoRevision', () => {
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
                  }
                }
            };
          });

          this.get('/pipelines/:repoSource/:repoOwner/:repoName/builds/:repoRevision/logs', () => {
            return {
              data: {
                "type": "build-logs",
                "id": "352090224102637571",
                "attributes": {
                    "inserted-at": 1527519809,
                    "repo-branch": "estafette-letsencrypt-certificate",
                    "repo-name": "estafette",
                    "repo-owner": "github.com",
                    "repo-revision": "master",
                    "repo-source": "d328eba5cd760f98b967715e3f51da1fd00bcc30",
                    "steps": [
                    {
                    "step": "git-clone",
                    "image": {
                    "name": "extensions/git-clone",
                    "tag": "dev",
                    "isPulled": false,
                    "imageSize": 31398692,
                    "pullDuration": 2550589262
                    },
                    "duration": 2972844297,
                    "logLines": [
                    {
                    "timestamp": "2018-05-28T15:03:18.310035204Z",
                    "streamType": "stderr",
                    "text": "\u001b[90m2018-05-28T15:03:18Z\u001b[0m |\u001b[32mINFO\u001b[0m| \u001b[0mStarting estafette-extension-git-clone...\u001b[0m \u001b[36mbranch\u001b[0m=master \u001b[36mbuildDate\u001b[0m=2017-09-12T15:48:16Z \u001b[36mgoVersion\u001b[0m=go1.9 \u001b[36mrevision\u001b[0m=dc3c62c0eb70500f095c597d6d06cba20bfc1258"
                    },
                    {
                    "timestamp": "2018-05-28T15:03:18.310073037Z",
                    "streamType": "stderr",
                    "text": "\u001b[90m2018-05-28T15:03:18Z\u001b[0m |\u001b[32mINFO\u001b[0m| \u001b[0mCloning git repository estafette/estafette-letsencrypt-certificate to branch master and revision d328eba5cd760f98b967715e3f51da1fd00bcc30...\u001b[0m \u001b[36mbranch\u001b[0m=master \u001b[36mname\u001b[0m=estafette/estafette-letsencrypt-certificate \u001b[36mrevision\u001b[0m=d328eba5cd760f98b967715e3f51da1fd00bcc30 \u001b[36murl\u001b[0m=https://x-access-token:v1.b835d50bb757ab21feb79419a4bbb00b79be4bca@github.com/estafette/estafette-letsencrypt-certificate"
                    },
                    {
                    "timestamp": "2018-05-28T15:03:18.319611756Z",
                    "streamType": "stderr",
                    "text": "\u001b[90m2018-05-28T15:03:18Z\u001b[0m |\u001b[0m????\u001b[0m| \u001b[0mCloning into '/estafette-work'...\u001b[0m"
                    },
                    {
                    "timestamp": "2018-05-28T15:03:20.754778653Z",
                    "streamType": "stderr",
                    "text": "\u001b[90m2018-05-28T15:03:20Z\u001b[0m |\u001b[32mINFO\u001b[0m| \u001b[0mFinished cloning git repository estafette/estafette-letsencrypt-certificate to branch master and revision d328eba5cd760f98b967715e3f51da1fd00bcc30\u001b[0m \u001b[36mbranch\u001b[0m=master \u001b[36mname\u001b[0m=estafette/estafette-letsencrypt-certificate \u001b[36mrevision\u001b[0m=dc3c62c0eb70500f095c597d6d06cba20bfc1258 \u001b[36murl\u001b[0m=https://x-access-token:v1.b835d50bb757ab21feb79419a4bbb00b79be4bca@github.com/estafette/estafette-letsencrypt-certificate"
                    },
                    {
                    "timestamp": "2018-05-28T15:03:20.754796448Z",
                    "streamType": "stderr",
                    "text": "\u001b[90m2018-05-28T15:03:20Z\u001b[0m |\u001b[32mINFO\u001b[0m| \u001b[0mFinished estafette-extension-git-clone...\u001b[0m"
                    }
                    ],
                    "exitCode": 0,
                    "status": "SUCCEEDED"
                    },
                    {
                    "step": "set-pending-build-status",
                    "image": {
                    "name": "extensions/github-status",
                    "tag": "dev",
                    "isPulled": false,
                    "imageSize": 9152576,
                    "pullDuration": 2319341141
                    },
                    "duration": 1461501823,
                    "logLines": [
                    {
                    "timestamp": "2018-05-28T15:03:23.615653485Z",
                    "streamType": "stderr",
                    "text": "\u001b[90m2018-05-28T15:03:23Z\u001b[0m |\u001b[32mINFO\u001b[0m| \u001b[0mStarting estafette-extension-github-status...\u001b[0m \u001b[36mbranch\u001b[0m=master \u001b[36mbuildDate\u001b[0m=2017-09-12T15:47:12Z \u001b[36mgoVersion\u001b[0m=go1.9 \u001b[36mrevision\u001b[0m=70223113f82448e09380cc709495c9f921bb7d3d"
                    },
                    {
                    "timestamp": "2018-05-28T15:03:24.472955027Z",
                    "streamType": "stderr",
                    "text": "\u001b[90m2018-05-28T15:03:24Z\u001b[0m |\u001b[35mDEBU\u001b[0m| \u001b[0mReceived response for 'https://api.github.com/repos/estafette/estafette-letsencrypt-certificate/statuses/d328eba5cd760f98b967715e3f51da1fd00bcc30' Github api call...\u001b[0m \u001b[36mrequestBody\u001b[0m=map[state:pending target_url:https://estafette.travix.com/logs/github.com/estafette/estafette-letsencrypt-certificate/master/d328eba5cd760f98b967715e3f51da1fd00bcc30] \u001b[36mrequestHeaders\u001b[0m=map[Accept:[application/vnd.github.machine-man-preview+json] Authorization:[token v1.b835d50bb757ab21feb79419a4bbb00b79be4bca]] \u001b[36mrequestMethod\u001b[0m=POST \u001b[36mresponseBody\u001b[0m=map[context:default created_at:2018-05-28T15:03:24Z creator:map[events_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/events{/privacy} url:https://api.github.com/users/estafette-travix-com%5Bbot%5D gravatar_id: repos_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/repos starred_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/starred{/owner}{/repo} avatar_url:https://avatars2.githubusercontent.com/u/13119702?v=4 login:estafette-travix-com[bot] organizations_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/orgs id:3.0898972e+07 received_events_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/received_events site_admin:false subscriptions_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/subscriptions followers_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/followers following_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/following{/other_user} gists_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/gists{/gist_id} html_url:https://github.com/apps/estafette-travix-com type:Bot] updated_at:2018-05-28T15:03:24Z url:https://api.github.com/repos/estafette/estafette-letsencrypt-certificate/statuses/d328eba5cd760f98b967715e3f51da1fd00bcc30 description:<nil> id:5.007495763e+09 state:pending target_url:https://estafette.travix.com/logs/github.com/estafette/estafette-letsencrypt-certificate/master/d328eba5cd760f98b967715e3f51da1fd00bcc30] \u001b[36mresponseHeaders\u001b[0m=map[Strict-Transport-Security:[max-age=31536000; includeSubdomains; preload] X-Content-Type-Options:[nosniff] X-Github-Media-Type:[github.machine-man-preview; format=json] X-Github-Request-Id:[89FE:1616:2D047DB:5953774:5B0C1A3B] X-Runtime-Rack:[0.323201] Access-Control-Allow-Origin:[*] Etag:[\"c78fba11d7e6716a4f8e1785019155ef\"] X-Frame-Options:[deny] X-Ratelimit-Reset:[1527521620] Access-Control-Expose-Headers:[ETag, Link, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval] Content-Type:[application/json; charset=utf-8] Date:[Mon, 28 May 2018 15:03:24 GMT] Referrer-Policy:[origin-when-cross-origin, strict-origin-when-cross-origin] Server:[GitHub.com] Status:[201 Created] Vary:[Accept, Authorization, Cookie, X-GitHub-OTP] X-Ratelimit-Remaining:[5092] Content-Security-Policy:[default-src 'none'] Content-Length:[1558] Location:[https://api.github.com/repos/estafette/estafette-letsencrypt-certificate/statuses/d328eba5cd760f98b967715e3f51da1fd00bcc30] X-Ratelimit-Limit:[5100] X-Xss-Protection:[1; mode=block] Cache-Control:[private, max-age=60, s-maxage=60]] \u001b[36murl\u001b[0m=https://api.github.com/repos/estafette/estafette-letsencrypt-certificate/statuses/d328eba5cd760f98b967715e3f51da1fd00bcc30"
                    },
                    {
                    "timestamp": "2018-05-28T15:03:24.472965548Z",
                    "streamType": "stderr",
                    "text": "\u001b[90m2018-05-28T15:03:24Z\u001b[0m |\u001b[32mINFO\u001b[0m| \u001b[0mFinished estafette-extension-github-status...\u001b[0m"
                    }
                    ],
                    "exitCode": 0,
                    "status": "SUCCEEDED"
                    },
                    {
                    "step": "build",
                    "image": {
                    "name": "golang",
                    "tag": "1.10.2-alpine3.7",
                    "isPulled": false,
                    "imageSize": 0,
                    "pullDuration": 65471,
                    "error": "invalid reference format"
                    },
                    "duration": 0,
                    "logLines": [],
                    "exitCode": 0,
                    "status": "FAILED"
                    },
                    {
                    "step": "bake",
                    "image": {
                    "name": "docker",
                    "tag": "18.03.1-ce",
                    "isPulled": false,
                    "imageSize": 0,
                    "pullDuration": 0
                    },
                    "duration": 0,
                    "logLines": [],
                    "exitCode": 0,
                    "status": "SKIPPED"
                    },
                    {
                    "step": "push-to-docker-hub",
                    "image": {
                    "name": "docker",
                    "tag": "18.03.1-ce",
                    "isPulled": false,
                    "imageSize": 0,
                    "pullDuration": 0
                    },
                    "duration": 0,
                    "logLines": [],
                    "exitCode": 0,
                    "status": "SKIPPED"
                    },
                    {
                    "step": "set-build-status",
                    "image": {
                    "name": "extensions/github-status",
                    "tag": "dev",
                    "isPulled": true,
                    "imageSize": 0,
                    "pullDuration": 0
                    },
                    "duration": 1081060271,
                    "logLines": [
                    {
                    "timestamp": "2018-05-28T15:03:25.00580817Z",
                    "streamType": "stderr",
                    "text": "\u001b[90m2018-05-28T15:03:24Z\u001b[0m |\u001b[32mINFO\u001b[0m| \u001b[0mStarting estafette-extension-github-status...\u001b[0m \u001b[36mbranch\u001b[0m=master \u001b[36mbuildDate\u001b[0m=2017-09-12T15:47:12Z \u001b[36mgoVersion\u001b[0m=go1.9 \u001b[36mrevision\u001b[0m=70223113f82448e09380cc709495c9f921bb7d3d"
                    },
                    {
                    "timestamp": "2018-05-28T15:03:25.595774204Z",
                    "streamType": "stderr",
                    "text": "\u001b[90m2018-05-28T15:03:25Z\u001b[0m |\u001b[35mDEBU\u001b[0m| \u001b[0mReceived response for 'https://api.github.com/repos/estafette/estafette-letsencrypt-certificate/statuses/d328eba5cd760f98b967715e3f51da1fd00bcc30' Github api call...\u001b[0m \u001b[36mrequestBody\u001b[0m=map[state:failure target_url:https://estafette.travix.com/logs/github.com/estafette/estafette-letsencrypt-certificate/master/d328eba5cd760f98b967715e3f51da1fd00bcc30] \u001b[36mrequestHeaders\u001b[0m=map[Accept:[application/vnd.github.machine-man-preview+json] Authorization:[token v1.b835d50bb757ab21feb79419a4bbb00b79be4bca]] \u001b[36mrequestMethod\u001b[0m=POST \u001b[36mresponseBody\u001b[0m=map[target_url:https://estafette.travix.com/logs/github.com/estafette/estafette-letsencrypt-certificate/master/d328eba5cd760f98b967715e3f51da1fd00bcc30 updated_at:2018-05-28T15:03:25Z description:<nil> state:failure creator:map[starred_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/starred{/owner}{/repo} subscriptions_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/subscriptions events_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/events{/privacy} gists_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/gists{/gist_id} login:estafette-travix-com[bot] type:Bot avatar_url:https://avatars2.githubusercontent.com/u/13119702?v=4 id:3.0898972e+07 organizations_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/orgs received_events_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/received_events site_admin:false url:https://api.github.com/users/estafette-travix-com%5Bbot%5D followers_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/followers following_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/following{/other_user} repos_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/repos gravatar_id: html_url:https://github.com/apps/estafette-travix-com] id:5.007495836e+09 url:https://api.github.com/repos/estafette/estafette-letsencrypt-certificate/statuses/d328eba5cd760f98b967715e3f51da1fd00bcc30 context:default created_at:2018-05-28T15:03:25Z] \u001b[36mresponseHeaders\u001b[0m=map[Status:[201 Created] X-Content-Type-Options:[nosniff] X-Frame-Options:[deny] X-Ratelimit-Limit:[5100] Content-Length:[1558] Content-Type:[application/json; charset=utf-8] Etag:[\"b8b1537ca498dc166b41c494bf62c1bd\"] Server:[GitHub.com] X-Ratelimit-Remaining:[5091] Access-Control-Expose-Headers:[ETag, Link, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval] Date:[Mon, 28 May 2018 15:03:25 GMT] Referrer-Policy:[origin-when-cross-origin, strict-origin-when-cross-origin] Vary:[Accept, Authorization, Cookie, X-GitHub-OTP] X-Github-Request-Id:[B6A6:1616:2D04882:59538A5:5B0C1A3D] Access-Control-Allow-Origin:[*] Cache-Control:[private, max-age=60, s-maxage=60] Content-Security-Policy:[default-src 'none'] Location:[https://api.github.com/repos/estafette/estafette-letsencrypt-certificate/statuses/d328eba5cd760f98b967715e3f51da1fd00bcc30] X-Xss-Protection:[1; mode=block] Strict-Transport-Security:[max-age=31536000; includeSubdomains; preload] X-Github-Media-Type:[github.machine-man-preview; format=json] X-Ratelimit-Reset:[1527521620] X-Runtime-Rack:[0.194661]] \u001b[36murl\u001b[0m=https://api.github.com/repos/estafette/estafette-letsencrypt-certificate/statuses/d328eba5cd760f98b967715e3f51da1fd00bcc30"
                    },
                    {
                    "timestamp": "2018-05-28T15:03:25.595784652Z",
                    "streamType": "stderr",
                    "text": "\u001b[90m2018-05-28T15:03:25Z\u001b[0m |\u001b[32mINFO\u001b[0m| \u001b[0mFinished estafette-extension-github-status...\u001b[0m"
                    }
                    ],
                    "exitCode": 0,
                    "status": "SUCCEEDED"
                    },
                    {
                    "step": "slack-notify",
                    "image": {
                    "name": "extensions/slack-build-status",
                    "tag": "dev",
                    "isPulled": false,
                    "imageSize": 9185123,
                    "pullDuration": 2391726339
                    },
                    "duration": 725672304,
                    "logLines": [
                    {
                    "timestamp": "2018-05-28T15:03:28.530579174Z",
                    "streamType": "stderr",
                    "text": "\u001b[90m2018-05-28T15:03:28Z\u001b[0m |\u001b[32mINFO\u001b[0m| \u001b[0mStarting estafette-extension-slack-build-status...\u001b[0m \u001b[36mbranch\u001b[0m=master \u001b[36mbuildDate\u001b[0m=2017-09-12T15:48:13Z \u001b[36mgoVersion\u001b[0m=go1.9 \u001b[36mrevision\u001b[0m=d43a57dbd2bfa705af1fbcf6a7cc36ff7f3b9d37"
                    },
                    {
                    "timestamp": "2018-05-28T15:03:28.530588765Z",
                    "streamType": "stderr",
                    "text": "\u001b[90m2018-05-28T15:03:28Z\u001b[0m |\u001b[35mDEBU\u001b[0m| \u001b[0mOverriding slackWebhookURL with slackExtensionWebhookURL\u001b[0m"
                    },
                    {
                    "timestamp": "2018-05-28T15:03:28.741467195Z",
                    "streamType": "stderr",
                    "text": "\u001b[90m2018-05-28T15:03:28Z\u001b[0m |\u001b[32mINFO\u001b[0m| \u001b[0mFinished estafette-extension-slack-build-status...\u001b[0m"
                    }
                    ],
                    "exitCode": 0,
                    "status": "SUCCEEDED"
                    }
                    ]
                    }                        
                    }
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

