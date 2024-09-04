## Setup
Steps to launch this project.
```bash
git clone https://github.com/Milosz-Szymczak/Employee.git
cd backend
mvnw package
cd..
docker-compose build
docker-compose up
```
App works at http://localhost:8080/.

--------------------------------------------------

Keycloak works at http://localhost:9090/.

EmployeeKey - name for 'realm'.

client - name for 'clientId'.
