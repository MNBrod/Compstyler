HTML must NOT:
  use spaces:
    <div class="container"></div> is okay
    <div class = "container"></div> is NOT okay
  use single quotes:
    <div class="container"></div> is okay
    <div class='container'></div> is NOT okay

Things that need to be done:
  -read the user's file and parse for needed style components
  -search through a given set of stylesheets for any styles that match
   the needed style components
  -compile a new file of the needed components

Possible ideas:
  -make the compiler only parse the input and generate a hashed key
   represesnting everything that's needed. that key is sent to a server
   on page render (eg <src website.com/key_here />). that server then serves
   an appropriate stylesheet using the method outlined above
  -webpack plugin

TODOS:

1.make a file parser that takes an HTML or React file, and can find all tags,
  ids, and classes in the entire file, and return them in a list
2.make a file parser that takes a css file and a list of tags/ids/classes and
  return a list of the relevant style elements
3.make a file writer that takes a list of styles and saves them in a file, in
  some order. then that file is exported to a predefined location
