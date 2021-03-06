# OkJS

> A super tiny TypeScript library for form validation

## Introduction

Ok is a very small utility library to validate forms with more than what HTML5 offers you.
Features include customized messages and validator chaining.

**[Docs](https://felixrilling.github.io/ok/)**

## Usage

```shell
npm install okjs --save
```

### Syntax

```typescript
import { Ok } from "okjs";

/**
 * Create Ok instance with custom validators
 */
const ok = new Ok({
    nameFirst: {
        msg: "Only 'Dave' allowed",
        fn: (element) => element.value === "Dave"
    },
    emailDe: {
        msg: (element) => `Please input your .de email (You entered '${element.value}')`,
        fn: (element, e) => element.value.endsWith(".de")
    }
});

/**
 * Bind validation event handlers to inputs
 */
ok.bind(document.querySelector("#inputNameFirst"));
ok.bind(document.querySelector("#inputMail"));
```

The validator which will be used is defined in the DOM via data-attributes:

```html
<form class="form">
    <div>
        <label>First Name (only "Dave" allowed)</label>
        <input type="text" required data-ok="nameFirst">
    </div>
    <div>
        <label>Last Name (not validated, anything goes)</label>
        <input type="text" required>
    </div>
    <div>
        <label>Email address (only ".de" allowed)</label>
        <input type="email" required data-ok="emailDe">
    </div>
    <input type="submit">
</form>
```

The name defined in `data-ok` is the key of the validator dictionary object defined in the JS Ok constructor parameter.
if the given fn evaluates to false, the input will be marked as invalid.

### Validation

Once the user inputs on a field bound by Ok, the validator function will be run. If it evaluates to true, the field is valid.
If it evaluates falsy, the field will be marked as invalid, and the input validity will be updated (which will show a popup containing the validator message, based on the browser).

### Chaining

Multiple validators can be used for a single element in a given order by chaining them. to chain multiple validators, simply add a comma between their keys in the ok attribute. When using chaining, the field will only be considered valid if all validators succeed. Once a validator marks the field as invalid, all further validators are skipped.

```html
<div class="form-group">
    <label for="exampleInputEmail">Email ID (all caps and ending in .de)</label>
    <input type="email" required data-ok="nameCaps,emailDe">
</div>
```

```typescript
import { Ok } from "okjs";

const ok = new Ok({
    nameCaps: {
        msg: "Must be in all caps",
        fn: (element) => element.value.toUpperCase() === element.value
    },
    emailDe: {
        msg: "Must end with '.de'",
        fn: (element) => /.+\.de$/i.test(element.value)
    }
});
```

### Caveats

#### Radiobuttons

Due to the way input elements with type `radio` work, validation is not straightforward. A single
radio button only fires its `change`/`input` event when itself is changed, not if it becomes e.g.
inactive due to another radiobutton being selected. A workaround is using an enclosing fieldset and
listening to the events of that.

## Compatibility

Ok should work in all browsers that support the following:

- <https://caniuse.com/form-validation>
- <https://caniuse.com/mdn-api_htmlinputelement_setcustomvalidity>
