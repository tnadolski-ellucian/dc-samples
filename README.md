# Experience Extensibility - Data Connect - Automation

## Extension

The extension assume the included 5 pipelines are available to your environment-stage.
The examples covered are:

1. Preview with card config (ethosApiKey supplied as card config in preview)
2. Card config (ethosApiKey supplied as card config)
3. using a default param (default param of the pipeline, not provided by extension)
4. person filter (filters based on user context)
5. query param (checks for passed parameter)
6. bpapi vibe check

## Pipelines

1. exp-automation-all-persons: uses a default param on the pipeline to call /persons endpoint. Checks that default param works when being called from an extension
2. exp-automation-my-person-holds: uses a default param on the pipeline to call /person-holds?person={id} endpoint. Checks that my logged in user's id is in context for api calls.
3. exp-automation-with-card-config: uses a param which obtains a value from card config. Checks that ethosApiKey populates properly from configuration; reused for preview check
4. exp-automation-with-query-parama: checks that query parameters are passed correctly from a card.
