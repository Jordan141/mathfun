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
    rot.data[axis1][axis1] = cos(theta)
    rot.data[axis1][axis2] = -sin(theta)
    rot.data[axis2][axis1] = sin(theta)
    rot.data[axis2][axis2] = cos(theta)
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
        return createVector(this.data[0][0], this.data[1][0], this.data[2][0]);
    else {
        return createVector(this.data[0][0], this.data[1][0]);
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

export default Matrix