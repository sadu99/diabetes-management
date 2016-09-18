from twilio.rest import TwilioRestClient 
 
# put your own credentials here 
ACCOUNT_SID = "ACbc9e801bf204478a123d19737f035210" 
AUTH_TOKEN = "3616343ccfccc788588477c5d2b75963" 
 
client = TwilioRestClient(ACCOUNT_SID, AUTH_TOKEN) 

def text(name, number, probability, patient_is_diabetic):
	status = "" 
	print patient_is_diabetic
	if not int(patient_is_diabetic):
		status = "not "
	client.messages.create(
		to=number,
		from_="+16475591520",
		body="Hi %s, based on your recent results, we are %s%s sure that you are %sdiabetic." % (name, probability, "%", status),
	)