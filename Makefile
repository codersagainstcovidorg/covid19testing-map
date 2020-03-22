build-docker:
	docker build -t findcovidtesting:latest .

run-docker:
	docker run -p 8080:3000 -d findcovidtesting
