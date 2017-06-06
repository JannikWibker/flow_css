## flow css
flow-css is a super small selfmade css preprocessor made to be used with react or other js frameworks ( since flow-css does not have selectors ( *yet* ); you have to use flow-css from inside js and use something like **styled-components** or **styled-jsx** with flow-css ). Flow-css looks a bit like **SASS**, has something that could be called a type system ( the types are '**number**', '**hex**', '**bin**', '**unit**' (a number with a postfix ( like '**px**' )), '**string**' and '**symbol**' (symbol means either css key or function name / call) )

#### type conversion
flow-css converts **hex** and **bin** if needed to **number**
```scss
color #123abc
```
would not be converted to a number because a hexadecimal number is expected.

```scss
background-color #12 #34 #56
```
would be converted, since numbers are expected (and **rgb()** would be added).
```css
background-color: rgb(18, 52, 86);
```
Based on what parameters are given the output would vary; the possible outputs are:
- rgb()
- rgba()
- hsl()
- hsla()

Which of these is chosen depends on the types of the given parameters.
