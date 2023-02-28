
<h1> Hospital - API</h1>


### Theme :-
```
This API is for the doctors of a Hospital which has been allocated by the govt for testing and quarantine + well being of COVID-19 patients.

* There can be 2 types of Users
- Doctors
- Patients

* Doctors can log in ,Each time a patient visits, the doctor will follow 2 steps
- Register the patient in the app (using phone number, if the patient already exists, just
    return the patient info in the API).
- After the checkup, doctor will create a Report.

* Patient Report will have the following fields
- Created by doctor
- Status (You can use enums if you want to):
- Can be either of: [Negative, Travelled-Quarantine, Symptoms-Quarantine,Positive-Admit]

```

### Routes :-


1. /doctors/register 

```
- This is a POST request.
- All the required fields such as username,email,password,name should not be empty
- User should not be able to register if he is already a registered user
- Only Unregistered users can register

```
2. /doctors/login

```
- This is a POST request.
- Username and password should not be empty
- Email/Password should match correctly with the details present in the db
- If the user logged in successfully, then we are creating a JWT token for the user to use it for accessing protected routes.

```
3. /patients/register   -> protected route

```
- This is a POST request.
- Only the logged In doctors can access this route to register a new patient as it is a protected route
- Name and Phone fields should not be empty
- Phone number should be a valid number
- If the Patient already exists, then send them the patient info with the message 'already exists'
- Only unregistered patients details can be registered
```

4. /patients/:id/create_report -> protected route

```
- This is a POST request.
- Only the logged In doctors can access this route to create the report as it is a protected route.
- Patient Id is in the Params and from request's body we can get the status data. Also from authorization header token we are fetching the payload to extract the doctor Id to create the report.
- Entered status should not be empty and should be valid i.e. should be either of the status enums
- If both doctor and patient is present , then creating a report and pushing it to the patient's reports array.

```

5. /patients/:id/all_reports → List all the reports of a patient oldest to latest

```
- This is a GET request.
- Patient Id is coming from Url Params
- Patient Id should be a valid Object Id
- Only registered Patients details can be generated, else it will ask to register the user
- If no record found for the registered patient , then it will convey the message that 'Records not found'
- If the records generated successfully, it will send the response with the data.

```

6. /reports/:status → List all the reports of all the patients filtered by a specific status

```
- This is a GET request.
- Status field is coming from Url
- Status should not be empty
- If no record found for the registered patient with the given status , then it will convey the message that 'Records not found'.
- If the records generated successfully, it will send the response with the data.
```


</ol><h2>Tools/Technologies Used</h2>
<hr><ul>
<li>Node.JS</li>
</ul><ul>
<li>Express.JS</li>
</ul><ul>
<li>PostMan</li>
</ul><ul>
<li>MongoDB</li>
</ul>

<hr>

## How To Use :-

####    Step 1 :-  Clone the repo
 
 ```
git clone https://github.com/SahilMund/Hospital-API.git
 ```
####    Step 2 :- To install the dependencies

```
npm install
```

#### Step 3 :- To run the application
```
npm start
```

#### Step - 4 :- To check the API response

```

- Use Postman
- Import the Json file present in postman folder to postman 
- Check the API response

```


## Folder Structure :-
```
.gitignore
.vscode
   |-- settings.json
READEME.md
config
   |-- mongoose.js
   |-- passport-jwt-strategy.js
   |-- status-enum.js
controllers
   |-- api
   |   |-- index.js
   |   |-- v1
   |   |   |-- doctor_controller.js
   |   |   |-- index.js
   |   |   |-- patient_controller.js
   |   |   |-- report_controller.js
   |-- index.js
index.js
models
   |-- doctor.js
   |-- patient.js
   |-- report.js
package-lock.json
package.json
postman             // Here postman folder contains the json file, which can be imported to postman to see the documentation
   |-- Hospital_API_V1.postman_collection.json
routes
   |-- api
   |   |-- index.js
   |   |-- v1
   |   |   |-- doctors.js
   |   |   |-- index.js
   |   |   |-- patients.js
   |   |   |-- reports.js
   |-- index.js

```
