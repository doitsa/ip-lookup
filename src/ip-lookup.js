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
            var promiseHelper;

            const promise = new Promise((resolve, reject) => {
                promiseHelper = {
                    resolve: resolve,
                    reject: reject
                };

                setTimeout(() => {
                    //Sets value for rejection, in other words, a value for error case thay will be throw after 3 seconds of waiting.
                    reject('Private IP lookup timeout!');
                }, 3000);
            });

            window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
            //Simulation of  a peer connection.
            const pc = new RTCPeerConnection({ iceServers: [] });

            pc.createDataChannel("");

            pc.onicecandidate = ice => {
                if (!ice || !ice.candidate || !ice.candidate.candidate) return;

                try {
                    //Getting candidade wich contains the private ip, then only the private ip is set to privateIp variable according to a regular expression.
                    const privateIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
                    
                    promiseHelper.resolve(privateIP);
                } catch (err) {
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