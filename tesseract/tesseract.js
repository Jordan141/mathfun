let points = []
let projected = []

const X = 0,
Y = 1,
Z = 2,
W = 3,
scl = 75

let speed, theta = 0
let permutations = []
let order

class Matrix {
    constructor(rows, cols) {
        this.rows = rows
        this.cols = cols
        this.data = Array(this.rows).fill()
            .map(() => Array(this.cols).fill(0))
    }

    copy() {
        let m = new Matrix(this.rows, this.cols)
        for(let i = 0; i< this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                m.data[i][j] = this.data[i][j]
            }
        }
        return m
    }

    static fromArray(arr) {
        return new Matrix(arr.length, 1).map((e, i) => arr[i])
    }

    static subtract(a, b) {
        if(a.rows !== b.rows || a.cols !== b.cols) {
            console.log('Columns and Rows of A must match Columns and Rows of B')
            return
        }

        return new Matrix(a.rows, a.cols).map((_, i, j) => a.data[i][j] - b.data[i][j])
    }

    toArray() {
        let arr = []
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                arr.push(this.data[i][j])
            }
        }
        return arr
    }

    add(n) {
        if(n instanceof Matrix) {
            if (this.rows !== n.rows || this.cols !== n.cols) {
                console.log('Columns and Rows of A must match Columns and Rows of B.')
                return;
            }
            return this.map((e, i, j) => e + n.data[i][j])
        }

        return this.map(e => e + n)
    }
    static transpose(matrix) {
        return new Matrix(matrix.cols, matrix.rows)
        .map((_, i, j) => matrix.data[j][i])
    }

    static multiply(a, b) {
    // Matrix product
    if (a.cols !== b.rows) {
        console.log('Columns of A must match rows of B.');
        return;
    }

    return new Matrix(a.rows, b.cols)
        .map((e, i, j) => {
        // Dot product of values in col
        let sum = 0
        for (let k = 0; k < a.cols; k++) {
            sum += a.data[i][k] * b.data[k][j]
        }
        return sum
        })
    }

    multiply(n) {
    if (n instanceof Matrix) {
        if (this.rows !== n.rows || this.cols !== n.cols) {
        console.log('Columns and Rows of A must match Columns and Rows of B.')
        return
        }

        // hadamard product
        return this.map((e, i, j) => e * n.data[i][j]);
    } else {
        // Scalar product
        return this.map(e => e * n);
    }
    }

    map(func) {
    // Apply a function to every element of matrix
    for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
        let val = this.data[i][j];
        this.data[i][j] = func(val, i, j);
        }
    }
    return this;
    }

    static map(matrix, func) {
    // Apply a function to every element of matrix
    return new Matrix(matrix.rows, matrix.cols)
        .map((e, i, j) => func(matrix.data[i][j], i, j));
    }

    static identity(a) {
    return new Matrix(a, a).map(((e, i, j) => boolToInt(i == j)));
    }

    static perspective(n, d, p)
    {
    return Matrix.projection(n, 1/(d-p))
    }
    
    static projection(n, k=1) {
    return new Matrix(n - 1, n).map((e, i, j) => (boolToInt(i == j)*k));
    }

    static rotation(axis1, axis2, dimension, theta) {
    let rot = Matrix.identity(dimension)
    rot.data[axis1][axis1] = Math.cos(theta)
    rot.data[axis1][axis2] = -Math.sin(theta)
    rot.data[axis2][axis1] = Math.sin(theta)
    rot.data[axis2][axis2] = Math.cos(theta)
    return rot
    }

    static fromVec(vec) {
    if (vec.w) {
        let temp = new Matrix(4, 1)
        temp.data = [
        [vec.x],
        [vec.y],
        [vec.z],
        [vec.w]
        ];
        return temp
    }
    let temp = new Matrix(3, 1)
    temp.data = [
        [vec.x],
        [vec.y],
        [vec.z]
    ];

    return temp
    }

    get toVec() {
    if(this.rows == 4)
    {
        return create4dVector(this.data[0][0], this.data[1][0], this.data[2][0], this.data[3][0]);
    }
    else if (this.rows == 3)
        return new Vector(this.data[0][0], this.data[1][0], this.data[2][0]);
    else {
        return new Vector(this.data[0][0], this.data[1][0]);
    }
    }

    print() {
    console.table(this.data);
    return this;
    }

    serialize() {
    return JSON.stringify(this);
    }

    static deserialize(data) {
    if (typeof data == 'string') {
        data = JSON.parse(data);
    }
    let matrix = new Matrix(data.rows, data.cols);
    matrix.data = data.data;
    return matrix;
    }
}
    
function boolToInt(f) {
    return f ? 1 : 0
}

function setup() {
    points[0] = create4dVector(-1, -1, -1, 1);
    points[1] = create4dVector(1, -1, -1, 1);
    points[2] = create4dVector(1, 1, -1, 1);
    points[3] = create4dVector(-1, 1, -1, 1);
    points[4] = create4dVector(-1, -1, 1, 1);
    points[5] = create4dVector(1, -1, 1, 1);
    points[6] = create4dVector(1, 1, 1, 1);
    points[7] = create4dVector(-1, 1, 1, 1);
    points[8] = create4dVector(-1, -1, -1, -1);
    points[9] = create4dVector(1, -1, -1, -1);
    points[10] = create4dVector(1, 1, -1, -1);
    points[11] = create4dVector(-1, 1, -1, -1);
    points[12] = create4dVector(-1, -1, 1, -1);
    points[13] = create4dVector(1, -1, 1, -1);
    points[14] = create4dVector(1, 1, 1, -1);
    points[15] = create4dVector(-1, 1, 1, -1)

    //speed = radians(1)

    permutations = [
        [X, Y],
        [X, Z],
        [X, W],
        [Y, Z],
        [Y, W],
        [Z, W]
    ]

    order = [1,4]
}

function create4dVector(x, y, z, w) {
    let temp = new Vector(x, y, z)
    temp.w = w
    return temp
}

function prepare() {
    setup()
    for(let i = 0; i < points.length; i++) {
        let p = points[i]
        let pt = Matrix.fromVec(p)

        for(let j = 0; j < order.length; j++) {
            pt = Matrix.multiply(Matrix.rotation(permutations[order[j]][0], permutations[order[j]][1], 4, theta), pt)
        }

        pt = Matrix.multiply(Matrix.perspective(4, 2, pt.toVec.w), pt)
        pt = pt.toVec.mult(scl)
        projected[i] = (pt)
    }
    console.log(projected)
}


function Vector(x, y, z) {
    return {
        x,
        y,
        z
    }
}

console.log(prepare())

