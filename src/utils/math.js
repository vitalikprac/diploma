export const remap = (n, start1, stop1, start2, stop2) =>
  ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
/*
p5.prototype.map = function(n, start1, stop1, start2, stop2, withinBounds) {
    p5._validateParameters('map', arguments);
    const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    if (!withinBounds) {
        return newval;
    }
    if (start2 < stop2) {
        return this.constrain(newval, start2, stop2);
    } else {
        return this.constrain(newval, stop2, start2);
    }
}; */
