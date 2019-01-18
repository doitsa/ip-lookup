# IP Lookup


This project provides two functions for fetching public and private IP.

When using methods a Promise is returned, this means user should use promise methods to finally obtain IP's values.

##Example of usage

### Using methods separately


#### Fetching public ip promise and then getting its value
```
    IPLookup.fetchPublicIp().then((publicIp) => {
        //do something with publicIp param
		console.log(publicIp);
	});
```

#### Fetching private ip promise and then getting its value
```	
	IPLookup.fetchPrivateIp().then((privateIp) => {
        //do something with privateIp param
		console.log(privateIp);
	});
```

#### Fetching both, private and public ip then getting theis values at once
```
	Promise.all([IPLookup.fetchPublicIp(), IPLookup.fetchPrivateIp()]).then(ips => {
		//do something with both IPS
		var [publicIp, privateIp] = ips;

		console.log('Public IP: ',publicIp);
		console.log('Private IP: ',privateIp);
	});
```

## Building the project
### 1. Downloading required modules
Run the following command at the project's root folder to download the required dependencies:

```
$ npm install
```

### 2. Running Tests
Run the following command to run the test case suite for this project:

```
$ grunt test
```

### 3. Generating the minified version
Run the following command to produce the final minified artifact for this project:

```
$ grunt
```