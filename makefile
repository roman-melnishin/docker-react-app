dev:  ## Run a development environment on port 3000
	@docker-compose build dev
	@docker-compose up dev

test: ## Run the current test suite
	@docker-compose build test
	@docker-compose run --rm test
