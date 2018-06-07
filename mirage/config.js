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
            "type": "pipelines",
            "id": "354360051318030337",
            "attributes": {
            "build-status": "succeeded",
            "build-version": "0.0.75",
            "inserted-at": 1528212505,
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
            ],
            "manifest": "builder:\n  track: dev\n\nlabels:\n  app: estafette-ci-api\n  team: estafette-team\n  language: golang\n\nversion:\n  semver:\n    major: 0\n    minor: 0\n    patch: '{{auto}}'\n    labelTemplate: '{{branch}}'\n    releaseBranch: master\n\npipelines:\n  set-pending-build-status:\n    image: extensions/github-status:dev\n    status: pending\n    when:\n      server == 'estafette'\n\n  build:\n    image: golang:1.10.2-alpine3.7\n    workDir: /go/src/github.com/estafette/${ESTAFETTE_LABEL_APP}\n    commands:\n    - go test `go list ./... | grep -v /vendor/`\n    - CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags \"-X main.version=${ESTAFETTE_BUILD_VERSION} -X main.revision=${ESTAFETTE_GIT_REVISION} -X main.branch=${ESTAFETTE_GIT_BRANCH} -X main.buildDate=${ESTAFETTE_BUILD_DATETIME}\" -o ./publish/${ESTAFETTE_LABEL_APP} .\n\n  bake:\n    image: docker:18.03.1-ce\n    commands:\n    - cp Dockerfile ./publish\n    - cp /etc/ssl/certs/ca-certificates.crt ./publish\n    - cp -r ./cockroach/migrations ./publish/\n    - docker build -t estafette/${ESTAFETTE_LABEL_APP}:${ESTAFETTE_BUILD_VERSION} ./publish\n\n  push-to-docker-hub:\n    image: docker:18.03.1-ce\n    env:\n      DOCKER_HUB_USERNAME: estafette.secret(IXFQ9igip3IH0KVY.N6RTT4RB9dz15UGKHQUBctAf5QNI8G8QYg==)\n      DOCKER_HUB_PASSWORD: estafette.secret(zhN34B3iKmWis2t-.guUQYqZPjXTjaWK4G6ZU4n-DYyOZvigT2tdRYEP3zQddr4HA)\n    commands:\n    - docker login --username=${DOCKER_HUB_USERNAME} --password=\"${DOCKER_HUB_PASSWORD}\"\n    - docker push estafette/${ESTAFETTE_LABEL_APP}:${ESTAFETTE_BUILD_VERSION}\n    when:\n      status == 'succeeded' &&\n      branch == 'master' &&\n      server == 'gocd'\n\n  set-build-status:\n    image: extensions/github-status:dev\n    when:\n      server == 'estafette'\n\n  slack-notify:\n    image: extensions/slack-build-status:dev\n    webhook: estafette.secret(08UOJSF6Fvdz9u2X.lzsCArDpf97g7i2Vx-3UTyWsxCB81e05jthdY_AI3OffXBA-NurQePraQqzNf-9IhdoDvr1Akg0yom4S2kHjvWLhRC8Y7xgheK8MR6qPu2oi3QvlYbnNtTTOOjMi)\n    name: ${ESTAFETTE_LABEL_APP}\n    channels:\n    - '#build-status'\n    when:\n      status == 'failed'",
            "repo-branch": "master",
            "repo-name": "estafette-ci-api",
            "repo-owner": "estafette",
            "repo-revision": "795549a1b02eb50e41d34a13edbcf4253a95b7a1",
            "repo-source": "github.com",
            "updated-at": 1528212590
            }
            },
            {
            "type": "pipelines",
            "id": "354305791495831555",
            "attributes": {
            "build-status": "failed",
            "build-version": "0.0.30",
            "inserted-at": 1528195946,
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
            ],
            "manifest": "builder:\n  track: stable\n\nlabels:\n  app: estafette-ci-builder\n  team: estafette-team\n  language: golang\n\nversion:\n  semver:\n    major: 0\n    minor: 0\n    patch: '{{auto}}'\n    labelTemplate: '{{branch}}'\n    releaseBranch: master\n\nenv:\n  GCR_PROJECT: estafette.secret(3tHZ9bT_wEz5K8Cx.kZyD5m8L-7-zpvzZ4bkeyUdKLiGfRx_ttoY=)\n\npipelines:\n  set-pending-build-status:\n    image: extensions/github-status:dev\n    status: pending\n    when:\n      server == 'estafette'\n\n  build:\n    image: golang:1.10.2-alpine3.7\n    workDir: /go/src/github.com/estafette/${ESTAFETTE_LABEL_APP}\n    commands:\n    - apk --update add git\n    - go test `go list ./... | grep -v /vendor/`\n    - CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags \"-X main.version=${ESTAFETTE_BUILD_VERSION} -X main.revision=${ESTAFETTE_GIT_REVISION} -X main.branch=${ESTAFETTE_GIT_BRANCH} -X main.buildDate=${ESTAFETTE_BUILD_DATETIME}\" -o ./publish/${ESTAFETTE_LABEL_APP} .\n\n  bake-estafette:\n    image: docker:18.03.1-ce\n    commands:\n    - cp Dockerfile ./publish\n    - docker build -f ./publish/Dockerfile -t estafette/${ESTAFETTE_LABEL_APP}:${ESTAFETTE_BUILD_VERSION} ./publish\n\n  push-to-docker-hub:\n    image: docker:18.03.1-ce\n    env:\n      DOCKER_HUB_USERNAME: estafette.secret(mhN5HP5qcUkpSp4m.s9UnvG027LhQjT-bvvyjYcLKtyd_-xY1Cw==)\n      DOCKER_HUB_PASSWORD: estafette.secret(_oi7CDX50U8qjQSS.U3dzq3cw3J-_-hODYbNtOEDWgeUGzgXk2J0T-WMOmkil56tg)\n    commands:\n    - docker login --username=${DOCKER_HUB_USERNAME} --password=\"${DOCKER_HUB_PASSWORD}\"\n    - docker push estafette/${ESTAFETTE_LABEL_APP}:${ESTAFETTE_BUILD_VERSION}\n    when:\n      status == 'succeeded' &&\n      branch == 'master' &&\n      server == 'gocd'\n\n  bake-gocd-agent:\n    image: docker:18.03.1-ce\n    commands:\n    - cp Dockerfile.gocd ./publish\n    - docker build -f ./publish/Dockerfile.gocd -t gcr.io/${GCR_PROJECT}/${ESTAFETTE_LABEL_APP}:${ESTAFETTE_BUILD_VERSION} ./publish\n\n  push-to-gcr-io:\n    image: docker:18.03.1-ce\n    commands:\n    - docker login --username=_json_key --password=\"$ESTAFETTE_GCR_PASSWORD\" https://gcr.io\n    - docker push gcr.io/${GCR_PROJECT}/${ESTAFETTE_LABEL_APP}:${ESTAFETTE_BUILD_VERSION}\n    when:\n      status == 'succeeded' &&\n      branch == 'master' &&\n      server == 'gocd'\n\n  set-build-status:\n    image: extensions/github-status:dev\n    when:\n      server == 'estafette'\n\n  slack-notify:\n    image: extensions/slack-build-status:dev\n    webhook: estafette.secret(VQhyeydGURZSFLmh.zxAW1ZVhI7JqLgr9-K7_YuzSFWAasNFRIHAm9OXj2RK_Wa-FWXt9LCCJuD6K6jz_SYpbEhiBWcjd0VkD23AazyLmz3EsImi2C1AJ82ltxuMmN93rPZbdP3kT5vwa)\n    name: ${ESTAFETTE_LABEL_APP}\n    channels:\n    - '#build-status'\n    when:\n      status == 'failed'",
            "repo-branch": "master",
            "repo-name": "estafette-ci-builder",
            "repo-owner": "estafette",
            "repo-revision": "4b623d9b1779d90f8518e9a7cf483e17c264d054",
            "repo-source": "github.com",
            "updated-at": 1528196029
            }
            },
            {
            "type": "pipelines",
            "id": "354300849018994691",
            "attributes": {
            "build-status": "succeeded",
            "build-version": "0.0.7",
            "inserted-at": 1528194438,
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
            ],
            "manifest": "builder:\n  track: dev\n\nlabels:\n  app: estafette-ci-contracts\n  team: estafette-team\n  language: golang\n\nversion:\n  semver:\n    major: 0\n    minor: 0\n    patch: '{{auto}}'\n    labelTemplate: '{{branch}}'\n    releaseBranch: master\n\npipelines:\n  set-pending-build-status:\n    image: extensions/github-status:dev\n    status: pending\n\n  build:\n    image: golang:1.10.2-alpine3.7\n    workDir: /go/src/github.com/estafette/${ESTAFETTE_LABEL_APP}\n    commands:\n    - go test -v `go list ./... | grep -v /vendor/`\n\n  tag-revision:\n    image: golang:1.10.2-alpine3.7\n    commands:\n    - apk --no-cache add git\n    - git tag ${ESTAFETTE_BUILD_VERSION}\n    - git push origin ${ESTAFETTE_BUILD_VERSION}\n\n  set-build-status:\n    image: extensions/github-status:dev\n\n  slack-notify:\n    image: extensions/slack-build-status:dev\n    webhook: estafette.secret(PiUCBMW1LEeyFk3i.vn0sEYGK_QU_tXtxQ7PbQra1L8a-reYGkDbzP9K9A6NzKbsf4CExtahJW7JjViXCtxuRlAt_c4kYF2oBRaCQ_4x3iDWLUp4P7AkchXI9Es4l7eeUWfB3A-Lpy4LG)\n    name: ${ESTAFETTE_LABEL_APP}\n    channels:\n    - '#build-status'\n    when:\n      status == 'failed'",
            "repo-branch": "master",
            "repo-name": "estafette-ci-contracts",
            "repo-owner": "estafette",
            "repo-revision": "f58d8cdc4ef6dc9cad38a3d28a9b0aacda54f8db",
            "repo-source": "github.com",
            "updated-at": 1528194473
            }
            },
            {
            "type": "pipelines",
            "id": "351185989702582275",
            "attributes": {
            "build-status": "succeeded",
            "build-version": "0.0.2",
            "inserted-at": 1527243858,
            "labels": "",
            "manifest": "builder:\n  track: dev\n\nlabels:\n  app: estafette-ci-crypt\n  team: estafette-team\n  language: golang\n\nversion:\n  semver:\n    major: 0\n    minor: 0\n    patch: '{{auto}}'\n    labelTemplate: '{{branch}}'\n    releaseBranch: master\n\npipelines:\n  set-pending-build-status:\n    image: extensions/github-status:dev\n    status: pending\n\n  build:\n    image: golang:1.10.2-alpine3.7\n    workDir: /go/src/github.com/estafette/${ESTAFETTE_LABEL_APP}\n    commands:\n    - go test -v `go list ./... | grep -v /vendor/`\n\n  tag-revision:\n    image: golang:1.10.2-alpine3.7\n    commands:\n    - apk --no-cache add git\n    - git tag ${ESTAFETTE_BUILD_VERSION}\n    - git push origin ${ESTAFETTE_BUILD_VERSION}\n\n  set-build-status:\n    image: extensions/github-status:dev\n\n  slack-notify:\n    image: extensions/slack-build-status:dev\n    webhook: estafette.secret(fG4kwm5DOqzVjkqB.3kNhXhStG_Wmf8ZR9fKwTLwbj7RKlLiwE2LFD17GwhEVqe_7Y2m6K-FECC9Exo6A04LbJXGK-MtVEi_2L-MntNNYIz212MxsvHkObll_G3bQ8wZQHg9xOwJAKP3d)\n    name: ${ESTAFETTE_LABEL_APP}\n    channels:\n    - '#build-status'\n    when:\n      status == 'failed'",
            "repo-branch": "master",
            "repo-name": "estafette-ci-crypt",
            "repo-owner": "estafette",
            "repo-revision": "cb7bb0f87f7b4b4eb6ef2b1cd5c83396507ca362",
            "repo-source": "github.com",
            "updated-at": 1527243896
            }
            },
            {
            "type": "pipelines",
            "id": "354296156081192961",
            "attributes": {
            "build-status": "succeeded",
            "build-version": "0.1.9",
            "inserted-at": 1528193006,
            "labels": "",
            "manifest": "builder:\n  track: dev\n\nlabels:\n  app: estafette-ci-manifest\n  team: estafette-team\n  language: golang\n\nversion:\n  semver:\n    major: 0\n    minor: 1\n    patch: '{{auto}}'\n    labelTemplate: '{{branch}}'\n    releaseBranch: master\n\npipelines:\n  set-pending-build-status:\n    image: extensions/github-status:dev\n    status: pending\n\n  build:\n    image: golang:1.10.2-alpine3.7\n    workDir: /go/src/github.com/estafette/${ESTAFETTE_LABEL_APP}\n    commands:\n    - go test -v `go list ./... | grep -v /vendor/`\n\n  tag-revision:\n    image: golang:1.10.2-alpine3.7\n    commands:\n    - apk --no-cache add git\n    - git tag ${ESTAFETTE_BUILD_VERSION}\n    - git push origin ${ESTAFETTE_BUILD_VERSION}\n\n  set-build-status:\n    image: extensions/github-status:dev\n\n  slack-notify:\n    image: extensions/slack-build-status:dev\n    webhook: estafette.secret(PiUCBMW1LEeyFk3i.vn0sEYGK_QU_tXtxQ7PbQra1L8a-reYGkDbzP9K9A6NzKbsf4CExtahJW7JjViXCtxuRlAt_c4kYF2oBRaCQ_4x3iDWLUp4P7AkchXI9Es4l7eeUWfB3A-Lpy4LG)\n    name: ${ESTAFETTE_LABEL_APP}\n    channels:\n    - '#build-status'\n    when:\n      status == 'failed'",
            "repo-branch": "master",
            "repo-name": "estafette-ci-manifest",
            "repo-owner": "estafette",
            "repo-revision": "181e7b27ae61bd8e2dbd3f4be6e9a8118c0821e9",
            "repo-source": "github.com",
            "updated-at": 1528193038
            }
            },
            {
            "type": "pipelines",
            "id": "354342788789764098",
            "attributes": {
            "build-status": "succeeded",
            "build-version": "0.0.67",
            "inserted-at": 1528207237,
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
            ],
            "manifest": "builder:\n  track: dev\n\nlabels:\n  app: estafette-ci-web\n  team: estafette-team\n  language: node\n\nversion:\n  semver:\n    major: 0\n    minor: 0\n    patch: '{{auto}}'\n    labelTemplate: '{{branch}}'\n    releaseBranch: master\n\nenv:\n  GCR_PROJECT: estafette.secret(3tHZ9bT_wEz5K8Cx.kZyD5m8L-7-zpvzZ4bkeyUdKLiGfRx_ttoY=)\n\npipelines:\n  set-pending-build-status:\n    image: extensions/github-status:dev\n    status: pending\n    when:\n      server == 'estafette'\n\n  build:\n    image: node:10.1.0-alpine\n    commands:\n    - npm install\n    - npm install -g ember-cli@3.1.3\n    - ember build --environment production\n\n  bake:\n    image: docker:18.03.1-ce\n    commands:\n    - mkdir publish\n    - cp -r dist publish\n    - cp nginx.vh.default.conf ./publish\n    - cp Dockerfile ./publish\n    - docker build -f ./publish/Dockerfile -t estafette/${ESTAFETTE_LABEL_APP}:${ESTAFETTE_BUILD_VERSION} ./publish\n\n  push-to-docker-hub:\n    image: docker:18.03.1-ce\n    env:\n      DOCKER_HUB_USERNAME: estafette.secret(mhN5HP5qcUkpSp4m.s9UnvG027LhQjT-bvvyjYcLKtyd_-xY1Cw==)\n      DOCKER_HUB_PASSWORD: estafette.secret(_oi7CDX50U8qjQSS.U3dzq3cw3J-_-hODYbNtOEDWgeUGzgXk2J0T-WMOmkil56tg)\n    commands:\n    - docker login --username=${DOCKER_HUB_USERNAME} --password=\"${DOCKER_HUB_PASSWORD}\"\n    - docker push estafette/${ESTAFETTE_LABEL_APP}:${ESTAFETTE_BUILD_VERSION}\n    when:\n      status == 'succeeded' &&\n      branch == 'master' &&\n      server == 'gocd'\n\n  set-build-status:\n    image: extensions/github-status:dev\n    when:\n      server == 'estafette'\n\n  slack-notify:\n    image: extensions/slack-build-status:dev\n    webhook: estafette.secret(VQhyeydGURZSFLmh.zxAW1ZVhI7JqLgr9-K7_YuzSFWAasNFRIHAm9OXj2RK_Wa-FWXt9LCCJuD6K6jz_SYpbEhiBWcjd0VkD23AazyLmz3EsImi2C1AJ82ltxuMmN93rPZbdP3kT5vwa)\n    name: ${ESTAFETTE_LABEL_APP}\n    channels:\n    - '#build-status'\n    when:\n      status == 'failed'",
            "repo-branch": "master",
            "repo-name": "estafette-ci-web",
            "repo-owner": "estafette",
            "repo-revision": "6ef2ce089f66fca05d5a396629eb54dd177576ec",
            "repo-source": "github.com",
            "updated-at": 1528207356
            }
            },
            {
            "type": "pipelines",
            "id": "352084362610016257",
            "attributes": {
            "build-status": "succeeded",
            "build-version": "1.0.14",
            "inserted-at": 1527518020,
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
            ],
            "manifest": "builder:\n  track: dev\n\nlabels:\n  app: estafette-cloudflare-dns\n  team: estafette-team\n  language: golang\n\nversion:\n  semver:\n    major: 1\n    minor: 0\n    patch: '{{auto}}'\n    labelTemplate: '{{branch}}'\n    releaseBranch: master\n\npipelines:\n  set-pending-build-status:\n    image: extensions/github-status:dev\n    status: pending\n    when:\n      server == 'estafette'\n\n  build:\n    image: golang:1.10.2-alpine3.7\n    workDir: /go/src/github.com/estafette/${ESTAFETTE_LABEL_APP}\n    commands:\n    - go test `go list ./... | grep -v /vendor/`\n    - CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags \"-X main.version=${ESTAFETTE_BUILD_VERSION} -X main.revision=${ESTAFETTE_GIT_REVISION} -X main.branch=${ESTAFETTE_GIT_BRANCH} -X main.buildDate=${ESTAFETTE_BUILD_DATETIME}\" -o ./publish/${ESTAFETTE_LABEL_APP} .\n\n  bake:\n    image: docker:18.03.1-ce\n    commands:\n    - cp Dockerfile ./publish\n    - cp /etc/ssl/certs/ca-certificates.crt ./publish\n    - docker build -t estafette/${ESTAFETTE_LABEL_APP}:${ESTAFETTE_BUILD_VERSION} ./publish\n\n  push-to-docker-hub:\n    image: docker:18.03.1-ce\n    env:\n      DOCKER_HUB_USERNAME: estafette.secret(D8gy3KO6Fil7FaKs.KHLH6NCrIPtk6ObXaC_Y7i4xE2OY6QiorA==)\n      DOCKER_HUB_PASSWORD: estafette.secret(ZpEKNFi_HPbvD_9g.Ugs4lPe9GgXgTKkfmSaE6A7yotFfxRilGRMV3DIEox2UmqdK)\n    commands:\n    - docker login --username=${DOCKER_HUB_USERNAME} --password=\"${DOCKER_HUB_PASSWORD}\"\n    - docker push estafette/${ESTAFETTE_LABEL_APP}:${ESTAFETTE_BUILD_VERSION}\n    when:\n      status == 'succeeded' &&\n      branch == 'master' &&\n      server == 'gocd'\n\n  set-build-status:\n    image: extensions/github-status:dev\n    when:\n      server == 'estafette'\n\n  slack-notify:\n    image: extensions/slack-build-status:dev\n    webhook: estafette.secret(49oDHA1GU2Y9uNr9.1_rY9ehRjYRsHnVoW-_CcP70z2EvWYgcb3U7BteamAQgx6iXo_Zrgcf_ESs4AgvhA_o20FPllOoX6GoZ4VvZqepcS5KaOIi032ljAPDSO8-7xveayDxl63XGqp2c)\n    name: ${ESTAFETTE_LABEL_APP}\n    channels:\n    - '#build-status'\n    when:\n      status == 'failed'\n",
            "repo-branch": "master",
            "repo-name": "estafette-cloudflare-dns",
            "repo-owner": "estafette",
            "repo-revision": "189822540c95206bec2e5f4d3e66a724cad8e481",
            "repo-source": "github.com",
            "updated-at": 1527518082
            }
            },
            {
            "type": "pipelines",
            "id": "354307361707622401",
            "attributes": {
            "build-status": "succeeded",
            "build-version": "0.0.8",
            "inserted-at": 1528196425,
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
            ],
            "manifest": "builder:\n  track: dev\n\nlabels:\n  app: estafette-extension-bitbucket-status\n  team: estafette-team\n  language: golang\n\nversion:\n  semver:\n    major: 0\n    minor: 0\n    patch: '{{auto}}'\n    labelTemplate: '{{branch}}'\n    releaseBranch: master\n\npipelines:\n  set-pending-build-status:\n    image: extensions/github-status:dev\n    status: pending\n    when:\n      server == 'estafette'\n\n  build:\n    image: golang:1.10.2-alpine3.7\n    workDir: /go/src/github.com/estafette/${ESTAFETTE_LABEL_APP}\n    commands:\n    - go test `go list ./... | grep -v /vendor/`\n    - CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags \"-X main.version=${ESTAFETTE_BUILD_VERSION} -X main.revision=${ESTAFETTE_GIT_REVISION} -X main.branch=${ESTAFETTE_GIT_BRANCH} -X main.buildDate=${ESTAFETTE_BUILD_DATETIME}\" -o ./publish/${ESTAFETTE_LABEL_APP} .\n\n  bake:\n    image: docker:18.03.1-ce\n    commands:\n    - cp Dockerfile ./publish\n    - cp /etc/ssl/certs/ca-certificates.crt ./publish\n    - docker build -t extensions/bitbucket-status:${ESTAFETTE_BUILD_VERSION} ./publish\n\n  push-to-docker-hub:\n    image: docker:18.03.1-ce\n    env:\n      DOCKER_HUB_USERNAME: estafette.secret(LNvaLcgdUdvZ_BkY.9_TYvXR6z04X8YXUQOoL-1SWrC9L87p5-w==)\n      DOCKER_HUB_PASSWORD: estafette.secret(ZoLyjV5aAc1Wooou.aw7ofN4gWzKoYWwH83lyQkZjmfM6g12xDQ8mm0sAQKV8Awll)\n    commands:\n    - docker login --username=${DOCKER_HUB_USERNAME} --password=\"${DOCKER_HUB_PASSWORD}\"\n    - docker push extensions/bitbucket-status:${ESTAFETTE_BUILD_VERSION}\n    - docker tag extensions/bitbucket-status:${ESTAFETTE_BUILD_VERSION} extensions/bitbucket-status:dev\n    - docker push extensions/bitbucket-status:dev\n    when:\n      status == 'succeeded' &&\n      branch == 'master' &&\n      server == 'gocd'\n\n  set-build-status:\n    image: extensions/github-status:dev\n    when:\n      server == 'estafette'\n\n  slack-notify:\n    image: extensions/slack-build-status:dev\n    webhook: estafette.secret(1zk0MnrSo6zqBubh.yttaHQKGoDrlVA9hjZJsq9zHqy_VGlJAOcmWnZE_W2jRkngzlKC634vDxOVbJfixk5MgsX48z8XX41i_tlKBnEulhdGh8hTCozpH_qZ34Lv4V7MfTC70tAFvZbY1)\n    name: ${ESTAFETTE_LABEL_APP}\n    channels:\n    - '#build-status'\n    when:\n      status == 'failed'",
            "repo-branch": "master",
            "repo-name": "estafette-extension-bitbucket-status",
            "repo-owner": "estafette",
            "repo-revision": "b8c493d4f5ee96fb197eba5a912bda66877ba1ec",
            "repo-source": "github.com",
            "updated-at": 1528196469
            }
            },
            {
            "type": "pipelines",
            "id": "354070739473072130",
            "attributes": {
            "build-status": "succeeded",
            "build-version": "0.0.5",
            "inserted-at": 1528124214,
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
            ],
            "manifest": "builder:\n  track: stable\n\nlabels:\n  app: estafette-extension-git-clone\n  team: estafette-team\n  language: golang\n\nversion:\n  semver:\n    major: 0\n    minor: 0\n    patch: '{{auto}}'\n    labelTemplate: '{{branch}}'\n    releaseBranch: master\n\npipelines:\n  set-pending-build-status:\n    image: extensions/github-status:dev\n    status: pending\n    when:\n      server == 'estafette'\n\n  build:\n    image: golang:1.10.2-alpine3.7\n    workDir: /go/src/github.com/estafette/${ESTAFETTE_LABEL_APP}\n    commands:\n    - go test `go list ./... | grep -v /vendor/`\n    - CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags \"-X main.version=${ESTAFETTE_BUILD_VERSION} -X main.revision=${ESTAFETTE_GIT_REVISION} -X main.branch=${ESTAFETTE_GIT_BRANCH} -X main.buildDate=${ESTAFETTE_BUILD_DATETIME}\" -o ./publish/${ESTAFETTE_LABEL_APP} .\n\n  bake:\n    image: docker:18.03.1-ce\n    commands:\n    - cp Dockerfile ./publish\n    - docker build -t extensions/git-clone:${ESTAFETTE_BUILD_VERSION} ./publish\n\n  push-to-docker-hub:\n    image: docker:18.03.1-ce\n    env:\n      DOCKER_HUB_USERNAME: estafette.secret(793-0QLfe5QN3n1k.mDk5fL-_urybZ3T9Z3famkSZR68d-SrfqA==)\n      DOCKER_HUB_PASSWORD: estafette.secret(3p0Geq5U12j98HXV.Eaupah0YHK6nQkMgT4WYzC5R8FRQbDk5H6aTo1saw35de2KQ)\n    commands:\n    - docker login --username=${DOCKER_HUB_USERNAME} --password=\"${DOCKER_HUB_PASSWORD}\"\n    - docker push extensions/git-clone:${ESTAFETTE_BUILD_VERSION}\n    - docker tag extensions/git-clone:${ESTAFETTE_BUILD_VERSION} extensions/git-clone:dev\n    - docker push extensions/git-clone:dev\n    when:\n      status == 'succeeded' &&\n      branch == 'master' &&\n      server == 'gocd'\n\n  set-build-status:\n    image: extensions/github-status:dev\n    when:\n      server == 'estafette'\n\n  slack-notify:\n    image: extensions/slack-build-status:dev\n    webhook: estafette.secret(eoN9GnRnfeMLL7L0.ThpJZ1iBKSjR93u1IkQu8nm8dgdOrDeZsGkFMB-GPaAfPXUw4zH3kYjHu3rpW2hbZmuVMAviOrqQ-dNmujWOBHWQDMDPvwO2KO884caanb-LGx1CPAFF7qaPZpeU)\n    name: ${ESTAFETTE_LABEL_APP}\n    channels:\n    - '#build-status'\n    when:\n      status == 'failed'",
            "repo-branch": "master",
            "repo-name": "estafette-extension-git-clone",
            "repo-owner": "estafette",
            "repo-revision": "24a00219ff5b037c07569494857b062f184ab726",
            "repo-source": "github.com",
            "updated-at": 1528124271
            }
            },
            {
            "type": "pipelines",
            "id": "354307539012517890",
            "attributes": {
            "build-status": "succeeded",
            "build-version": "0.0.4",
            "inserted-at": 1528196480,
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
            ],
            "manifest": "builder:\n  track: dev\n\nlabels:\n  app: estafette-extension-github-status\n  team: estafette-team\n  language: golang\n\nversion:\n  semver:\n    major: 0\n    minor: 0\n    patch: '{{auto}}'\n    labelTemplate: '{{branch}}'\n    releaseBranch: master\n\npipelines:\n  set-pending-build-status:\n    image: extensions/github-status:stable\n    status: pending\n    when:\n      server == 'estafette'\n\n  build:\n    image: golang:1.10.2-alpine3.7\n    workDir: /go/src/github.com/estafette/${ESTAFETTE_LABEL_APP}\n    commands:\n    - go test `go list ./... | grep -v /vendor/`\n    - CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags \"-X main.version=${ESTAFETTE_BUILD_VERSION} -X main.revision=${ESTAFETTE_GIT_REVISION} -X main.branch=${ESTAFETTE_GIT_BRANCH} -X main.buildDate=${ESTAFETTE_BUILD_DATETIME}\" -o ./publish/${ESTAFETTE_LABEL_APP} .\n\n  bake:\n    image: docker:18.03.1-ce\n    commands:\n    - cp Dockerfile ./publish\n    - cp /etc/ssl/certs/ca-certificates.crt ./publish\n    - docker build -t extensions/github-status:${ESTAFETTE_BUILD_VERSION} ./publish\n\n  push-to-docker-hub:\n    image: docker:18.03.1-ce\n    env:\n      DOCKER_HUB_USERNAME: estafette.secret(qJ47izXp9HOG6Ji8.bUXHmliWtLdWr1Em7luYZCPSWkhxBLU0hA==)\n      DOCKER_HUB_PASSWORD: estafette.secret(pC7nv0PIifl3aaa3.iFdRuGLbmc8LIN45Id8TKFLUr-QiMLesPkVKJgRVybA8q8or)\n    commands:\n    - docker login --username=${DOCKER_HUB_USERNAME} --password=\"${DOCKER_HUB_PASSWORD}\"\n    - docker push extensions/github-status:${ESTAFETTE_BUILD_VERSION}\n    - docker tag extensions/github-status:${ESTAFETTE_BUILD_VERSION} extensions/github-status:dev\n    - docker push extensions/github-status:dev\n    when:\n      status == 'succeeded' &&\n      branch == 'master' &&\n      server == 'gocd'\n\n  set-build-status:\n    image: extensions/github-status:stable\n    when:\n      server == 'estafette'\n\n  slack-notify:\n    image: extensions/slack-build-status:dev\n    webhook: estafette.secret(fI3-FVVuCISewUB7.us1witAljV1RkjZ23G17KVLzBBzfwT0mJ24ORfjAFs7aJElUy9iQ_9nvO5CQnBG8WgT5YQ5l4N6c3vLZTc3zKDZ8fhfBWWLhwzP6Tdfvy8Jd5Y-8xVqeA5sgni4_)\n    name: ${ESTAFETTE_LABEL_APP}\n    channels:\n    - '#build-status'\n    when:\n      status == 'failed'",
            "repo-branch": "master",
            "repo-name": "estafette-extension-github-status",
            "repo-owner": "estafette",
            "repo-revision": "c8789d45bb703a79155625efe5df3bf18d2542f3",
            "repo-source": "github.com",
            "updated-at": 1528196522
            }
            },
            {
            "type": "pipelines",
            "id": "352361143334535173",
            "attributes": {
            "build-status": "succeeded",
            "build-version": "0.0.2",
            "inserted-at": 1527602487,
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
            ],
            "manifest": "builder:\n  track: dev\n\nlabels:\n  app: estafette-extension-slack-build-status\n  team: estafette-team\n  language: golang\n\nversion:\n  semver:\n    major: 0\n    minor: 0\n    patch: '{{auto}}'\n    labelTemplate: '{{branch}}'\n    releaseBranch: master\n\npipelines:\n  set-pending-build-status:\n    image: extensions/github-status:dev\n    status: pending\n    when:\n      server == 'estafette'\n\n  build:\n    image: golang:1.10.2-alpine3.7\n    workDir: /go/src/github.com/estafette/${ESTAFETTE_LABEL_APP}\n    commands:\n    - go test `go list ./... | grep -v /vendor/`\n    - CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags \"-X main.version=${ESTAFETTE_BUILD_VERSION} -X main.revision=${ESTAFETTE_GIT_REVISION} -X main.branch=${ESTAFETTE_GIT_BRANCH} -X main.buildDate=${ESTAFETTE_BUILD_DATETIME}\" -o ./publish/${ESTAFETTE_LABEL_APP} .\n\n  bake:\n    image: docker:18.03.1-ce\n    commands:\n    - cp Dockerfile ./publish\n    - cp /etc/ssl/certs/ca-certificates.crt ./publish\n    - docker build -t extensions/slack-build-status:${ESTAFETTE_BUILD_VERSION} ./publish\n\n  push-to-docker-hub:\n    image: docker:18.03.1-ce\n    env:\n      DOCKER_HUB_USERNAME: estafette.secret(3Yi-UBRrdx87H4RP.O7dg2KedDdxlgUiGrL5y040NWyRIf7X7bw==)\n      DOCKER_HUB_PASSWORD: estafette.secret(GcWL0yZSJ72NO0Pw.KuhOy_CiTsYqL2Rloa7hprI3Q_V1_LqnymcbtVVcg7O6Jh8R)\n    commands:\n    - docker login --username=${DOCKER_HUB_USERNAME} --password=\"${DOCKER_HUB_PASSWORD}\"\n    - docker push extensions/slack-build-status:${ESTAFETTE_BUILD_VERSION}\n    - docker tag extensions/slack-build-status:${ESTAFETTE_BUILD_VERSION} extensions/slack-build-status:dev\n    - docker push extensions/slack-build-status:dev\n    when:\n      status == 'succeeded' &&\n      branch == 'master' &&\n      server == 'gocd'\n\n  set-build-status:\n    image: extensions/github-status:dev\n    when:\n      server == 'estafette'\n\n  slack-notify:\n    image: extensions/slack-build-status:stable\n    webhook: estafette.secret(IUcwmw0ZhriLvqhD.4DOkD1-c_44STKbxbD3n4zzz67SYJCcW0_4RKWbL7LefQW4zjRU8UOrANuY9xC89BRmVmXf4GppNt5SULEjx6VI_CcdlfXbCQlgkTs3pO2a66-0Q9k0W7t7nrUif)\n    name: ${ESTAFETTE_LABEL_APP}\n    channels:\n    - '#build-status'\n    when:\n      status == 'failed' ||\n      status == 'succeeded'",
            "repo-branch": "master",
            "repo-name": "estafette-extension-slack-build-status",
            "repo-owner": "estafette",
            "repo-revision": "32f0fed5a8f447f568df92704c22669f8c7b07be",
            "repo-source": "github.com",
            "updated-at": 1527602548
            }
            },
            {
            "type": "pipelines",
            "id": "352057520731619331",
            "attributes": {
            "build-status": "running",
            "build-version": "1.0.13",
            "inserted-at": 1527509828,
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
            ],
            "manifest": "builder:\n  track: dev\n\nlabels:\n  app: estafette-gke-node-pool-shifter\n  team: estafette-team\n  language: golang\n\nversion:\n  semver:\n    major: 1\n    minor: 0\n    patch: '{{auto}}'\n    labelTemplate: '{{branch}}'\n    releaseBranch: master\n\npipelines:\n  set-pending-build-status:\n    image: extensions/github-status:dev\n    status: pending\n    when:\n      server == 'estafette'\n\n  build:\n    image: golang:1.10.2-alpine3.7\n    workDir: /go/src/github.com/estafette/${ESTAFETTE_LABEL_APP}\n    commands:\n    - go test `go list ./... | grep -v /vendor/`\n    - CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags \"-X main.version=${ESTAFETTE_BUILD_VERSION} -X main.revision=${ESTAFETTE_GIT_REVISION} -X main.branch=${ESTAFETTE_GIT_BRANCH} -X main.buildDate=${ESTAFETTE_BUILD_DATETIME}\" -o ./publish/${ESTAFETTE_LABEL_APP} .\n\n  bake:\n    image: docker:18.03.1-ce\n    commands:\n    - cp Dockerfile ./publish\n    - cp /etc/ssl/certs/ca-certificates.crt ./publish\n    - docker build -t estafette/${ESTAFETTE_LABEL_APP}:${ESTAFETTE_BUILD_VERSION} ./publish\n\n  push-to-docker-hub:\n    image: docker:18.03.1-ce\n    env:\n      DOCKER_HUB_USERNAME: estafette.secret(tWjwPHylAY0N7dtA.1JXlrQ0kF8PJFtTsjlYVxXgNGOUv62gUTw==)\n      DOCKER_HUB_PASSWORD: estafette.secret(WX2BcS3hO06G0_Bb.33PHNbMyx1HaZnATzlfkfdsFmvzEz2o6UeQ8DFdCFWX7Rtel)\n    commands:\n    - docker login --username=${DOCKER_HUB_USERNAME} --password=\"${DOCKER_HUB_PASSWORD}\"\n    - docker push estafette/${ESTAFETTE_LABEL_APP}:${ESTAFETTE_BUILD_VERSION}\n    when:\n      status == 'succeeded' &&\n      branch == 'master' &&\n      server == 'gocd'\n\n  set-build-status:\n    image: extensions/github-status:dev\n    when:\n      server == 'estafette'\n\n  slack-notify:\n    image: extensions/slack-build-status:dev\n    webhook: estafette.secret(bo6LFLa163CTPMmv.PeKKuNlAdNSlKPBWp9fWKCWMYQY6tqh8zdOouYTRMUaxua31o1MmYpEYbR0UmNytSIF3_hVClEcOsRi-7IvNqm2LRZGaeNaKjHV1QTGX2SuhWkUMrRl5kEPh3DWa)\n    name: ${ESTAFETTE_LABEL_APP}\n    channels:\n    - '#build-status'\n    when:\n      status == 'failed'",
            "repo-branch": "master",
            "repo-name": "estafette-gke-node-pool-shifter",
            "repo-owner": "estafette",
            "repo-revision": "a670e2ea29ba7431f76fca06fe2bdc9eb4bc8c36",
            "repo-source": "github.com",
            "updated-at": 1527509910
            }
            },
            {
            "type": "pipelines",
            "id": "352080435528269829",
            "attributes": {
            "build-status": "succeeded",
            "build-version": "1.0.9",
            "inserted-at": 1527516821,
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
            ],
            "manifest": "builder:\n  track: dev\n\nlabels:\n  app: estafette-gke-preemptible-killer\n  team: estafette-team\n  language: golang\n\nversion:\n  semver:\n    major: 1\n    minor: 0\n    patch: '{{auto}}'\n    labelTemplate: '{{branch}}'\n    releaseBranch: master\n\npipelines:\n  set-pending-build-status:\n    image: extensions/github-status:dev\n    status: pending\n    when:\n      server == 'estafette'\n\n  build:\n    image: golang:1.10.2-alpine3.7\n    workDir: /go/src/github.com/estafette/${ESTAFETTE_LABEL_APP}\n    commands:\n    - go test `go list ./... | grep -v /vendor/`\n    - CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags \"-X main.version=${ESTAFETTE_BUILD_VERSION} -X main.revision=${ESTAFETTE_GIT_REVISION} -X main.branch=${ESTAFETTE_GIT_BRANCH} -X main.buildDate=${ESTAFETTE_BUILD_DATETIME}\" -o ./publish/${ESTAFETTE_LABEL_APP} .\n\n  bake:\n    image: docker:18.03.1-ce\n    commands:\n    - cp Dockerfile ./publish\n    - cp /etc/ssl/certs/ca-certificates.crt ./publish\n    - docker build -t estafette/${ESTAFETTE_LABEL_APP}:${ESTAFETTE_BUILD_VERSION} ./publish\n\n  push-to-docker-hub:\n    image: docker:18.03.1-ce\n    env:\n      DOCKER_HUB_USERNAME: estafette.secret(ogLXmmnenJmOIFhD.HTmCog7nTq1ZyinDmjcAtewgBcfeooyPdQ==)\n      DOCKER_HUB_PASSWORD: estafette.secret(TnICQh6mELiXtR9i.GJ9La6dtKMAPgO1R59T7FDsPVFWv2hmXYdLylbXi4Ju0r29g)\n    commands:\n    - docker login --username=${DOCKER_HUB_USERNAME} --password=\"${DOCKER_HUB_PASSWORD}\"\n    - docker push estafette/${ESTAFETTE_LABEL_APP}:${ESTAFETTE_BUILD_VERSION}\n    when:\n      status == 'succeeded' &&\n      branch == 'master' &&\n      server == 'gocd'\n\n  set-build-status:\n    image: extensions/github-status:dev\n    when:\n      server == 'estafette'\n\n  slack-notify:\n    image: extensions/slack-build-status:dev\n    webhook: estafette.secret(OmEDcjzDuiu0zP1i.lioIlGIhUXGs8YUtQHEshUOT1WLIHt4rrkn6xEBENWiRnngQ12DbrXMNMZo6GNwIabJh5Jn_SWJLm3RQN_1DimoNh5hdu1-hpZxJGNIF6WgC-61ivWFnuY8sQjbz)\n    name: ${ESTAFETTE_LABEL_APP}\n    channels:\n    - '#build-status'\n    when:\n      status == 'failed'",
            "repo-branch": "master",
            "repo-name": "estafette-gke-preemptible-killer",
            "repo-owner": "estafette",
            "repo-revision": "dbc66a2785cb6273809c7e7654f349fbeaddf5d8",
            "repo-source": "github.com",
            "updated-at": 1527516874
            }
            },
            {
            "type": "pipelines",
            "id": "354074629150834690",
            "attributes": {
            "build-status": "succeeded",
            "build-version": "1.0.13",
            "inserted-at": 1528125401,
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
            ],
            "manifest": "builder:\n  track: dev\n\nlabels:\n  app: estafette-letsencrypt-certificate\n  team: estafette-team\n  language: golang\n\nversion:\n  semver:\n    major: 1\n    minor: 0\n    patch: '{{auto}}'\n    labelTemplate: '{{branch}}'\n    releaseBranch: master\n\npipelines:\n  set-pending-build-status:\n    image: extensions/github-status:dev\n    status: pending\n    when:\n      server == 'estafette'\n\n  build:\n    image: golang:1.10.2-alpine3.7\n    workDir: /go/src/github.com/estafette/${ESTAFETTE_LABEL_APP}\n    commands:\n    - go test `go list ./... | grep -v /vendor/`\n    - CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags \"-X main.version=${ESTAFETTE_BUILD_VERSION} -X main.revision=${ESTAFETTE_GIT_REVISION} -X main.branch=${ESTAFETTE_GIT_BRANCH} -X main.buildDate=${ESTAFETTE_BUILD_DATETIME}\" -o ./publish/${ESTAFETTE_LABEL_APP} .\n\n  bake:\n    image: docker:18.03.1-ce\n    commands:\n    - cp Dockerfile ./publish\n    - cp /etc/ssl/certs/ca-certificates.crt ./publish\n    - docker build -t estafette/${ESTAFETTE_LABEL_APP}:${ESTAFETTE_BUILD_VERSION} ./publish\n\n  push-to-docker-hub:\n    image: docker:18.03.1-ce\n    env:\n      DOCKER_HUB_USERNAME: estafette.secret(r74nrQqDg4PsTcFs.Z4rYdNcCsLUffUGEM9nMXZzBvHo5NH4LBA==)\n      DOCKER_HUB_PASSWORD: estafette.secret(9a1Hi27C6D_7T92U.RkTR8dK6RISOiLH9BX7kindCGBgAXhpOpCFetPfmh8bk_Tog)\n    commands:\n    - docker login --username=${DOCKER_HUB_USERNAME} --password=\"${DOCKER_HUB_PASSWORD}\"\n    - docker push estafette/${ESTAFETTE_LABEL_APP}:${ESTAFETTE_BUILD_VERSION}\n    when:\n      status == 'succeeded' &&\n      branch == 'master' &&\n      server == 'gocd'\n\n  set-build-status:\n    image: extensions/github-status:dev\n    when:\n      server == 'estafette'\n\n  slack-notify:\n    image: extensions/slack-build-status:dev\n    webhook: estafette.secret(pOJgEIdrzGwzat2P.VnYxtfCP_a4mu-PhdJKT9Zy1NK7cLTIfXekbGICOkPRKta8VlhJjG6b7lL0XAoilHpZbKQkzMlmdKsgN_PAKwlRrhzjj2M1Ca6AlcrJaIsDvVAJCVJmAd5N-3r-G)\n    name: ${ESTAFETTE_LABEL_APP}\n    channels:\n    - '#build-status'\n    when:\n      status == 'failed'\n",
            "repo-branch": "master",
            "repo-name": "estafette-letsencrypt-certificate",
            "repo-owner": "estafette",
            "repo-revision": "ce4c704be8d80f64f1c639cfd9bf83f753ae10a5",
            "repo-source": "github.com",
            "updated-at": 1528125465
            }
            }
          ]
        };
      });

      this.get('/pipelines/:repoSource/:repoOwner/:repoName', () => {
        return {
          data: {
                "type": "builds",
                "id": "354360051318030337",
                "attributes": {
                "build-status": "succeeded",
                "build-version": "0.0.75",
                "inserted-at": 1528212505,
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
                "manifest": "builder:\n  track: dev\n\nlabels:\n  app: estafette-ci-api\n  team: estafette-team\n  language: golang\n\nversion:\n  semver:\n    major: 0\n    minor: 0\n    patch: '{{auto}}'\n    labelTemplate: '{{branch}}'\n    releaseBranch: master\n\npipelines:\n  set-pending-build-status:\n    image: extensions/github-status:dev\n    status: pending\n    when:\n      server == 'estafette'\n\n  build:\n    image: golang:1.10.2-alpine3.7\n    workDir: /go/src/github.com/estafette/${ESTAFETTE_LABEL_APP}\n    commands:\n    - go test `go list ./... | grep -v /vendor/`\n    - CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags \"-X main.version=${ESTAFETTE_BUILD_VERSION} -X main.revision=${ESTAFETTE_GIT_REVISION} -X main.branch=${ESTAFETTE_GIT_BRANCH} -X main.buildDate=${ESTAFETTE_BUILD_DATETIME}\" -o ./publish/${ESTAFETTE_LABEL_APP} .\n\n  bake:\n    image: docker:18.03.1-ce\n    commands:\n    - cp Dockerfile ./publish\n    - cp /etc/ssl/certs/ca-certificates.crt ./publish\n    - cp -r ./cockroach/migrations ./publish/\n    - docker build -t estafette/${ESTAFETTE_LABEL_APP}:${ESTAFETTE_BUILD_VERSION} ./publish\n\n  push-to-docker-hub:\n    image: docker:18.03.1-ce\n    env:\n      DOCKER_HUB_USERNAME: estafette.secret(IXFQ9igip3IH0KVY.N6RTT4RB9dz15UGKHQUBctAf5QNI8G8QYg==)\n      DOCKER_HUB_PASSWORD: estafette.secret(zhN34B3iKmWis2t-.guUQYqZPjXTjaWK4G6ZU4n-DYyOZvigT2tdRYEP3zQddr4HA)\n    commands:\n    - docker login --username=${DOCKER_HUB_USERNAME} --password=\"${DOCKER_HUB_PASSWORD}\"\n    - docker push estafette/${ESTAFETTE_LABEL_APP}:${ESTAFETTE_BUILD_VERSION}\n    when:\n      status == 'succeeded' &&\n      branch == 'master' &&\n      server == 'gocd'\n\n  set-build-status:\n    image: extensions/github-status:dev\n    when:\n      server == 'estafette'\n\n  slack-notify:\n    image: extensions/slack-build-status:dev\n    webhook: estafette.secret(08UOJSF6Fvdz9u2X.lzsCArDpf97g7i2Vx-3UTyWsxCB81e05jthdY_AI3OffXBA-NurQePraQqzNf-9IhdoDvr1Akg0yom4S2kHjvWLhRC8Y7xgheK8MR6qPu2oi3QvlYbnNtTTOOjMi)\n    name: ${ESTAFETTE_LABEL_APP}\n    channels:\n    - '#build-status'\n    when:\n      status == 'failed'",
                "repo-branch": "master",
                "repo-name": "estafette-ci-api",
                "repo-owner": "estafette",
                "repo-revision": "795549a1b02eb50e41d34a13edbcf4253a95b7a1",
                "repo-source": "github.com",
                "updated-at": 1528212590
                }
            }
        };
    });
    
      this.get('/pipelines/:repoSource/:repoOwner/:repoName/builds', () => {
        return {
          data: [
            {
                "type": "builds",
                "id": "354360051318030337",
                "attributes": {
                "build-status": "succeeded",
                "build-version": "0.0.75",
                "inserted-at": 1528212505,
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
                "manifest": "builder:\n  track: dev\n\nlabels:\n  app: estafette-ci-api\n  team: estafette-team\n  language: golang\n\nversion:\n  semver:\n    major: 0\n    minor: 0\n    patch: '{{auto}}'\n    labelTemplate: '{{branch}}'\n    releaseBranch: master\n\npipelines:\n  set-pending-build-status:\n    image: extensions/github-status:dev\n    status: pending\n    when:\n      server == 'estafette'\n\n  build:\n    image: golang:1.10.2-alpine3.7\n    workDir: /go/src/github.com/estafette/${ESTAFETTE_LABEL_APP}\n    commands:\n    - go test `go list ./... | grep -v /vendor/`\n    - CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags \"-X main.version=${ESTAFETTE_BUILD_VERSION} -X main.revision=${ESTAFETTE_GIT_REVISION} -X main.branch=${ESTAFETTE_GIT_BRANCH} -X main.buildDate=${ESTAFETTE_BUILD_DATETIME}\" -o ./publish/${ESTAFETTE_LABEL_APP} .\n\n  bake:\n    image: docker:18.03.1-ce\n    commands:\n    - cp Dockerfile ./publish\n    - cp /etc/ssl/certs/ca-certificates.crt ./publish\n    - cp -r ./cockroach/migrations ./publish/\n    - docker build -t estafette/${ESTAFETTE_LABEL_APP}:${ESTAFETTE_BUILD_VERSION} ./publish\n\n  push-to-docker-hub:\n    image: docker:18.03.1-ce\n    env:\n      DOCKER_HUB_USERNAME: estafette.secret(IXFQ9igip3IH0KVY.N6RTT4RB9dz15UGKHQUBctAf5QNI8G8QYg==)\n      DOCKER_HUB_PASSWORD: estafette.secret(zhN34B3iKmWis2t-.guUQYqZPjXTjaWK4G6ZU4n-DYyOZvigT2tdRYEP3zQddr4HA)\n    commands:\n    - docker login --username=${DOCKER_HUB_USERNAME} --password=\"${DOCKER_HUB_PASSWORD}\"\n    - docker push estafette/${ESTAFETTE_LABEL_APP}:${ESTAFETTE_BUILD_VERSION}\n    when:\n      status == 'succeeded' &&\n      branch == 'master' &&\n      server == 'gocd'\n\n  set-build-status:\n    image: extensions/github-status:dev\n    when:\n      server == 'estafette'\n\n  slack-notify:\n    image: extensions/slack-build-status:dev\n    webhook: estafette.secret(08UOJSF6Fvdz9u2X.lzsCArDpf97g7i2Vx-3UTyWsxCB81e05jthdY_AI3OffXBA-NurQePraQqzNf-9IhdoDvr1Akg0yom4S2kHjvWLhRC8Y7xgheK8MR6qPu2oi3QvlYbnNtTTOOjMi)\n    name: ${ESTAFETTE_LABEL_APP}\n    channels:\n    - '#build-status'\n    when:\n      status == 'failed'",
                "repo-branch": "master",
                "repo-name": "estafette-ci-api",
                "repo-owner": "estafette",
                "repo-revision": "795549a1b02eb50e41d34a13edbcf4253a95b7a1",
                "repo-source": "github.com",
                "updated-at": 1528212590
                }
            },
            {
                "type": "builds",
                "id": "354360051318030337",
                "attributes": {
                "build-status": "succeeded",
                "build-version": "0.0.74",
                "inserted-at": 1528212505,
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
                "manifest": "builder:\n  track: dev\n\nlabels:\n  app: estafette-ci-api\n  team: estafette-team\n  language: golang\n\nversion:\n  semver:\n    major: 0\n    minor: 0\n    patch: '{{auto}}'\n    labelTemplate: '{{branch}}'\n    releaseBranch: master\n\npipelines:\n  set-pending-build-status:\n    image: extensions/github-status:dev\n    status: pending\n    when:\n      server == 'estafette'\n\n  build:\n    image: golang:1.10.2-alpine3.7\n    workDir: /go/src/github.com/estafette/${ESTAFETTE_LABEL_APP}\n    commands:\n    - go test `go list ./... | grep -v /vendor/`\n    - CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags \"-X main.version=${ESTAFETTE_BUILD_VERSION} -X main.revision=${ESTAFETTE_GIT_REVISION} -X main.branch=${ESTAFETTE_GIT_BRANCH} -X main.buildDate=${ESTAFETTE_BUILD_DATETIME}\" -o ./publish/${ESTAFETTE_LABEL_APP} .\n\n  bake:\n    image: docker:18.03.1-ce\n    commands:\n    - cp Dockerfile ./publish\n    - cp /etc/ssl/certs/ca-certificates.crt ./publish\n    - cp -r ./cockroach/migrations ./publish/\n    - docker build -t estafette/${ESTAFETTE_LABEL_APP}:${ESTAFETTE_BUILD_VERSION} ./publish\n\n  push-to-docker-hub:\n    image: docker:18.03.1-ce\n    env:\n      DOCKER_HUB_USERNAME: estafette.secret(IXFQ9igip3IH0KVY.N6RTT4RB9dz15UGKHQUBctAf5QNI8G8QYg==)\n      DOCKER_HUB_PASSWORD: estafette.secret(zhN34B3iKmWis2t-.guUQYqZPjXTjaWK4G6ZU4n-DYyOZvigT2tdRYEP3zQddr4HA)\n    commands:\n    - docker login --username=${DOCKER_HUB_USERNAME} --password=\"${DOCKER_HUB_PASSWORD}\"\n    - docker push estafette/${ESTAFETTE_LABEL_APP}:${ESTAFETTE_BUILD_VERSION}\n    when:\n      status == 'succeeded' &&\n      branch == 'master' &&\n      server == 'gocd'\n\n  set-build-status:\n    image: extensions/github-status:dev\n    when:\n      server == 'estafette'\n\n  slack-notify:\n    image: extensions/slack-build-status:dev\n    webhook: estafette.secret(08UOJSF6Fvdz9u2X.lzsCArDpf97g7i2Vx-3UTyWsxCB81e05jthdY_AI3OffXBA-NurQePraQqzNf-9IhdoDvr1Akg0yom4S2kHjvWLhRC8Y7xgheK8MR6qPu2oi3QvlYbnNtTTOOjMi)\n    name: ${ESTAFETTE_LABEL_APP}\n    channels:\n    - '#build-status'\n    when:\n      status == 'failed'",
                "repo-branch": "master",
                "repo-name": "estafette-ci-api",
                "repo-owner": "estafette",
                "repo-revision": "795549a1b02eb50e41d34a13edbcf4253a95b7a1",
                "repo-source": "github.com",
                "updated-at": 1528212590
                }
            },
            {
                "type": "builds",
                "id": "354360051318030337",
                "attributes": {
                "build-status": "succeeded",
                "build-version": "0.0.73",
                "inserted-at": 1528212505,
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
                "manifest": "builder:\n  track: dev\n\nlabels:\n  app: estafette-ci-api\n  team: estafette-team\n  language: golang\n\nversion:\n  semver:\n    major: 0\n    minor: 0\n    patch: '{{auto}}'\n    labelTemplate: '{{branch}}'\n    releaseBranch: master\n\npipelines:\n  set-pending-build-status:\n    image: extensions/github-status:dev\n    status: pending\n    when:\n      server == 'estafette'\n\n  build:\n    image: golang:1.10.2-alpine3.7\n    workDir: /go/src/github.com/estafette/${ESTAFETTE_LABEL_APP}\n    commands:\n    - go test `go list ./... | grep -v /vendor/`\n    - CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags \"-X main.version=${ESTAFETTE_BUILD_VERSION} -X main.revision=${ESTAFETTE_GIT_REVISION} -X main.branch=${ESTAFETTE_GIT_BRANCH} -X main.buildDate=${ESTAFETTE_BUILD_DATETIME}\" -o ./publish/${ESTAFETTE_LABEL_APP} .\n\n  bake:\n    image: docker:18.03.1-ce\n    commands:\n    - cp Dockerfile ./publish\n    - cp /etc/ssl/certs/ca-certificates.crt ./publish\n    - cp -r ./cockroach/migrations ./publish/\n    - docker build -t estafette/${ESTAFETTE_LABEL_APP}:${ESTAFETTE_BUILD_VERSION} ./publish\n\n  push-to-docker-hub:\n    image: docker:18.03.1-ce\n    env:\n      DOCKER_HUB_USERNAME: estafette.secret(IXFQ9igip3IH0KVY.N6RTT4RB9dz15UGKHQUBctAf5QNI8G8QYg==)\n      DOCKER_HUB_PASSWORD: estafette.secret(zhN34B3iKmWis2t-.guUQYqZPjXTjaWK4G6ZU4n-DYyOZvigT2tdRYEP3zQddr4HA)\n    commands:\n    - docker login --username=${DOCKER_HUB_USERNAME} --password=\"${DOCKER_HUB_PASSWORD}\"\n    - docker push estafette/${ESTAFETTE_LABEL_APP}:${ESTAFETTE_BUILD_VERSION}\n    when:\n      status == 'succeeded' &&\n      branch == 'master' &&\n      server == 'gocd'\n\n  set-build-status:\n    image: extensions/github-status:dev\n    when:\n      server == 'estafette'\n\n  slack-notify:\n    image: extensions/slack-build-status:dev\n    webhook: estafette.secret(08UOJSF6Fvdz9u2X.lzsCArDpf97g7i2Vx-3UTyWsxCB81e05jthdY_AI3OffXBA-NurQePraQqzNf-9IhdoDvr1Akg0yom4S2kHjvWLhRC8Y7xgheK8MR6qPu2oi3QvlYbnNtTTOOjMi)\n    name: ${ESTAFETTE_LABEL_APP}\n    channels:\n    - '#build-status'\n    when:\n      status == 'failed'",
                "repo-branch": "master",
                "repo-name": "estafette-ci-api",
                "repo-owner": "estafette",
                "repo-revision": "795549a1b02eb50e41d34a13edbcf4253a95b7a1",
                "repo-source": "github.com",
                "updated-at": 1528212590
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

