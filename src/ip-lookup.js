/**
 * Public and Private IP getters methods.
 */
const IPLookup = (() => {
    return {
        /**
         * Returns a Promise of public IP.
         */
        fetchPublicIp: () => {
            //Fetch public ip.
            return fetch('https://api.ipify.org?format=json')
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    return data.ip;
                });
        },
        /**
         * Returns a Promise of private IP.
         */
        fetchPrivateIp: () => {
            //Promise helper tha allows set of resolve and reject values on a Promise.
            var promiseHelper;

            //A Promise that will be its values set and then will be returned.
            const promise = new Promise((resolve, reject) => {
                promiseHelper = {
                    resolve: resolve,
                    reject: reject
                };

                //Set timeout for private IP fetching.
                setTimeout(() => {
                    //Sets value for rejection, in other words, a value for error case.
                    reject('Private IP lookup timeout!');
                }, 3000);
            });

            //Representation of connection between local and remote peer.
            window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
            //Creation of the peer connection.
            const pc = new RTCPeerConnection({ iceServers: [] });

            //Creates a data channel, wich is necessary due to connection tracking.
            pc.createDataChannel("");

            //Override what should be done when oncandidate event is fired.
            pc.onicecandidate = ice => {
                //Verification that prevents possible errors
                if (!ice || !ice.candidate || !ice.candidate.candidate) return;

                try {
                    //Getting candidade wich contains the private ip, then only the private ip is set to privateIp variable according to a regular expression.
                    const privateIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
                    //Resolving privateIP variable to the promise variable, in other words, the value is applied.
                    promiseHelper.resolve(privateIP);
                } catch (err) {
                    //Resolving possible error message, in other words, the error message is applied.
                    promiseHelper.reject('Getting private ip was not possible! ' + err.message);
                }
            };

            //Initiation of the creation of an Session Description Protocol.
            pc.createOffer().then(sdp => {
                //Set the initiated Session Description Protocol, wich fires the pc.onicecandidate event handler.
                pc.setLocalDescription(sdp);
            });

            //Finally returts the promise when its resolved or rejected on the pc.onicecandidate event handler. 
            return promise;
        }
    };
})();