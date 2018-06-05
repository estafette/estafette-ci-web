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
            "data": {
                "type": "builds",
                "id": "354276415673794562",
                "attributes": {
                "build-status": "succeeded",
                "build-version": "0.0.60",
                "inserted-at": 1528186981,
                "labels": "",
                "manifest": "builder:\n  track: dev\n\nlabels:\n  app: estafette-ci-web\n  team: estafette-team\n  language: node\n\nversion:\n  semver:\n    major: 0\n    minor: 0\n    patch: '{{auto}}'\n    labelTemplate: '{{branch}}'\n    releaseBranch: master\n\nenv:\n  GCR_PROJECT: estafette.secret(3tHZ9bT_wEz5K8Cx.kZyD5m8L-7-zpvzZ4bkeyUdKLiGfRx_ttoY=)\n\npipelines:\n  set-pending-build-status:\n    image: extensions/github-status:dev\n    status: pending\n    when:\n      server == 'estafette'\n\n  build:\n    image: node:10.1.0-alpine\n    commands:\n    - npm install\n    - npm install -g ember-cli@3.1.3\n    - ember build --environment production\n\n  bake:\n    image: docker:18.03.1-ce\n    commands:\n    - mkdir publish\n    - cp -r dist publish\n    - cp nginx.vh.default.conf ./publish\n    - cp Dockerfile ./publish\n    - docker build -f ./publish/Dockerfile -t estafette/${ESTAFETTE_LABEL_APP}:${ESTAFETTE_BUILD_VERSION} ./publish\n\n  push-to-docker-hub:\n    image: docker:18.03.1-ce\n    env:\n      DOCKER_HUB_USERNAME: estafette.secret(mhN5HP5qcUkpSp4m.s9UnvG027LhQjT-bvvyjYcLKtyd_-xY1Cw==)\n      DOCKER_HUB_PASSWORD: estafette.secret(_oi7CDX50U8qjQSS.U3dzq3cw3J-_-hODYbNtOEDWgeUGzgXk2J0T-WMOmkil56tg)\n    commands:\n    - docker login --username=${DOCKER_HUB_USERNAME} --password=\"${DOCKER_HUB_PASSWORD}\"\n    - docker push estafette/${ESTAFETTE_LABEL_APP}:${ESTAFETTE_BUILD_VERSION}\n    when:\n      status == 'succeeded' &&\n      branch == 'master' &&\n      server == 'gocd'\n\n  set-build-status:\n    image: extensions/github-status:dev\n    when:\n      server == 'estafette'\n\n  slack-notify:\n    image: extensions/slack-build-status:dev\n    webhook: estafette.secret(VQhyeydGURZSFLmh.zxAW1ZVhI7JqLgr9-K7_YuzSFWAasNFRIHAm9OXj2RK_Wa-FWXt9LCCJuD6K6jz_SYpbEhiBWcjd0VkD23AazyLmz3EsImi2C1AJ82ltxuMmN93rPZbdP3kT5vwa)\n    name: ${ESTAFETTE_LABEL_APP}\n    channels:\n    - '#build-status'\n    when:\n      status == 'failed'",
                "repo-branch": "master",
                "repo-name": "estafette-ci-web",
                "repo-owner": "estafette",
                "repo-revision": "34c96df503e8c62e70fe1b9cedb7bec54aa92cda",
                "repo-source": "github.com",
                "updated-at": 1528187094
                }
                }
            };
          });

          this.get('/pipelines/:repoSource/:repoOwner/:repoName/builds/:repoRevision/logs', () => {
            return {
                "data": {
                    "type": "build-logs",
                    "id": "352358891122524161",
                    "attributes": {
                    "inserted-at": 1527601799,
                    "repo-branch": "estafette-extension-bitbucket-status",
                    "repo-name": "estafette",
                    "repo-owner": "github.com",
                    "repo-revision": "master",
                    "repo-source": "a3f0f997c0a70f6c403b048f8b8a9d49c3c77ec6",
                    "steps": [
                    {
                    "step": "git-clone",
                    "image": {
                    "name": "extensions/git-clone",
                    "tag": "dev",
                    "isPulled": false,
                    "imageSize": 31398692,
                    "pullDuration": 3439766775
                    },
                    "duration": 2685832708,
                    "logLines": [
                    {
                    "timestamp": "2018-05-29T13:49:40.289929516Z",
                    "streamType": "stderr",
                    "text": "\u001b[90m2018-05-29T13:49:40Z\u001b[0m |\u001b[32mINFO\u001b[0m| \u001b[0mStarting estafette-extension-git-clone...\u001b[0m \u001b[36mbranch\u001b[0m=master \u001b[36mbuildDate\u001b[0m=2017-09-12T15:48:16Z \u001b[36mgoVersion\u001b[0m=go1.9 \u001b[36mrevision\u001b[0m=dc3c62c0eb70500f095c597d6d06cba20bfc1258"
                    },
                    {
                    "timestamp": "2018-05-29T13:49:40.289987294Z",
                    "streamType": "stderr",
                    "text": "\u001b[90m2018-05-29T13:49:40Z\u001b[0m |\u001b[32mINFO\u001b[0m| \u001b[0mCloning git repository estafette/estafette-extension-bitbucket-status to branch master and revision a3f0f997c0a70f6c403b048f8b8a9d49c3c77ec6...\u001b[0m \u001b[36mbranch\u001b[0m=master \u001b[36mname\u001b[0m=estafette/estafette-extension-bitbucket-status \u001b[36mrevision\u001b[0m=a3f0f997c0a70f6c403b048f8b8a9d49c3c77ec6 \u001b[36murl\u001b[0m=https://x-access-token:v1.2756d9652ecb23622566eaf63a3dde3084a20be4@github.com/estafette/estafette-extension-bitbucket-status"
                    },
                    {
                    "timestamp": "2018-05-29T13:49:40.298045885Z",
                    "streamType": "stderr",
                    "text": "\u001b[90m2018-05-29T13:49:40Z\u001b[0m |\u001b[0m????\u001b[0m| \u001b[0mCloning into '/estafette-work'...\u001b[0m"
                    },
                    {
                    "timestamp": "2018-05-29T13:49:42.406452667Z",
                    "streamType": "stderr",
                    "text": "\u001b[90m2018-05-29T13:49:42Z\u001b[0m |\u001b[32mINFO\u001b[0m| \u001b[0mFinished cloning git repository estafette/estafette-extension-bitbucket-status to branch master and revision a3f0f997c0a70f6c403b048f8b8a9d49c3c77ec6\u001b[0m \u001b[36mbranch\u001b[0m=master \u001b[36mname\u001b[0m=estafette/estafette-extension-bitbucket-status \u001b[36mrevision\u001b[0m=dc3c62c0eb70500f095c597d6d06cba20bfc1258 \u001b[36murl\u001b[0m=https://x-access-token:v1.2756d9652ecb23622566eaf63a3dde3084a20be4@github.com/estafette/estafette-extension-bitbucket-status"
                    },
                    {
                    "timestamp": "2018-05-29T13:49:42.406460404Z",
                    "streamType": "stderr",
                    "text": "\u001b[90m2018-05-29T13:49:42Z\u001b[0m |\u001b[32mINFO\u001b[0m| \u001b[0mFinished estafette-extension-git-clone...\u001b[0m"
                    }
                    ],
                    "exitCode": 0,
                    "status": "SUCCEEDED",
                    "autoInjected": true
                    },
                    {
                    "step": "set-pending-build-status",
                    "image": {
                    "name": "extensions/github-status",
                    "tag": "dev",
                    "isPulled": false,
                    "imageSize": 9152576,
                    "pullDuration": 2017064119
                    },
                    "duration": 1217239938,
                    "logLines": [
                    {
                    "timestamp": "2018-05-29T13:49:44.965077738Z",
                    "streamType": "stderr",
                    "text": "\u001b[90m2018-05-29T13:49:44Z\u001b[0m |\u001b[32mINFO\u001b[0m| \u001b[0mStarting estafette-extension-github-status...\u001b[0m \u001b[36mbranch\u001b[0m=master \u001b[36mbuildDate\u001b[0m=2017-09-12T15:47:12Z \u001b[36mgoVersion\u001b[0m=go1.9 \u001b[36mrevision\u001b[0m=70223113f82448e09380cc709495c9f921bb7d3d"
                    },
                    {
                    "timestamp": "2018-05-29T13:49:45.594105294Z",
                    "streamType": "stderr",
                    "text": "\u001b[90m2018-05-29T13:49:45Z\u001b[0m |\u001b[35mDEBU\u001b[0m| \u001b[0mReceived response for 'https://api.github.com/repos/estafette/estafette-extension-bitbucket-status/statuses/a3f0f997c0a70f6c403b048f8b8a9d49c3c77ec6' Github api call...\u001b[0m \u001b[36mrequestBody\u001b[0m=map[target_url:https://estafette.travix.com/logs/github.com/estafette/estafette-extension-bitbucket-status/master/a3f0f997c0a70f6c403b048f8b8a9d49c3c77ec6 state:pending] \u001b[36mrequestHeaders\u001b[0m=map[Accept:[application/vnd.github.machine-man-preview+json] Authorization:[token v1.2756d9652ecb23622566eaf63a3dde3084a20be4]] \u001b[36mrequestMethod\u001b[0m=POST \u001b[36mresponseBody\u001b[0m=map[url:https://api.github.com/repos/estafette/estafette-extension-bitbucket-status/statuses/a3f0f997c0a70f6c403b048f8b8a9d49c3c77ec6 context:default id:5.011071774e+09 state:pending target_url:https://estafette.travix.com/logs/github.com/estafette/estafette-extension-bitbucket-status/master/a3f0f997c0a70f6c403b048f8b8a9d49c3c77ec6 updated_at:2018-05-29T13:49:45Z created_at:2018-05-29T13:49:45Z creator:map[followers_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/followers id:3.0898972e+07 following_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/following{/other_user} gravatar_id: organizations_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/orgs starred_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/starred{/owner}{/repo} subscriptions_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/subscriptions type:Bot avatar_url:https://avatars2.githubusercontent.com/u/13119702?v=4 events_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/events{/privacy} html_url:https://github.com/apps/estafette-travix-com login:estafette-travix-com[bot] repos_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/repos url:https://api.github.com/users/estafette-travix-com%5Bbot%5D gists_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/gists{/gist_id} received_events_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/received_events site_admin:false] description:<nil>] \u001b[36mresponseHeaders\u001b[0m=map[Content-Length:[1564] Date:[Tue, 29 May 2018 13:49:45 GMT] X-Github-Request-Id:[BBB4:6AAF:2E771F3:611C80F:5B0D5A79] X-Runtime-Rack:[0.252784] Access-Control-Allow-Origin:[*] Content-Security-Policy:[default-src 'none'] Content-Type:[application/json; charset=utf-8] Location:[https://api.github.com/repos/estafette/estafette-extension-bitbucket-status/statuses/a3f0f997c0a70f6c403b048f8b8a9d49c3c77ec6] Referrer-Policy:[origin-when-cross-origin, strict-origin-when-cross-origin] Server:[GitHub.com] Status:[201 Created] Strict-Transport-Security:[max-age=31536000; includeSubdomains; preload] X-Content-Type-Options:[nosniff] X-Github-Media-Type:[github.machine-man-preview; format=json] X-Ratelimit-Limit:[5100] X-Ratelimit-Remaining:[5086] Access-Control-Expose-Headers:[ETag, Link, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval] Cache-Control:[private, max-age=60, s-maxage=60] Etag:[\"67644ffcb57dc31867d5d2b33fa578e1\"] Vary:[Accept, Authorization, Cookie, X-GitHub-OTP] X-Frame-Options:[deny] X-Ratelimit-Reset:[1527604181] X-Xss-Protection:[1; mode=block]] \u001b[36murl\u001b[0m=https://api.github.com/repos/estafette/estafette-extension-bitbucket-status/statuses/a3f0f997c0a70f6c403b048f8b8a9d49c3c77ec6"
                    },
                    {
                    "timestamp": "2018-05-29T13:49:45.59411387Z",
                    "streamType": "stderr",
                    "text": "\u001b[90m2018-05-29T13:49:45Z\u001b[0m |\u001b[32mINFO\u001b[0m| \u001b[0mFinished estafette-extension-github-status...\u001b[0m"
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
                    "imageSize": 1375644187,
                    "pullDuration": 8745457612
                    },
                    "duration": 735887098,
                    "logLines": [
                    {
                    "timestamp": "2018-05-29T13:49:55.122160894Z",
                    "streamType": "stderr",
                    "text": "bitbucketApiClient.go:12:2: cannot find package \"github.com/rs/zerolog/log\" in any of:"
                    },
                    {
                    "timestamp": "2018-05-29T13:49:55.122226049Z",
                    "streamType": "stderr",
                    "text": "\t/go/src/github.com/estafette/estafette-extension-bitbucket-status/vendor/github.com/rs/zerolog/log (vendor tree)"
                    },
                    {
                    "timestamp": "2018-05-29T13:49:55.12225973Z",
                    "streamType": "stderr",
                    "text": "\t/usr/local/go/src/github.com/rs/zerolog/log (from $GOROOT)"
                    },
                    {
                    "timestamp": "2018-05-29T13:49:55.122298858Z",
                    "streamType": "stderr",
                    "text": "\t/go/src/github.com/rs/zerolog/log (from $GOPATH)"
                    }
                    ],
                    "exitCode": 1,
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
                    "duration": 1311413609,
                    "logLines": [
                    {
                    "timestamp": "2018-05-29T13:49:55.615967267Z",
                    "streamType": "stderr",
                    "text": "\u001b[90m2018-05-29T13:49:55Z\u001b[0m |\u001b[32mINFO\u001b[0m| \u001b[0mStarting estafette-extension-github-status...\u001b[0m \u001b[36mbranch\u001b[0m=master \u001b[36mbuildDate\u001b[0m=2017-09-12T15:47:12Z \u001b[36mgoVersion\u001b[0m=go1.9 \u001b[36mrevision\u001b[0m=70223113f82448e09380cc709495c9f921bb7d3d"
                    },
                    {
                    "timestamp": "2018-05-29T13:49:56.355225651Z",
                    "streamType": "stderr",
                    "text": "\u001b[90m2018-05-29T13:49:56Z\u001b[0m |\u001b[35mDEBU\u001b[0m| \u001b[0mReceived response for 'https://api.github.com/repos/estafette/estafette-extension-bitbucket-status/statuses/a3f0f997c0a70f6c403b048f8b8a9d49c3c77ec6' Github api call...\u001b[0m \u001b[36mrequestBody\u001b[0m=map[state:failure target_url:https://estafette.travix.com/logs/github.com/estafette/estafette-extension-bitbucket-status/master/a3f0f997c0a70f6c403b048f8b8a9d49c3c77ec6] \u001b[36mrequestHeaders\u001b[0m=map[Accept:[application/vnd.github.machine-man-preview+json] Authorization:[token v1.2756d9652ecb23622566eaf63a3dde3084a20be4]] \u001b[36mrequestMethod\u001b[0m=POST \u001b[36mresponseBody\u001b[0m=map[target_url:https://estafette.travix.com/logs/github.com/estafette/estafette-extension-bitbucket-status/master/a3f0f997c0a70f6c403b048f8b8a9d49c3c77ec6 context:default created_at:2018-05-29T13:49:56Z creator:map[following_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/following{/other_user} html_url:https://github.com/apps/estafette-travix-com repos_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/repos site_admin:false login:estafette-travix-com[bot] subscriptions_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/subscriptions type:Bot avatar_url:https://avatars2.githubusercontent.com/u/13119702?v=4 events_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/events{/privacy} followers_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/followers starred_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/starred{/owner}{/repo} url:https://api.github.com/users/estafette-travix-com%5Bbot%5D gists_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/gists{/gist_id} gravatar_id: id:3.0898972e+07 organizations_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/orgs received_events_url:https://api.github.com/users/estafette-travix-com%5Bbot%5D/received_events] description:<nil> id:5.011072858e+09 state:failure updated_at:2018-05-29T13:49:56Z url:https://api.github.com/repos/estafette/estafette-extension-bitbucket-status/statuses/a3f0f997c0a70f6c403b048f8b8a9d49c3c77ec6] \u001b[36mresponseHeaders\u001b[0m=map[Access-Control-Allow-Origin:[*] Content-Type:[application/json; charset=utf-8] Vary:[Accept, Authorization, Cookie, X-GitHub-OTP] X-Github-Request-Id:[AF64:6AAE:404D79B:7976E30:5B0D5A83] Content-Length:[1564] Content-Security-Policy:[default-src 'none'] Date:[Tue, 29 May 2018 13:49:56 GMT] Strict-Transport-Security:[max-age=31536000; includeSubdomains; preload] X-Ratelimit-Limit:[5100] X-Ratelimit-Reset:[1527604181] X-Xss-Protection:[1; mode=block] Etag:[\"936b845b5759d0bd2c9680fd3bd16c06\"] X-Content-Type-Options:[nosniff] X-Frame-Options:[deny] X-Github-Media-Type:[github.machine-man-preview; format=json] X-Ratelimit-Remaining:[5085] Status:[201 Created] X-Runtime-Rack:[0.359301] Access-Control-Expose-Headers:[ETag, Link, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval] Cache-Control:[private, max-age=60, s-maxage=60] Location:[https://api.github.com/repos/estafette/estafette-extension-bitbucket-status/statuses/a3f0f997c0a70f6c403b048f8b8a9d49c3c77ec6] Referrer-Policy:[origin-when-cross-origin, strict-origin-when-cross-origin] Server:[GitHub.com]] \u001b[36murl\u001b[0m=https://api.github.com/repos/estafette/estafette-extension-bitbucket-status/statuses/a3f0f997c0a70f6c403b048f8b8a9d49c3c77ec6"
                    },
                    {
                    "timestamp": "2018-05-29T13:49:56.355237565Z",
                    "streamType": "stderr",
                    "text": "\u001b[90m2018-05-29T13:49:56Z\u001b[0m |\u001b[32mINFO\u001b[0m| \u001b[0mFinished estafette-extension-github-status...\u001b[0m"
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
                    "pullDuration": 2157171676
                    },
                    "duration": 111842450599,
                    "logLines": [
                    {
                    "timestamp": "2018-05-29T13:49:59.137856798Z",
                    "streamType": "stderr",
                    "text": "\u001b[90m2018-05-29T13:49:59Z\u001b[0m |\u001b[32mINFO\u001b[0m| \u001b[0mStarting estafette-extension-slack-build-status...\u001b[0m \u001b[36mbranch\u001b[0m=master \u001b[36mbuildDate\u001b[0m=2017-09-12T15:48:13Z \u001b[36mgoVersion\u001b[0m=go1.9 \u001b[36mrevision\u001b[0m=d43a57dbd2bfa705af1fbcf6a7cc36ff7f3b9d37"
                    },
                    {
                    "timestamp": "2018-05-29T13:49:59.137869285Z",
                    "streamType": "stderr",
                    "text": "\u001b[90m2018-05-29T13:49:59Z\u001b[0m |\u001b[35mDEBU\u001b[0m| \u001b[0mOverriding slackWebhookURL with slackExtensionWebhookURL\u001b[0m"
                    },
                    {
                    "timestamp": "2018-05-29T13:49:59.378928587Z",
                    "streamType": "stderr",
                    "text": "\u001b[90m2018-05-29T13:49:59Z\u001b[0m |\u001b[32mINFO\u001b[0m| \u001b[0mFinished estafette-extension-slack-build-status...\u001b[0m"
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

