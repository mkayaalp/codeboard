# Eiffel Library

In order to use the "Browse library" feature within the IDE, copy the Eiffel library files here:

```
for f in `find ~/Eiffel_19.05/library/base -name \*.e`; do cp $f `basename $f`; done
```
