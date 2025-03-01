import http from "http";

export default class FetchGeoJson {
    constructor(packageId) {
        if (!packageId) {
            throw new Error("packageId is required.");
        }
        this.packageId = packageId;
    }

    // Promise to retrieve the package metadata
    getPackage() {
        return new Promise((resolve, reject) => {
            https.get(`https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/package_show?id=${this.packageId}`, (response) => {
                let dataChunks = [];
                response
                    .on("data", (chunk) => {
                        dataChunks.push(chunk);
                    })
                    .on("end", () => {
                        let data = Buffer.concat(dataChunks);
                        resolve(JSON.parse(data.toString())["result"]);
                    })
                    .on("error", (error) => {
                        reject(error);
                    });
            });
        });
    }

    // Promise to retrieve data of a datastore resource
    getDatastoreResource(resource) {
        return new Promise((resolve, reject) => {
            https.get(`https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/datastore_search?id=${resource["id"]}`, (response) => {
                let dataChunks = [];
                response
                    .on("data", (chunk) => {
                        dataChunks.push(chunk);
                    })
                    .on("end", () => {
                        let data = Buffer.concat(dataChunks);
                        resolve(JSON.parse(data.toString())["result"]["records"]);
                    })
                    .on("error", (error) => {
                        reject(error);
                    });
            });
        });
    }

    // Main function to fetch and process the package and its datastore resource
    fetchData() {
        this.getPackage()
            .then((packageData) => {
                // Filter out the datastore resources
                let datastoreResources = packageData["resources"].filter((r) => r.datastore_active);

                if (datastoreResources.length > 0) {
                    // Retrieve the first datastore resource as an example
                    this.getDatastoreResource(datastoreResources[0])
                        .then((resource) => {
                            // This is the actual data of the resource
                            console.log(resource);
                        })
                        .catch((error) => {
                            console.error("Error fetching datastore resource:", error);
                        });
                } else {
                    console.log("No active datastore resources found.");
                }
            })
            .catch((error) => {
                console.error("Error fetching package:", error);
            });
    }
}


