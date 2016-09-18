import urllib2
import json

data = {
        "Inputs": {
                "input1":
                [
                    {
                        'glucose': "190",   
                        'pressure': "90",   
                        'insulin': "400",   
                        'BMI': "34",   
                        'age': "34",   
                    }
                ],
        },
    "GlobalParameters":  {
    }
}

body = str.encode(json.dumps(data))

url = 'https://ussouthcentral.services.azureml.net/subscriptions/9f66c130b37642d399ccd111f9294ef3/services/df434a4bca194aa989d879cf3de8efd9/execute?api-version=2.0&format=swagger'
api_key = '9EoXauLxa4Z6/wbVwJYIM6lLHyfgSQQ1Lf+nM2pct/Q6C3s9r7gvMiBMAgAwJpdqpD/qySPqupvxT+U9K9A/Tg==' # Replace this with the API key for the web service
headers = {'Content-Type':'application/json', 'Authorization':('Bearer '+ api_key)}

request = urllib2.Request(url, body, headers)

try:
    response = urllib2.urlopen(request)
    result = response.read()
    print(result)
except urllib2.HTTPError, error:
    print("The request failed with status code: " + str(error.code))