define n


endef


build-backend:
	$(info $nConstruindo dependências do backend$n)
	rm -rf virtualenv
	virtualenv -p python3 virtualenv
	virtualenv/bin/pip install -r backend/backend/requirements.txt
	virtualenv/bin/python3 backend/manage.py migrate

build-frontend:
	$(info $nConstruindo dependências do frontend$n)
	npm install

build:
	@$(MAKE) build-backend --silent
	@$(MAKE) build-frontend --silent
	@echo OK

run-backend:
	virtualenv/bin/python3 backend/manage.py runserver

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
