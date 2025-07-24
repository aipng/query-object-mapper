# Query object mapper
How to install?
```shell
npm install query-object-mapper --save
```

Simple tool, that helps to map object with properties to query URL parameter object.

Currently, these basic parameter types are supported:
- string, string[]
- number, number[]
- boolean

## Usage

When defining custom mapper, man must define parameter types and names.

Let's define three parameters:
- string parameter with default value `foo`, that is limited to two options: 'foo', 'bar'
- boolean parameter `myBoolean`, that would be represented by 'myb' parameter in URL
- number parameter `myNumber` with default value 3

### Boolean parameter
- parses
  - '1' or 'true' as true
  - '0' or 'false' as false
  - other inputs are parsed as default value (as undefined)
- generates '1' for true, '0' for false

### String parameter
- trims input, empty string is parsed as undefined
- array input parsed as undefined

### Number parameter
- array input parsed as undefined

### Number array parameter
- parses array or comma separated list
- generates comma separated list

```javascript
import QueryMapper from 'query-object-mapper'

const mapper = new QueryMapper()

mapper.addStringParam('myString')
	.setOptions('foo', 'bar')
	.setDefault('foo')
mapper.addBooleanParam('myBoolean', 'myb')
mapper.addNumberParam('myNumber').setDefault(3)
mapper.addNumberArrayParam('myNumbers')
mapper.addStringArrayParam('myStrings')

// get someUrlQueryParameters,
// eg. convert URL query from string to object
const myParameters = mapper.parse(someUrlQueryParameters)

// create myParameterObject
const urlQueryObject = mapper.generateQuery(myParameterObject)
```

### Conditional parameters

When building filter form, I found out that it comes handy to be able to define conditional parameter. Eg. I'd like to limit results by selected user - but only when I check related checkbox.

I often use those two related params conditionally - I do propagate selected user to URL query only when checkbox is checked. Othwerwise I'm not interested in the "selected user" value.

How do I map this?

```javascript
import QueryMapper from 'query-object-mapper'

const mapper = new QueryMapper()

mapper.addStringParam('fulfilled')
mapper.addConditionFor('fulfilled', 'fulfilledCondition')

mapper.addStringParam('omitted')
mapper.addConditionFor('omitted', 'omittedCondition')

// get someUrlQueryParameters,
// eg. convert URL query from string to object
const myParameters = mapper.parse({
	fulfilled: 'foo',
})

console.log(myParameters === {
	fulfilled: 'foo',
	fulfilledCondition: true,
	omitted: null,
	omittedCondition: false,

}) // true

// create myParameterObject
const urlQueryObject = mapper.generateQuery({
	fulfilled: 'foo',
	fulfilledCondition: true,
	omitted: 'bar',
	omittedCondition: false,
})

console.log(urlQueryObject === {
	fulfilled: 'foo',
}) // true
```

## How does it work?
- default parameter values are not propagated to query
- boolean parameters are converted to string representation (true => '1', false => '0')
- unknown options are silently parsed to default value, but cannot be generated to query
