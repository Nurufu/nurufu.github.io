for x in *; do
    mv $x `echo $x | cut -6 5-`
done
