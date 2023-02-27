
<h1> Hospital - API</h1>


### Theme :-
```
This API is for the doctors of a Hospital which has been allocated by the govt for testing and quarantine + well being of COVID-19 patients.

* There can be 2 types of Users
- Doctors
- Patients

* Doctors can log in ,Each time a patient visits, the doctor will follow 2 steps
- Register the patient in the app (using phone number, if the patient already exists, just
    return the patient info in the API)
- After the checkup, create a Report

* Patient Report will have the following fields
- Created by doctor
- Status (You can use enums if you want to):
- Can be either of: [Negative, Travelled-Quarantine, Symptoms-Quarantine,Positive-Admit]

```

### Routes :-

```

- /doctors/register 
- /doctors/login 
- /patients/register   -> Private route
- /patients/:id/create_report -> private route
- /patients/:id/all_reports → List all the reports of a patient oldest to latest
- /reports/:status → List all the reports of all the patients filtered by a specific status
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