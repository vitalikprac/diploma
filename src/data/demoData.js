export default `A,v1,30
A,v2,95
A,v3,22
A,v4,14
A,v5,59
A,v6,52
A,v7,88
A,v8,20
A,v9,99
A,v10,66
B,v1,37
B,v2,50
B,v3,81
B,v4,79
B,v5,84
B,v6,91
B,v7,82
B,v8,89
B,v9,6
B,v10,67
C,v1,96
C,v2,13
C,v3,98
C,v4,10
C,v5,86
C,v6,23
C,v7,74
C,v8,47
C,v9,73
C,v10,40
D,v1,75
D,v2,18
D,v3,92
D,v4,43
D,v5,16
D,v6,27
D,v7,76
D,v8,24
D,v9,1
D,v10,87
E,v1,44
E,v2,29
E,v3,58
E,v4,55
E,v5,65
E,v6,56
E,v7,9
E,v8,78
E,v9,49
E,v10,36
F,v1,35
F,v2,80
F,v3,8
F,v4,46
F,v5,48
F,v6,100
F,v7,17
F,v8,41
F,v9,33
F,v10,11
G,v1,77
G,v2,62
G,v3,94
G,v4,15
G,v5,69
G,v6,63
G,v7,61
G,v8,54
G,v9,38
G,v10,93
H,v1,39
H,v2,26
H,v3,90
H,v4,83
H,v5,31
H,v6,2
H,v7,51
H,v8,28
H,v9,42
H,v10,7
I,v1,5
I,v2,60
I,v3,21
I,v4,25
I,v5,3
I,v6,70
I,v7,34
I,v8,68
I,v9,57
I,v10,32
J,v1,19
J,v2,85
J,v3,53
J,v4,45
J,v5,71
J,v6,64
J,v7,4
J,v8,12
J,v9,97
J,v10,72`
  .split('\n')
  .map((x) => {
    const [group, variable, value] = x.split(',');
    return { group, variable, value };
  });
