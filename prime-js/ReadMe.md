# Prime Numbers

# What we are looking for?!!

Lets have a look to the prime numbers:

- 2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97

If we remove 2 and 3, and have a deeper look, it seems there is a trend there:

- 5 (+2) -> 7 (+4) -> 11 (+2) -> 13 (+4) -> 17 (+2) -> 19 (+4) -> 24 (+2) -> 25 ...

25 is not a prime number. But lets just wait for a moment and look deeper. If we split this trend to two trends, one start by 5 and the other one by number 7:

- 5 (+6) -> 11 (+6) -> 17 (+6) -> 23 (+6) -> 29 (+6) -> 35 ...
- 7 (+6) -> 13 (+6) -> 19 (+6) -> 25 (+6) -> 31 (+6) -> 37 ...

Now lets not scare of this extra numbers (Which some of them are semi-primes and some others are semi-primes multiplied by primes or semi-primes). At first we can say for these two trends at the top, we can write trends:

- 6n-1 ( n >= 1 )
- 6n+1 ( n >= 1 )

Now that is good, but it is not just this. We need to talk about the other extra numbers. All the numbers can be produced by the following trend:

- 6n + r ( r : { 0,1,2,3,4,5 } )

First lets check why the trends at the top can produce the prime numbers:

- 6n : even numbers | not prime.
- 6n + 1 : we can discuss about this.
- 6n + 2 : even numbers | Nor Ptime.
- 6n + 3 : multiply of number 3 | not prime.
- 6n + 4 : even numbers | not prime.
- 6n + 5 : we can write this as 6n - 1 | we can discuss about this.

Now we discovered ( really?! ) that prime numbers can be produced by (6n-1) and (6n+1) trends. Now what about those extra numbers??!

- 6n + 1 = (6k + r)(6kk + rr) -> 6n + 1 = 6 (6k.kk + k.rr + r.kk) + r.rr ->
  r.rr = 1 -> (r,rr) = (1, 1) or (-1, -1)

  - 6n + 1 = (6k+1)(6kk+1) or (6k-1)(6kk-1)

<br>

- 6n - 1 = (6k +r)(6kk+rr) -> 6n - 1 = 6(6k.kk + k.rr + r.kk) + r.rr ->
  r.rr = -1 -> (r,rr) = (-1, 1) or (1, -1)

  - 6n - 1 = (6k-1)(6kk+1) or (6k+1)(6kk-1)

<br>

Then, we can mention that these extra numbers are the ones produced by multiplying the numbers produced by (6n+1) and (6n-1) trend. Or in the better way, we can say those extra numbers are semi-primes.

<br>
<hr>

## How to find the primes?!

We are gonna talk about this on how to write a code to find the primes.

<br>

### First way

We can write a code that gonna produce the numbers of these two following trends, and then check if any can be divided by the numbers produced by the trend before it. And by the way, we do not need to check all the smaller than a number, we can check the ones smaller or equal to sqrt of that number.

- Why??

  Suppose we want to find all the divisions of number 24. (24 = 2\*\*3 - 3)

  1, 2, 3, 4, 6, 8, 12, 24

  by dividing number 24 to the numbers smaller that sqrt(24) ~= 4 , we can find all the divisions:

  - 24 / 1 = 24 -> 1, 24
  - 24 / 2 = 12 -> 2, 12
  - 24 / 3 = 8 -> 3, 8
  - 24 / 4 = 6 -> 4, 6

  Then if we want to find if a number have any divisions, we just need to check the numbers smaller than sqrt(number). And do not forget that we just need to check the ones that follow the trends. ( and even we do not need to check if they can be divided by 2 or 3).

Example: We want to find all the primes smaller than 40:

- n = 1 -> 6n-1 = 5 -> sqrt(5) ~= 2 : prime
- n = 1 -> 6n+1 = 7 -> sqrt(7) ~= 2 : prime

- n = 2 -> 6n-1 = 11 -> sqrt(11) ~= 3 : prime
- n = 2 -> 6n+1 = 13 -> sqrt(13) ~= 3 : prime

- n = 3 -> 6n-1 = 17 -> sqrt(17) ~= 4 : prime
- n = 3 -> 6n+1 = 19 -> sqrt(19) ~= 4 : prime

- n = 4 -> 6n-1 = 23 -> sqrt(23) ~= 4 : prime
- n = 4 -> 6n+1 = 25 -> sqrt(25) ~= 5 -> 25 % 5 = 0 : not prime

- n = 5 -> 6n-1 = 29 -> sqrt(29) ~= 5 -> 29 % 5 != 0 : prime
- n = 5 -> 6n+1 = 31 -> sqrt(31) ~= 5 -> 31 % 5 != 0 : prime

- n = 6 -> 6n-1 = 35 -> sqrt(35) ~= 5 -> 35 % 5 = 0 : not prime
- n = 6 -> 6n+1 = 37 -> sqrt(37) ~= 6 -> 37 % 5 != 0 : prime

- Then: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37 are primes.

<hr>
<br>

### Second way

Is there a way to find those non-prime numbers??

- 6n+1 = (6k+1)(6kk+1) -> n = 6k.kk + k + kk ; k,kk >= 1

- 6n+1 = (6k-1)(6kk-1) -> n = 6k.kk - k - kk ; k,kk >= 1

- 6n-1 = (6k+1)(6kk-1) -> n = 6k.kk - k + kk ; k,kk >= 1

- 6n-1 = (6k-1)(6kk+1) -> n = 6k.kk + k - kk ; k,kk >= 1

We can give different values to k and kk, and find the indexes which will produce the non-primes. Then we can check if the index that we want to produce a prime is a non-prime index or no.

<hr>
<br>

### Third way

- 6n+1 = (6k+1)(6kk+1) -> n = 6k.kk + k + kk -> kk = (n-k)/(6k+1); k >= 1

- 6n+1 = (6k-1)(6kk-1) -> n = 6k.kk - k - kk -> kk = (n+k)/(6k-1); k >= 1

- 6n-1 = (6k+1)(6kk-1) -> n = 6k.kk - k + kk -> kk = (n+k)/(6k+1); k >= 1

- 6n-1 = (6k-1)(6kk+1) -> n = 6k.kk + k - kk -> kk = (n-k)/(6k-1); k >= 1

By giving a differnt values to k, we can find indexes which can produce the non-primes. Or better way to tell, we can check if number n is a non-prime index or a prime index one.

<hr>
<br>

### Forth way

- 6n+1 = (6k+1)(6kk+1) -> n = 6k.kk + k + kk -> kk = (n-k)/(6k+1); k >= 1

- 6n+1 = (6k-1)(6kk-1) -> n = 6k.kk - k - kk -> kk = (n+k)/(6k-1); k >= 1

- 6n-1 = (6k+1)(6kk-1) -> n = 6k.kk - k + kk -> kk = (n+k)/(6k+1); k >= 1

- 6n-1 = (6k-1)(6kk+1) -> n = 6k.kk + k - kk -> kk = (n-k)/(6k-1); k >= 1

We can plot for different values of k and kk and if the value of n is integer, then we can say that is non-prime index.

Or by giving different values to kk, we can plot the equation by n , k and check where the k and n are integeres.

<hr>
<br>

### Fifth way

Lets look a little bit deeper.

1. 6n+1 = (6k+1)(6kk+1) -> n = 6k.kk + k + kk -> n = (6k+1)kk + k

2. 6n+1 = (6k-1)(6kk-1) -> n = 6k.kk - k - kk -> n = (6k-1)kk - k

3. 6n-1 = (6k+1)(6kk-1) -> n = 6k.kk - k + kk -> n = (6k+1)kk - k

4. 6n-1 = (6k-1)(6kk+1) -> n = 6k.kk + k - kk -> n = (6k-1)kk + k

It seems that all these n indexes are the ones that has residual of the same k that uses in (6k+1) or (6k-1).
Can we say for each equation, if we have another residual, that will produce all a prime number?

We can do this, but we need to check if the new residual will produce the other trend or not.

#### Lets check first one for 6n+1:

- n = 6k.kk + k + kk -> n = (6k+1)kk + k ->
  possible prime pattern: n = (6k+1)kk + R ; R % (6k+1) != k; R = 0, 1, ..., 6k

- n = 6k.kk + k + kk -> n = (6kk+1)k + kk ->
  possible prime pattern: n = (6kk+1)k + R ; R % (6kk+1) != kk; R = 0, 1, ..., 6kk

- n = 6k.kk + k + kk -> n = (6k+1)kk + k ->

  possible prime pattern: n = (6k+1)kk + R = (6k-1+2)kk + R + k - k -> n = [(6k-1)kk - k] + 2kk + R + k ->

  if we want the trend be a prime one, then the residual ( R + 2kk + k ) should not be dividable by (6k-1) ->

  possible prime pattern: n = (6k+1)kk + R; R+2kk+k % (6k-1) != 0 ; R = 0, 1, ..., 6k

- n = 6k.kk + k + kk -> n = (6k+1)kk + k ->

  possible prime pattern: n = (6kk+1)k + R = (6kk-1+2)k + R + kk - kk -> n = [(6kk-1)k - kk] + 2k + R + kk ->

  if we want the trend be a prime one, then the residual ( R + 2k + kk ) should not be dividable by (6kk-1) ->

  possible prime pattern: n = (6kk+1)k + R; R+2k+kk % (6kk-1) != 0 ; R = 0, 1, ..., 6kk

<br>

#### Lets check second one for 6n+1:

- n = 6k.kk - k - kk -> n = (6k-1)kk - k -> Possible trend: n = (6k-1)kk + R ; R % (6k-1) != -k; R = 0, 1, ..., 6k-2

- n = 6k.kk - k - kk -> n = (6kk-1)k - kk -> Possible trend: n = (6kk-1)k + R; R % (6kk-1) != -kk; R = 0, 1, ..., 6kk-2

- n = 6k.kk - k - kk -> n = (6k-1)kk - k ->

Possible trend: n = (6k-1)kk + R -> n = (6k+1-2)kk + R - k + k = [(6k+1)kk + k] + R - 2kk - k ->
trend: n = (6k-1)kk + R; R-2kk-k % (6k+1) != 0; R = 0, 1, ..., 6k-2

- n = 6k.kk - k - kk -> n = (6kk-1)k - kk ->

Possible trend: n = (6kk-1)k + R -> n = (6kk+1-2)k + R - kk + kk = [(6kk+1)k + kk] + R - 2k - kk ->
trend: n = (6kk-1)k + R; R-2k-kk % (6kk+1) != 0; R = 0, 1, ..., 6kk-2

<br>

#### Lets check the third one for 6n-1:

- n = 6k.kk + k - kk -> n = (6k-1)kk + k -> Possible trend: n = (6k-1)kk + R ; R % (6k-1) != k; R = 0, 1, ..., 6k-2

- n = 6k.kk + k - kk -> n = (6kk+1)k - kk -> Possible trend: n = (6kk+1)k + R; R % (6kk+1) != -kk; R = 0, 1, ..., 6kk

- n = 6k.kk + k - kk -> n = (6k-1)kk + k ->

Possible trend: n = (6k-1)kk + R -> n = (6k+1-2)kk + R - k + k = [(6k+1)kk - k] + R - 2kk + k ->
trend: n = (6k-1)kk + R; R-2kk+k % (6k+1) != 0; R = 0, 1, ..., 6k-2

- n = 6k.kk + k - kk -> n = (6kk+1)k - kk ->

Possible trend: n = (6kk+1)k + R -> n = (6kk-1+2)k + R - kk + kk = [(6kk-1)k + kk] + R + 2k - kk ->
trend: n = (6kk+1)k + R; R+2k-kk % (6kk-1) != 0; R = 0, 1, ..., 6kk

<br>

#### Lets check the forth one for 6n-1:

- n = 6k.kk - k + kk -> n = (6k+1)kk - k -> Possible trend: n = (6k+1)kk + R ; R % (6k+1) != -k; R = 0, 1, ..., 6k

- n = 6k.kk - k + kk -> n = (6kk-1)k + kk -> Possible trend: n = (6kk-1)k + R; R % (6kk-1) != kk; R = 0, 1, ..., 6kk-2

- n = 6k.kk - k + kk -> n = (6k+1)kk - k ->

Possible trend: n = (6k+1)kk + R -> n = (6k-1+2)kk + R - k + k = [(6k-1)kk + k] + R + 2kk - k ->
trend: n = (6k+1)kk + R; R+2kk-k % (6k-1) != 0; R = 0, 1, ..., 6k

- n = 6k.kk - k + kk -> n = (6kk-1)k + kk ->

Possible trend: n = (6kk-1)k + R -> n = (6kk+1-2)k + R - kk + kk = [(6kk+1)k - kk] + R - 2k + kk ->
trend: n = (6kk-1)k + R; R-2k+kk % (6kk+1) != 0; R = 0, 1, ..., 6kk-2

<hr>
<br>

### Sixth way

- 6n+1 = (6k+1)(6kk+1) -> n = 6k.kk + k + kk ; k,kk >= 1

- 6n+1 = (6k-1)(6kk-1) -> n = 6k.kk - k - kk ; k,kk >= 1

- 6n-1 = (6k+1)(6kk-1) -> n = 6k.kk - k + kk ; k,kk >= 1

- 6n-1 = (6k-1)(6kk+1) -> n = 6k.kk + k - kk ; k,kk >= 1

Now, we can assume that we have one equation with degree equals to 2 and the roots of k and kk. Lets see if we can dig deeper into this or no.

Assume the equation is :

    k^2 - sk + p = 0
    s = k + kk
    p = k.kk
    delta = s^2 - 4p

<br>

#### First one for 6n+1:

- n = 6k.kk + k + kk -> n = 6p + s -> s = n - 6p

  delta = s^2 - 4p = (n-6p)^2 - 4p = n^2 -12np + 36p^2 - 4p

  k1 = ((n-6p) + delta^0.5)/2 ; k2 = ((n-6p) - delta^0.5)/2

  Now, how we can have these k1 and k2 and they should be integers? We can say that delta should equal to a natural number (0,1,2,...) to the power of 2. (pure squared)

  -> k1 = ((n-6p)+r)/2 ; k2 = ((n-6p)-r)/2

  -> n^2 - 12np + 36p^2 - 4p - r^2 = 0 -> if we want the delta to have a value, this equation should have roots as well.

  -> delta' = 144p^2 - 4(36p^2 - 4p - r^2) = 4(4p+r^2)

  -> n1 = ((12p) + delta' ^ 0.5)/2 ; n2 = ((12p) - delta' ^ 0.5)/2

  -> n1 = 6p + (4p+r^2)^0.5 ; n2 = 6p - (4p+r^2)^0.5

  Now this means the index n has been created of one of this equation. but how we cam have a value for n. If the delta' equal to another natural number squared.

  -> 4p + r^2 = m^2 -> m^2 - r^2 = 4p

  -> n1 = 6p + m ; n2 = 6p - m

  -> (m-r)(m+r) = 4p

  This is an important equation that will give us different non-prime indexes for first equation. Let see if we can talk more about this equation or no?!

  -> Suppose these equations:

  - m - r = p1
  - m + r = p2
  - p1.p2 = 4p
  - p2 >= p1

  According to the first two, the equations can be changed to the following:

  - m = (p2+p1)/2
  - r = (p2-p1)/2
  - p1.p2 = 4p

  According to the first one: (p1,p2) : (even, even) or (odd, odd)
  According to the second one: (p1,p2) : (even, even) or (odd, odd)
  According to the third one: (p1, p2) : (even, odd) or (odd, even) or (even , even)

  Then we can say (p1,p2) should be (even,even).

  Suppose p1 = 2t1 ; p2 = 2t2 ; t1.t2 = p

  -> m = t1+t2; r = t2-t1

  -> k1 = ((n-6p)+r)/2 = (n-6t1.t2+t2-t1)/2 ; k2 = ((n-6p)-r)/2= (n-6t1.t2-t2+t1)/2

  -> n1 = 6p + m = 6t1.t2 + t1+t2 ; n2 = 6p - m = 6t1.t2 -t1 - t2

  And we know that n1 is the one that we have as n.

  the point is that those k1 and k2 can be achieved by puting n1 value on those:

  -> k1 = t2 and k2 = t1 : This seems to be obvious. ( As we started by this :D )

  But one point is important:

  - k1 = (n-((6t1-1)(6t2+1)-1)/6)/2 = (6n - (6t1-1)(6t2+1) + 1) / 12

  - k2 = (n-((6t1+1)(6t2-1)-1)/6)/2 = (6n - (6t1+1)(6t2-1) - 1) / 12

  Not helpful that much :D

  What if we write the second equation to find the p roots:

  -> n^2 - 12np + 36p^2 - 4p - r^2 = 0 -> 36p^2 -4(3n+1)p + n^2 - r^2 = 0 ->

  -> delta' = 16(3n+1)^2 - 4*36(n^2-r^2) = 16 + 16 * 6n + 4\*36r^2 = 16(9r^2 + 6n + 1)

  -> p1 = (4(3n+1) + 4(9r^2 + 6n + 1)^0.5)/72 = ((3n+1)+(9r^2 + 6n + 1)^0.5)/18

  p2 = (4(3n+1) - 4(9r^2 + 6n + 1)^0.5)/72 = ((3n+1)-(9r^2 + 6n + 1)^0.5)/18

  p1 and p2 should be integers. Then delta' should be squared.

  -> 9r^2 + 6n + 1 = m ^ 2

  -> (m - 3r)(m + 3r) = (6n+1)

  This is interesting. If we give different values to m and r, we can find the n indexes which are non-prime indexes.

  What if we give different values to n and if we can find any integers for m and r, then that n is a non-prime index.

  even we can plot this equation and check where m, r and n are integeres, or giving value to n and plot it and check where m and r are integeres. ( m>=0 ; r >=0 )

  The plot will give us a hyperbola which when ( r = n , m = 3n+1 ), will give us one value, but if there is other r, then that index (n) have produced a non-prime number. ( Point: we can use floor(r), floor(m) and floor(n) )

  Can we search deeper?!

  lets try:

  - m - 3r = p1 -> m = (p2+p1)/2 -> (p1,p2): (even, even) or (odd, odd)
  - m + 3r = p2 -> r = (p2-p1)/6 -> p2 , p1 : has same residual on 6
  - p1.p2 = 6n+1 -> (p1,p2): (odd, odd)
  - p2 >= p1

  We can conclude that (p1,p2) should be odd numbers and according to their product, their should be on form of (6t1+1, 6t2+1) or (6t1-1, 6t2-1).

  -> m = (6t1 + 6t2 + 2) / 2 = 3t1 + 3t2 + 1 or m = (6t1+6t2 - 2) / 2 = 3t1 + 3t2 - 1
  -> r = (6t2-6t1)/6 = t2-t1

  This is interesting. We can give different values to t1 and t2 and find all the non-primes indexes. ( point : t2 >= t1);

<br>

#### Second one for 6n+1:

- n = 6k.kk - k - kk -> n = 6p - s -> s = 6p - n

  delta = s^2 - 4p = (6p-n)^2 - 4p = n^2 -12np + 36p^2 - 4p

  k1 = ((6p-n) + delta^0.5)/2 ; k2 = ((6p-n) - delta^0.5)/2

  Now, how we can have these k1 and k2 and they should be integers? We can say that delta should equal to a natural number (0,1,2,...) to the power of 2. (pure squared)

  -> k1 = ((6p-n)+r)/2 ; k2 = ((6p-n)-r)/2

  -> n^2 - 12np + 36p^2 - 4p - r^2 = 0 -> if we want the delta to have a value, this equation should have roots as well.

  -> delta' = 144p^2 - 4(36p^2 - 4p - r^2) = 4(4p+r^2)

  -> n1 = ((12p) + delta' ^ 0.5)/2 ; n2 = ((12p) - delta' ^ 0.5)/2

  -> n1 = 6p + (4p+r^2)^0.5 ; n2 = 6p - (4p+r^2)^0.5

  Now this means the index n has been created of one of this equation. but how we cam have a value for n. If the delta' equal to another natural number squared.

  -> 4p + r^2 = m^2 -> m^2 - r^2 = 4p

  -> n1 = 6p + m ; n2 = 6p - m

  -> (m-r)(m+r) = 4p

  This is an important equation that will give us different non-prime indexes for first equation. Let see if we can talk more about this equation or no?!

  -> Suppose these equations:

  - m - r = p1
  - m + r = p2
  - p1.p2 = 4p
  - p2 >= p1

  According to the first two, the equations can be changed to the following:

  - m = (p2+p1)/2
  - r = (p2-p1)/2
  - p1.p2 = 4p

  According to the first one: (p1,p2) : (even, even) or (odd, odd)
  According to the second one: (p1,p2) : (even, even) or (odd, odd)
  According to the third one: (p1, p2) : (even, odd) or (odd, even) or (even , even)

  Then we can say (p1,p2) should be (even,even).

  Suppose p1 = 2t1 ; p2 = 2t2 ; t1.t2 = p

  -> m = t1+t2; r = t2-t1

  -> k1 = ((6p-n)+r)/2 = (6t1.t2+t2-t1-n)/2 ; k2 = ((6p-n)-r)/2= (6t1.t2-t2+t1-n)/2

  -> n1 = 6p + m = 6t1.t2 + t1+t2 ; n2 = 6p - m = 6t1.t2 -t1 - t2

  And we know that n2 is the one that we have as n.

  the point is that those k1 and k2 can be achieved by puting n2 value on those:

  -> k1 = t1 and k2 = t2 : This seems to be obvious. ( As we started by this :D )

  But one point is important:

  - k1 = (((6t1+1)(6t2-1)-1)/6 - n )/2 = ((6t1+1)(6t2-1) - 1 - 6n) / 12

  - k2 = (((6t1-1)(6t2+1)-1)/6 - n )/2 = ((6t1-1)(6t2+1) - 1 - 6n) / 12

  Not helpful that much :D

  What if we write the second equation to find the p roots:

  -> n^2 - 12np + 36p^2 - 4p - r^2 = 0 -> 36p^2 -4(3n+1)p + n^2 - r^2 = 0 ->

  -> delta' = 16(3n+1)^2 - 4*36(n^2-r^2) = 16 + 16 * 6n + 4\*36r^2 = 16(9r^2 + 6n + 1)

  -> p1 = (4(3n+1) + 4(9r^2 + 6n + 1)^0.5)/72 = ((3n+1)+(9r^2 + 6n + 1)^0.5)/18

  p2 = (4(3n+1) - 4(9r^2 + 6n + 1)^0.5)/72 = ((3n+1)-(9r^2 + 6n + 1)^0.5)/18

  p1 and p2 should be integers. Then delta' should be squared.

  -> 9r^2 + 6n + 1 = m ^ 2

  -> (m - 3r)(m + 3r) = (6n+1)

  This is interesting. If we give different values to m and r, we can find the n indexes which are non-prime indexes.

  What if we give different values to n and if we can find any integers for m and r, then that n is a non-prime index.

  even we can plot this equation and check where m, r and n are integeres, or giving value to n and plot it and check where m and r are integeres. ( m>=0 ; r >=0 )

  The plot will give us a hyperbola which when ( r = n, m = 3n+1 ), will give us one value, but if there is other r, then that index (n) have produced a non-prime number. ( Point: we can use floor(r), floor(m) and floor(n) )

  Can we search deeper?!

  lets try:

  - m - 3r = p1 -> m = (p2+p1)/2 -> (p1,p2): (even, even) or (odd, odd)
  - m + 3r = p2 -> r = (p2-p1)/6 -> p2 , p1 : has same residual on 6
  - p1.p2 = 6n+1 -> (p1,p2): (odd, odd)
  - p2 >= p1

  We can conclude that (p1,p2) should be odd numbers and according to their product, their should be on form of (6t1+1, 6t2+1) or (6t1-1, 6t2-1).

  -> m = (6t1 + 6t2 + 2) / 2 = 3t1 + 3t2 + 1 or m = (6t1+6t2 - 2) / 2 = 3t1 + 3t2 - 1
  -> r = (6t2-6t1)/6 = t2-t1

  This is interesting. We can give different values to t1 and t2 and find all the non-primes indexes. ( point : t2 >= t1);

  Lets gid deeper:
  -> r = t2 - t1 -> t1 = t -> t2 = r + t
  -> m1 = 3t + 3(r + t) + 1 = 6t + 3r + 1 or m2 = 6t + 3r - 1

  for m1: m1^2 - 9r^2 = (6n+1) -> (6t + 3r + 1)^2 - 9r^2 = 6n+1 -> 36t^2 + 9r^2 + 1 + 36tr + 12t + 6r - 9r^2 = 6n + 1 ->
  -> 36t^2 + 12t(3r+1) + 6r = 6n -> 6t^2 + 2t(3r+1) + r - n = 0 ->
  -> delta = 4(3r+1)^2 - 24(r-n) = 36r^2 + 4 + 24r - 24r + 24n = 4( 9r^2 + 6n + 1 )

  -> t = ( -2(3r+1) + 2(9r^2 + 6n + 1)^(0.5) )/12 -> t = ( (9r^2 + 6n + 1)^(0.5) - 3r -1) / 6

  -> should: t >= 1 -> ( (9r^2 + 6n + 1)^(0.5) - 3r -1 ) >= 6 -> (9r^2 + 6n + 1)^(0.5) >= 3r + 7 -> 9r^2 + 6n + 1 >= 9r^2 + 49 + 42r -> 6n >= 48 + 42r -> 7r + 8 <= n -> 7r <= n-8

  then we can say, we can do the following steps:

      1. 7r <= n-8 : we can give r values from r=0 till this condition does not satisfied
      2. (9r^2 + 6n+1)^(0.5) : should be integer
      3. ( (9r^2 + 6n + 1)^(0.5) - 3r -1 ) should be divided by 6.

  for m2: m2^2 - 9r^2 = (6n+1) -> (6t + 3r - 1)^2 - 9r^2 = 6n+1 -> 36t^2 + 9r^2 + 1 + 36tr - 12t - 6r - 9r^2 = 6n + 1 ->
  -> 36t^2 - 12t(-3r+1) - 6r = 6n -> 6t^2 - 2t(-3r+1) - r - n = 0 ->
  -> delta = 4(-3r+1)^2 + 24(r+n) = 36r^2 + 4 - 24r + 24r + 24n = 4( 9r^2 + 6n + 1 )

  -> t = ( 2(-3r+1) + 2(9r^2 + 6n + 1)^(0.5) )/12 -> t = ( (9r^2 + 6n + 1)^(0.5) - 3r + 1) / 6

  -> should: t >= 1 -> ( (9r^2 + 6n + 1)^(0.5) - 3r + 1 ) >= 6 -> (9r^2 + 6n + 1)^(0.5) >= 3r + 5 -> 9r^2 + 6n + 1 >= 9r^2 + 25 + 30r -> 6n >= 24 + 30r -> 30r + 24 <= 6n -> 5r <= n - 4

  then we can say, we can do the following steps:

      1. 5r <= n - 4 : we can give r values from r=0 till this condition does not satisfied
      2. (9r^2 + 6n + 1)^(0.5) : should be integer
      3. ( (9r^2 + 6n + 1)^(0.5) - 3r + 1 ) should be divided by 6.

<br>

#### Third and forth one for 6n+1:

- n = 6k.kk + k - kk -> n = 6p + (delta) ^ 0.5 -> delta^0.5 = n - 6p

  -> delta = s^2 - 4p -> s^2 = (n-6p)^2 + 4p -> s = ( n^2 -12np + 36p^2 + 4p ) ^ 0.5 or s = - ( n^2 -12np + 36p^2 + 4p ) ^ 0.5.

  But, s >= 2 -> s = ( n^2 -12np + 36p^2 + 4p ) ^ 0.5

  k1 = ((n-6p) + s)/2 ; k2 = ((6p-n) + s)/2

  Now, how we can have these k1 and k2 and they should be integers? We can say that delta should equal to a natural number (0,1,2,...) to the power of 2. (pure squared)

  -> k1 = ((n-6p)+r)/2 ; k2 = ((6p-n)-r)/2 (we just change s with r, to be look like the other top conditions.)

  -> n^2 - 12np + 36p^2 + 4p - r^2 = 0 -> if we want the delta to have a value, this equation should have roots as well.

  -> delta' = 144p^2 - 4(36p^2 + 4p - r^2) = 4(-4p+r^2)

  -> n1 = ((12p) + delta' ^ 0.5)/2 ; n2 = ((12p) - delta' ^ 0.5)/2

  -> n1 = 6p + (-4p+r^2)^0.5 ; n2 = 6p - (-4p+r^2)^0.5

  Now this means the index n has been created of one of this equation. but how we cam have a value for n. If the delta' equal to another natural number squared.

  -> -4p + r^2 = m^2 -> r^2 - m^2 = 4p

  -> n1 = 6p + m ; n2 = 6p - m

  -> (r-m)(r+m) = 4p

  This is an important equation that will give us different non-prime indexes for first equation. Let see if we can talk more about this equation or no?!

  -> Suppose these equations:

  - r - m = p1
  - r + m = p2
  - p1.p2 = 4p
  - p2 >= p1

  According to the first two, the equations can be changed to the following:

  - m = (p2-p1)/2
  - r = (p2+p1)/2
  - p1.p2 = 4p

  According to the first one: (p1,p2) : (even, even) or (odd, odd)
  According to the second one: (p1,p2) : (even, even) or (odd, odd)
  According to the third one: (p1, p2) : (even, odd) or (odd, even) or (even , even)

  Then we can say (p1,p2) should be (even,even).

  Suppose p1 = 2t1 ; p2 = 2t2 ; t1.t2 = p

  -> r = t1+t2; m = t2-t1

  -> k1 = ((n-6p)+r)/2 = (n-6t1.t2+t2+t1)/2 ; k2 = ((6p-n)-r)/2= (6t1.t2-t2-t1-n)/2

  -> n1 = 6p + m = 6t1.t2 + t2 - t1 ; n2 = 6p - m = 6t1.t2 - t2 + t1

  And we know that n2 is the one that we have as n for third trend and n2 for forth trend.

  the point is that those k1 and k2 can be achieved by puting n2 value on those:

  -> k1 = t2 or t1 and k2 = t1 or t2 : This seems to be obvious. ( As we started by this :D )

  But one point is important:

  - k1 = (n-((6t1-1)(6t2-1)-1)/6 )/2 = (6n - (6t1+1)(6t2-1) - 1) / 12

  - k2 = (((6t1-1)(6t2-1)-1)/6 - n )/2 = ((6t1-1)(6t2-1) - 1 - 6n) / 12

  Not helpful that much :D

  What if we write the second equation to find the p roots:

  -> n^2 - 12np + 36p^2 + 4p - r^2 = 0 -> 36p^2 -4(3n-1)p + n^2 - r^2 = 0 ->

  -> delta' = 16(3n-1)^2 - 4*36(n^2-r^2) = 16 - 16 * 6n + 4\*36r^2 = 16(9r^2 - 6n + 1)

  -> p1 = (4(3n-1) + 4(9r^2 - 6n + 1)^0.5)/72 = ((3n-1)+(9r^2 - 6n + 1)^0.5)/18

  p2 = (4(3n-1) - 4(9r^2 - 6n + 1)^0.5)/72 = ((3n-1)-(9r^2 - 6n + 1)^0.5)/18

  p1 and p2 should be integers. Then delta' should be squared.

  -> 9r^2 - 6n + 1 = m ^ 2

  -> (3r - m)(3r + m) = (6n - 1)

  This is interesting. If we give different values to m and r, we can find the n indexes which are non-prime indexes.

  What if we give different values to n and if we can find any integers for m and r, then that n is a non-prime index.

  even we can plot this equation and check where m, r and n are integeres, or giving value to n and plot it and check where m and r are integeres. ( m>=0 ; r >=0 )

  The plot will give us a hyperbola which when ( r = n , m = 3n-1 ), will give us one value, but if there is other r, then that index (n) have produced a non-prime number. ( Point: we can use floor(r), floor(m) and floor(n) )

  Can we search deeper?!

  lets try:

  - 3r - m = p1 -> m = (p2-p1)/2 -> (p1,p2): (even, even) or (odd, odd)
  - 3r + m = p2 -> r = (p2+p1)/6 -> p2 , p1 : ther sum of p1 and p2 to 6 should be 6 or 0.
  - p1.p2 = 6n - 1 -> (p1,p2): (odd, odd)
  - p2 >= p1

  We can conclude that (p1,p2) should be odd numbers and according to their product, their should be on form of (6t1-1, 6t2+1) or (6t1+1, 6t2-1).

  -> m = (6t2 + 1 - 6t1 + 1) / 2 = 3t2 - 3t1 + 1 or m = (6t2 - 1 - 6t1 - 1) / 2 = 3t2 - 3t1 - 1
  -> r = (6t1+6t2)/6 = t2+t1

  This is interesting. We can give different values to t1 and t2 and find all the non-primes indexes. ( point : t2 >= t1);

  Lets gid deeper:
  -> r = t2 + t1 -> t1 = t -> t2 = r - t
  -> m1 = 3(r-t) - 3t + 1 = 3r - 6t + 1 or m2 = 3r - 6t - 1

  for m1: 9r^2 - m^2 = (6n-1) -> 9r^2 - (3r - 6t + 1)^2 = 6n-1 -> 9r^2 - (9r^2 + 36t^2 + 1 - 36rt + 6r - 12t) = 6n-1 ->
  -> -36t^2 -1 + 36rt - 6r + 12t = 6n - 1 -> 36t^2 - 36rt + 6r - 12t + 6n = 0 -> 6t^2 - 6rt + r - 2t + n = 0 ->
  -> 6t^2 - 2t(3r + 1) + r + n = 0
  -> delta = 4(3r+1)^2 - 24(r + n) = 36r^2 + 4 + 24r - 24r - 24n = 4( 9r^2 - 6n + 1 )

  -> t = ( 2(3r+1) + 2(9r^2 - 6n + 1)^(0.5) )/12 -> t = ( (9r^2 - 6n + 1)^(0.5) + 3r + 1) / 6

  -> should: t2 >= 1 -> r = t + t2 >= 1 + t -> r >= 1 + t -> r-1 >= ( (9r^2 - 6n + 1)^(0.5) + 3r + 1) / 6 -> 3r - 7 >= (9r^2 - 6n + 1)^(0.5) -> 9r^2 + 49 - 42r >= 9r^2 - 6n + 1 -> 42r <= 6n + 48 -> 7r <= n + 8

  then we can say, we can do the following steps:

      1. 7r <= n + 8
      2. (9r^2 - 6n + 1)^(0.5) : should be integer
      3. ( (9r^2 - 6n + 1)^(0.5) + 3r + 1) should be divided by 6.

  for m2: 9r^2 - m^2 = (6n-1) -> 9r^2 - (3r - 6t - 1)^2 = 6n-1 -> 9r^2 - (9r^2 + 36t^2 + 1 - 36rt - 6r + 12t) = 6n-1 ->
  -> -36t^2 -1 + 36rt + 6r - 12t = 6n - 1 -> 36t^2 - 36rt - 6r + 12t + 6n = 0 -> 6t^2 - 6rt - r + 2t + n = 0 ->
  -> 6t^2 - 2t(3r - 1) - r + n = 0
  -> delta = 4(3r-1)^2 - 24(-r + n) = 36r^2 + 4 - 24r + 24r - 24n = 4( 9r^2 - 6n + 1 )

  -> t = ( 2(3r-1) + 2(9r^2 - 6n + 1)^(0.5) )/12 -> t = ( (9r^2 - 6n + 1)^(0.5) + 3r - 1) / 6

  -> should: t2 >= 1 -> r = t + t2 >= 1 + t -> r >= 1 + t -> r-1 >= ( (9r^2 - 6n + 1)^(0.5) + 3r - 1) / 6 -> 3r - 5 >= (9r^2 - 6n + 1)^(0.5) -> 9r^2 + 25 - 30r >= 9r^2 - 6n + 1 -> 30r <= 6n + 24 -> 5r <= n + 4

  then we can say, we can do the following steps:

      1. 5r <= n + 4
      2. (9r^2 - 6n + 1)^(0.5) : should be integer
      3. ( (9r^2 - 6n + 1)^(0.5) + 3r - 1) should be divided by 6.

  <br>

<hr>

<br>

### How we can code this when we have big integeres

- Javascript seems that can not deal with big integres. (even it can not deal with small number. Do not believe me? try 0.1 + 0.2 and see the answer.)

  For this, what we can do is to make all the math operations with numbers as string. example:

  - 23 + 38 = 61
  - Another way is: 23 as string -> {0: 3, 1: 2} & 38 as string -> {0:8, 1: 3} ( we call each key of this object as slot)

    Now we can add same keys of objects together and if the answer is greater or equal to 10, then find the ( sum of each slot % 10) and the slot with same key of the sum can be this number. Then find the (sum of each slot // 2) and add it to the next slot sum result.

    sum slot of 23 and 38 -> { 0: 11 , 1: 5 } -> { 0: 1, 1: 6 } -> sum = 61

    We have defined different methods on [mathOperation js file](./mathOperation.js)

- For python, we do not have this issue and we can use it easily.

- Another point is: What if we can store the prime numbers in some text files. Then if any numbers wanted to be checked, it can be checked at first if that is on any of the text file or no. And even if we want to find the divisions of a number, we can divide that to the stored numbers and find the divisions.

<br>

#### primeTextWay.js

- createPrimeTextFiles : This method will create prime folders till a number. The point is if a num is big, this will not work properly (it depends on CPU and memory of your computer on how much data can be saved on an object). And needs to be mentioned that this is slow method.

- primeInRangeObjTextWay: This method will create prime folders between two numbers. This method is a fast method, but it will create all the files from first one (2, 3, ...)

- checkIfPrime: This method will check if an existing file contain a number or not. This will help us to check if a number is prime or no, just by checking if the data of the files are contain that number or no.

- division: This method will check if a number can be divided by any prime numbers less that sqrt(number). If yes, then it will return that division, otherwise it will return the number itself.

- allDivisions: Using division method, this will find all the division of a number

- primes: If there are any prime text files and if the number is less than greatest number that exist on prime files, this method will copy all the prime numbers that are less than the number (much much quicker). But if the number is greater than the greates prime on prime files, then it will copy all the files and then will find the rest of the primes on that range (existed greatest prime , the number). The point is that javascript can not work with a very big numbers. We can other use the mathOperation.js or we can use python.

- divisionFromText: this will find division of the number from prime text files. The point is this will check if a number is dividable by any prime number less than sqrt(number). If yes, then it will return it, otherwise will return the number itself.

- isPrimeFromText: if the divisionFromText return the number itself, then the number is a prime number.

- allPrimesFromText : this method will find the primes between two numbers. The idea is to check if the number is exist in any prime files or no. If no, then it will use isPrimeFromText method to check if it is a prime or no. This is a little bit slower.

- allPrimes: this method will find all the primes till a number. The interesting thing about this method is, if it could not find the primes, it will produce the folders. It means if we want to build primes till number n and we do not have the primes even till sqrt(n), it will build all those folders and then it will create a folder for number n. (this is like robotic, do not do anythig, just tell me till what number you want the primes :D )

- allPrimesSecondWay: this method will copy all the files for a number and if a number is bigger than teh greatest primes in files, it will use primeInRangeObjTextWay to build the other files. ( super quick )
