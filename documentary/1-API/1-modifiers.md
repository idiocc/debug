## Modifiers

The modifiers can be used to print information in formatted way.

```table
[
  ["Modifier", "Action"],
  ["%O", "Multiline inspect."],
  ["%o", "Single line inspect."],
  ["%f", "File-size format of bytes, e.g., 10MB."],
  ["%fy", "File-size in yellow."],
  ["%fr", "File-size in red."],
  ["%fb", "File-size in blue."],
  ["%fg", "File-size in grey."],
  ["%fc", "File-size in cyan"],
  ["%fm", "File-size in magenta."]
]
```

%EXAMPLE: example/modifier, ../src => @idio/debug%
%FORKERR example/modifier%

%~%