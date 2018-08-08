# Ts.JsonProperties

[![Build Status](https://travis-ci.org/TypedProject/ts-json-properties.svg?branch=master)](https://travis-ci.org/TypedProject/ts-json-properties)
[![Coverage Status](https://coveralls.io/repos/github/TypedProject/ts-json-properties/badge.svg?branch=master)](https://coveralls.io/github/TypedProject/ts-json-properties?branch=master)
![npm](https://img.shields.io/npm/dm/ts-json-properties.svg)
[![TypeScript](https://badges.frapsoft.com/typescript/love/typescript.svg?v=100)](https://github.com/ellerbrock/typescript-badges/)
[![Package Quality](http://npm.packagequality.com/shield/ts-json-properties.png)](http://packagequality.com/#?package=ts-json-properties)
[![npm version](https://badge.fury.io/js/ts-json-properties.svg)](https://badge.fury.io/js/ts-json-properties)
[![Dependencies](https://david-dm.org/romakita/ts-json-properties.svg)](https://david-dm.org/romakita/ts-json-properties#info=dependencies)
[![img](https://david-dm.org/romakita/ts-json-properties/dev-status.svg)](https://david-dm.org/romakita/ts-json-properties/#info=devDependencies)
[![img](https://david-dm.org/romakita/ts-json-properties/peer-status.svg)](https://david-dm.org/romakita/ts-json-properties/#info=peerDependenciess)
[![Known Vulnerabilities](https://snyk.io/test/github/romakita/ts-json-properties/badge.svg)](https://snyk.io/test/github/romakita/ts-json-properties)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

> Use typescript decorator to retrieve a property from properties.json and load it on class attribute.

## Features

 * `@Value(expression)` : resolve expression and values the attribute (decorator).
 * `@Constant(expression)` : resolve expression and values the attribute but attribut is frozen (decorator).
 * `@EnvValue(expression)` : resolve expression and values the attribute from process.node.env or from properties if env value doesn't exists (decorator).
 * `Properties.get()` : resolve expression and values the attribute (programmatic).

## Installation

```bash
npm install -g typescript
npm install ts-json-properties
```

## Example

In first place, you need to create a `properties.json in your project's root and write some data like this :

```json
{
 "product":"MP",
  "myOwnData":{
    "data1":1
  }
}
```

You can separate your json in multiple json file with the attribute `propertiesFile`. Just adding this code on your `properties.json` :

```json
{
 "product":"MP",
  "myOwnData":{
    "data1":1
  },
  "propertiesFiles":{
    "cwd":"./properties",
    "files":{
      "documents": "documents.json",
      "wsdl": "wsdl.json"
    }
  }
}
```

In this case, when `Properties` load your properties file in memory, it'll provide a JSON like this :

```json
{
 "product":"MP",
  "myOwnData":{
    "data1":1
  },

  "documents": {
    "doc1": "/directory/docs/file.pdf"
  },
  
  "wsdl": {
    "wsdl1": "..."
  }

}
```

Next step, You must initialize `Properties` in your `app.js`. Just add this code for that :

```typescript
import {Properties} from 'ts-json-properties';

Properties.initialize(); //Import automatically properties.json 

//or load it from another path

Properties.initialize('path/to/properties.json'); 

```

And finally, you use the decorator to values attributes on your class.

```typescript
import {Value, Properties} from 'ts-json-properties';

export class Foo {
    
    @Value('documents.doc1')
    private documents1:string; 
    
    constructor(){
    
        console.log('Doc =>', this.documents1); // Doc => /directory/docs/file.pdf
        
        //or with Properties Api
        
        console.log('wsdl', Properties.get('wsdl')); // wsdl => {"wsdl1":"..."}
    }
}
```
> **Note** : All properties returned by `@Value` or `Properties.getValue` are **immutable**.


### From Env

Define your env variable:

```bash
export path__to__var = "1000"
```

Then use `@EnvValue`:

```typescript
import {Value, Properties} from 'ts-json-properties';

export class Foo {
    @EventValue('path.to.var')
    private documents1: string; 
}
```
> Note: if the env value is undefined, the value will be retrieved from properties.json 

## Test

```bash 
$ npm install -g mocha
$ npm test
```

## License

The MIT License (MIT)

Copyright (c) 2016 Romain Lenzotti

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[travis]: https://travis-ci.org/
