const request = require('request');

/**
 * Login with a Key Id and Key Secret into the REST APIs of IBM Application Security on Cloud.
 * @param  {String} keyId Key Id to access the REST APIs of IBM Application Security on Cloud
 * @param  {String} KeySecret Key Secret to access the REST APIs of IBM Application Security on Cloud
 * @return {Promise}      A Promise with the bearer token or an error, if any.
 */
function login(keyId, keySecret){
    return new Promise((resolve, reject) => {
        console.log('Connecting to the REST API');

        request.post('https://appscan.ibmcloud.com/api/V2/Account/ApiKeyLogin', {
            body: {
                "KeyId": keyId,
                "KeySecret": keySecret
            },
            json: true
        }, (err, res, body) => {
            if(err){
                reject(`Error! ${err}`);
            }
        
            if(res){
                if(res.statusCode === 200){
                    console.log('Connected!');
                    resolve(body.Token);
                }
            } else {
                reject('Unable to login');
            }
        });
    });
}

/**
 * Call api/V2/Scans/${scanId}/Executions endpoint from the REST API of the IBM Application Security on Cloud to execute a scan.
 * @param  {String} scanId Scan Id for the application from the IBM Application Security on Cloud
 * @param  {String} bearerToken Bearer Token to access the REST APIs of IBM Application Security on Cloud
 * @return {Promise}      A Promise with the scan execution results or an error, if any.
 */
function executeScan(scanId, bearerToken){
    return new Promise((resolve, reject) => {
        console.log('Initiating Scan');

        request.post(`https://appscan.ibmcloud.com/api/V2/Scans/${scanId}/Executions`,{
            auth: {
                "bearer": bearerToken
            }
        }, (err, res, body) => {
            if(err){
                reject(`Error! ${err}`);
            }
            
            if(res){
                if(res.statusCode === 201){
                    console.log('Scan initiated!');
                    resolve(body);
                }
            } else {
                reject('Unable to execute scan');
            }
        });
    });
}

module.exports.login = login;  
module.exports.executeScan = executeScan;  