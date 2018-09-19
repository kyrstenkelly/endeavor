Endeavor Data Models
====================

**Table of Contents**
- [Endeavor Data Models](#endeavor-data-models)
  - [Survey](#survey)
  - [Section](#section)
  - [Result](#result)
  - [Question](#question)
  - [Survey Results](#survey-results)

## Survey

* `id` _string_
* `version` _string_
* `sections` _array_
  * Array of section objects. See [Section](#section) below for details.
  
Example Survey:
```json
{
  "id": "endeavor-survey",
  "version": "1.0.0",
  "sections": [{
    "id": "section-1",
    "type": "intro",
    "data": {}
  }]
}
```

## Section
* `id` _int_
* `type` _string_: One of `'intro', 'question', 'result'`
* `data` _object_: Differs based on type

Section Examples:  
  
**`"intro"` type**
```json
{
  "id": 1,
  "type": "intro",
  "data": {
    "title": "Welcome to Endeavor",
    "subtitle": "...",
    "text": "...",
    "cta_text": "Get Started"
  }
}
```

**`"question"` type**
```json
{
  "id": 2,
  "type": "intro",
  "data": {
    "question_id": 2
  }
}
```

**`"result"` type**  
```json
{
  "id": 3,
  "type": "result",
  "data": {
    "result_id": 1
  }
}
```
  
## Result
Because results are all based on answers to answers the user has given, they have an array of "potential results" that correlate to particular answers, and the question ID from which to get the students's answers.
  
The data object for `"result"` type sections should have the following properties:
* `id` _int_
* `type` _string (required)_
  * One of: `"quote"`, `"statistic"`, `"company"`, `"gif"`
* `data` _array (optional)_
  * An array of data objects 
  * Use `data` if the result is not dependent on a previous question
* `question_id` _int (optional)_
  * Question ID for the answers this result depends on
  * Optional in the case that the result is not dependent on a previous question
  * Required if `data` property is not provided
* `potential_data` _object (optional)_
  * An object mapping an answer key to a list of potential data objects to display to the user given that answer
  * Optional in the case that the result is not dependent on a previous question
  * Required if `data` property is not provided

Example with `data` property:  
```json
{
  "id": 1,
  "type": "quote",
  "data": [{
    "quote": "A quote about Udacity",
    "author": "John Doe",
    "title": "Alumni"
  }, {
    "quote": "Another qoute about Udacity",
    "author": "Jane Doe",
    "title": "Curriculum Lead"
  }]
}
```

Example with `potential_data` property:
```json
{
  "id": 2,
  "type": "statistic",
  "question_id": 2,
  "potential_data": {
    "answer_1": [{
      "statistic": "88%",
      "subtitle": "of Udacity Graduates",
      "text": "find a job within 1 year"
    }],
    "answer_2": [{
      "statistic": "67%",
      "subtitle": "of Udacity students",
      "text": "report getting promotions at work"
    }]
  }
}
```

The objects in the `data` array or in the `potential_data` mappings vary depending on the `type`.   

**`"quote"` type**
* `avatar` _string_
  * URL to the avatar image
* `quote` _string_
* `author` _string_
* `title` _string_
  * Title of the author, i.e. "Alumni" or "Curriculum Lead"


**`"statistic"` type**
* `statistic` _string_
* `subtitle` _string_
* `text` _string_


**`"company"` type**
* `icon` _string_
  * URL to the company's icon
* `company` _string_
  * The company name
* `text` _string_
  * Text about the company


**`"gif"` type**
* `url` _string_
  * URL for the gif
* `title` _string_
  * Title to display with GIF


## Question

* `id` _int (required)_
* `text` _string (required)_
* `num_answers_allowed` _int (required)_
  * The number of answers allowed (typically 1, sometimes more)
* `choices` _array (optional)_
  * Optional if `potential_choices` and `dependent_question_id` are provided
  * Array of objects detailing the available answer choices:
    * `key` _string_: Key for identifying the choice
    * `text` _string_: Text to display to the user
* `potential_choices` _object (optional)_
  * Required if `choices` is not provided
  * Object mapping answers from a previous question to choices, ex:
    ```json
    "potential_choices": {
      "answer_key_1": [{
        "key": "...",
        "text": "..."
      }],
      "answer_key_2": [{
        "key": "...",
        "text": "..."
      }]
    }
    ```
* `dependent_question_id` _int (optional)_
  * Question ID from which to get answers to populate the choices
  * Required if `choices` is not provided

Example Question (with `choices`):
```json
{
  "id": 1,
  "text": "Millions of students come to Udacity worldwide, what brought you here?",
  "num_answers_allowed": 1,
  "choices": [{
    "key": "new_job",
    "text": "Find a new job or switch careers"
  }, {
    "key": "grow_skills",
    "text": "Expand my skillset and/or advance in my career"
  }]
}
```

Example Question (with `potential_choices`):
```json
{
  "id": 3,
  "text": "The companies you selected focus on the following topics. What interests you?",
  "num_answers_allowed": 1,
  "potential_choices": {
    "google": [{
      "key": "deep_learning",
      "text": "Deep Learning"
    }],
    "amazon": [{
      "key": "autonomous_systems",
      "text": "Autonomous Systems"
    }]
  },
  "dependent_question_id": 2
}
```


## Survey Results

* `id` _int_
* `survey_id` _int_
* `survey_version` _string_
* `complete` _boolean_
  * True if the user has completed the survey
* `email` _string_
  * Users email address, provided before results are shown
  * Email may not be present if survey is not complete
* `answers` _array_: Array of answer objects:
  * `question_id` _int_
  * `question_text` _int_
  * `selected_answers` _array_
    * Array of answer choices selected (same format as choices above)
* `checklist` _array_
  * Array of checklist objects:
    * `key` _text_
    * `task` _text_
    * `complete` _boolean_
    * `data` _object_: Data about the task - url, etc. Model TBD.

Example Survey Result:

```json
{
  "id": 1,
  "survey_id": 1,
  "survey_version": "1.0.0",
  "email": "example@learning.org",
  "complete": true,
  "answers": [{
    "question_id": 1,
    "question_text": "Millions of students come to Udacity worldwide...",
    "selected_answers": [{
      "key": "new_job",
      "text": "Find a new job or switch careers"
    }]
  }],
  "checklist": [{
    "key": "ndop_pages",
    "task": "Explore School of Pages",
    "complete": false
  }, {
    "key": "syllabus",
    "task": "Download Syllabus",
    "complete": true
  }]
}
```
