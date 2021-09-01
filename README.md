# Sentence splitter
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://standardjs.com/)

Best-effort sentence splitter, based on Google Text Analysis API and verb-conjuction utterance aggregation.

## Configure

- GCP Console => Activate Natural Language API => Create Service Account => Create JSON key
- Put the key.json into config/

## Run

```
npm start "I am hungry but I am also tired and I want to skate"
>> [ 'I am hungry', 'but I am also tired', 'and I want to skate' ]
```

## Print tokenization info
```
DEBUG=true npm start "I am hungry but I am also tired and I want to skate"
```

## Official Doc

[Google Text Analysis](https://cloud.google.com/natural-language/docs/quickstart-client-libraries#client-libraries-install-nodejs)
