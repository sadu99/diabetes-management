import urllib2
import json

def get_response(data):

	body = str.encode(json.dumps(data))

	# Azure Machine Learning Web Service Connection Strings
	url = 'https://ussouthcentral.services.azureml.net/subscriptions/9f66c130b37642d399ccd111f9294ef3/services/df434a4bca194aa989d879cf3de8efd9/execute?api-version=2.0&format=swagger'
	api_key = '9EoXauLxa4Z6/wbVwJYIM6lLHyfgSQQ1Lf+nM2pct/Q6C3s9r7gvMiBMAgAwJpdqpD/qySPqupvxT+U9K9A/Tg=='
	headers = {'Content-Type':'application/json', 'Authorization':('Bearer '+ api_key)}

	# Create request
	request = urllib2.Request(url, body, headers)

	try:
		# Connect to Azure, construct and return output response body
	    response = urllib2.urlopen(request)
	    result = json.load(response)

	    final_output = { 
	    	"patient_is_diabetic": result['Results']['output1'][0]['Scored Labels'], 
	    	"probability": result['Results']['output1'][0]['Scored Probabilities']
	    	}

	    return final_output
	except urllib2.HTTPError, error:
	    print("The request failed with status code: " + str(error.code))



