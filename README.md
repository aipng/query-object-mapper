Query object mapper
===================
How to install?
```shell
npm install query-object-mapper --save
```

Simple tool, that helps to map object with properties to query URL parameter object.

Currently, three basic parameter types are recognized:
- string
- number
- boolean

**Usage?**

When defining custom mapper, man must define parameter types and names.

Let's define three parameters:
- string parameter with default value `foo`, that is limited to two options: 'foo', 'bar'
- boolean parameter `myBoolean`, that would be represented by 'myb' parameter in URL
- number parameter `myNumber` with default value 3

```javascript
import QueryMapper from 'query-object-mapper'

const mapper = new QueryMapper()

mapper.addStringParam('myString')
	.setOptions('foo', 'bar')
	.setDefault('foo')
mapper.addBooleanParam('myBoolean', 'myb')
mapper.addNumberParam('myNumber').setDefault(3)

// get someUrlQueryParameters,
// eg. convert URL query from string to object
const myParameters = mapper.parse(someUrlQueryParameters)

// create myParameterObject
const urlQueryObject = mapper.generateQuery(myParameterObject)
```

**How does it work?**
- default parameter values are not propagated to query
- boolean parameters are converted to string representation (true => '1', false => '0')
- unknown options are silently parsed to default value, but cannot be generated to query
