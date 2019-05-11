self.importScripts('./bignumber.min.js');
self.addEventListener('message', (e) => {
  const result = e.data.map((item) => {
    const {
      posy, y,
      posx, x,
      ITER, useNative
    } = item;
    let i = 0;
    if (useNative) {
      let zx = 0;
      let zy = 0;
      const bx = x;
      const by = y;
      for (; i < ITER; i++) {
        let _zx = zx * zx - zy * zy + bx;
        let _zy = 2 * zx * zy + by;
        zx = _zx;
        zy = _zy;
        if (zx * zx + zy * zy > 4) {
          break;
        }
      }
    } else {
      BigNumber.config({ POW_PRECISION: 50 });
      let zx = new BigNumber(0);
      let zy = new BigNumber(0);
      const bx = new BigNumber(x);
      const by = new BigNumber(y);
      for (; i < ITER; i++) {
        let _zx = zx.pow(2).minus( zy.pow(2) ).plus(bx);
        let _zy = zx.multipliedBy(zy).multipliedBy(2).plus(by);
        zx = _zx;
        zy = _zy;
        if (zx.pow(2).plus( zy.pow(2) ).isGreaterThan(4)) {
          break;
        }
      }
    }
    return {
      posy,
      posx,
      iter: i,
    };
  });
  self.postMessage(result);
});
