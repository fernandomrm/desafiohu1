define n


endef


build-backend:
	$(info $nConstruindo dependências do backend$n)
	rm -rf virtualenv
	virtualenv -p python3 virtualenv
	virtualenv/bin/pip install -r backend/backend/requirements.txt
	cd backend && ../virtualenv/bin/python3 manage.py migrate

build-frontend:
	$(info $nConstruindo dependências do frontend$n)
	npm install

build:
	@$(MAKE) build-backend --silent
	@$(MAKE) build-frontend --silent
	@echo OK

run-backend:
	cd backend && ../virtualenv/bin/gunicorn -w 4 --access-logfile=- backend.wsgi:application

run-frontend:
	npm start

test-backend:
	$(info $nRodadando testes do backend$n)
	cd backend && ../virtualenv/bin/python3 manage.py test --settings=backend.settings.test

test-frontend:
	$(info $nRodadando testes do frontend$n)
	npm test

test:
	@$(MAKE) test-backend --silent
	@$(MAKE) test-frontend --silent

flake8:
	@cd backend && ../virtualenv/bin/flake8 --max-line-length=119 --exclude=virtualenv/,migrations/ . || true
