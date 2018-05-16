import Route from '@ember/routing/route';
import destination from '../models/destination';

export default Route.extend({
    model() {
        return {
            types: [
                "Kubernetes Engine",
                "Docker Registry",
                "NuGet Repository",
                "Maven Repository",
                "Github Release",
                "Git Tag"
            ],
            destinations: [
                {
                    name: "development",
                    type: "Kubernetes Engine"
                },
                {
                    name: "staging",
                    type: "Kubernetes Engine"
                },
                {
                    name: "production",
                    type: "Kubernetes Engine"
                },
                {
                    name: "tooling",
                    type: "Kubernetes Engine"
                },
                {
                    name: "nuget.org",
                    type: "NuGet Repository"
                },
                {
                    name: "myget.org",
                    type: "NuGet Repository"
                },
                {
                    name: "myget.org",
                    type: "Maven Repository"
                },
                {
                    name: "hub.docker.com",
                    type: "Docker Registry"
                },
                {
                    name: "gcr.io",
                    type: "Docker Registry"
                },
                {
                    name: "github-release",
                    type: "Github Release"
                },
                {
                    name: "github-tag",
                    type: "Git Tag"
                },
                {
                    name: "bitbucket-tag",
                    type: "Git Tag"
                }                
            ]
        };
    }
});
