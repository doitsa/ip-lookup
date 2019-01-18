describe('IPLookup.fetchPublicIp', () =>  {
    var publicIpPromise;
    var promiseHelper;

    beforeEach(function() {
        var fetchPromise = new Promise(function(resolve, reject) {
			promiseHelper = {
				resolve: resolve,
				reject: reject
			};
		});
        spyOn(window, 'fetch').and.returnValue(fetchPromise);
        publicIpPromise = IPLookup.fetchPublicIp();
        

    });
    
    describe('Fetch public IP successfuly', function() {
        beforeEach(function() {
            var response = new Response(JSON.stringify({
                ip: '10.0.0.2'
            }));

            promiseHelper.resolve(response);
        });

        it('Assert that fetched IP is 10.0.0.2', function(done) {
            publicIpPromise.then(function(ip) {
                expect(ip).toEqual('10.0.0.2');
                done();
            });
        });
        
    });

    describe('Assert there\'s gonna be a rejection on unsuccessful fetch', function() {
		var errorObj = { msg: 'Unreachable service' };

		beforeEach(function() {
			promiseHelper.reject(errorObj);
		});

		it('Assert the rejection is gonna be reached on fail', function(done) {
			publicIpPromise.catch(function(error) {
				expect(error).toEqual(errorObj);
				done();
			});
		});
	});
    
    it('Reaches ipify API', function(){
        expect(window.fetch).toHaveBeenCalledWith('https://api.ipify.org?format=json');
    });

    it('Assure a promise is returned', function(){
        expect(publicIpPromise).toEqual(jasmine.any(Promise));
    });
});

describe('IPLookup.fetchPrivateIp', () =>  {
    it('Assure private IP matches IP pattern', done => {
        IPLookup.fetchPrivateIp().then(ip => {
            expect(ip).toMatch(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/);
            done();
        });
    });
});