build-backend:
	rm -rf virtualenv
	virtualenv -p python3 virtualenv
	virtualenv/bin/pip install -r backend/backend/requirements.txt
	virtualenv/bin/python3 backend/manage.py migrate

build-frontend:
	npm install

build:
	make build-backend
	make build-frontend

run-backend:
	virtualenv/bin/python3 backend/manage.py runserver

run-frontend:
	npm start
