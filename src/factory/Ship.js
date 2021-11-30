class Ship {
  constructor(id, length, orientation = 'h', coords = { x: null, y: null }) {
    this.id = id;
    this.length = length;
    this.positions = Array.from({ length: this.length }, () => 0);
    this.coords = coords;
    this.orientation = orientation;
  }

  hit(pos) {
    this.positions[pos] = 1;
  }

  isSunk() {
    for (let pos of this.positions) {
      if (pos === 0) return false;
    }
    return true;
  }
}

export default Ship;
