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
