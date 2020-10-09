class Matrix {
    constructor(rows, cols) {
        this.rows = rows
        this.cols = cols
        this.data = Array(this.rows).fill().map(() => Array(this.cols).fill(0))
    }

    copy() {
        let m = new Matrix(this.rows, this.cols)
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                m.data[i][j] = this.data[i][j]
            }
        }
    }
    static fromArray(arr) {
        return new Matrix(arr.length, 1).map((e, i) => arr[i])
    }

    static substract(a, b) {
        if(a.rows !== b.rows || a.cols !== b.cols) throw new Error('Columns and Rows of A must match Columns and Rows of B')
        return new Matrix(a.rows, a.cols).map((_, i, j) => a.data[i][j] - b.data[i][j])
    }

    toArray() {
        let arr = []
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                arr.push(this.data[i][j])
            }
        }
    }

    add(n) {
        if(! n instanceof Matrix) return this.map(e => e + n)
        if(this.rows !== n.rows || this.cols !== n.cols) throw new Error('Columns and Rows of A must match Columns and Rows of B.')

        return this.map((element, index, innerIndex) => element + n.data[index][innerIndex])
    }

    static transpose(matrix) {
        if(!matrix instanceof Matrix) throw new Error('Only a matrix can be transposed')
        return new Matrix(matrix.cols, matrix.rows)
            .map((_, index, innerIndex) => matrix.data[innerIndex][index])
    }

    static multiply(a, b) {
        if(a.cols !== b.rows) throw new Error('Columns and Rows of A must match Columns and Rows of B.')

        return new Matrix(a.rows, b.cols)
            .map(( _ , index, innerIndex) => {
                //Dot product of values in column
                let sum = 0
                for(let i = 0; i < a.cols; i++) {
                    sum += a.data[index][i] * b.data[i][innerIndex]
                }
                return sum
            })
    }

    multiply(n) {
        if(!n instanceof Matrix) return this.map(e => e * n)
        return this.map((element, index, innerIndex) => element * n.data[index][innerIndex])
    }

    map(func) {
        //Apply a function to every element of the matrix
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                let val = this.data[i][j]
                this.data[i][j] = func(val, i, j)
            }
        }
        return this
    }

    static map(matrix, func) {
        return new Matrix(matrix.rows, matrix.cols)
            .map(( _ , i, j) => func(matrix.data[i][j], i, j));
    }

    static identity(a) {//Identity matrices are always full of 1/0s so a is just dimension size
        return new Matrix(a, a).map(( _ , i, j) => i == j ? 1 : 0)
    }

    static projection(n, k = 1) {//n,k ===???
        return new Matrix(n - 1, n).map((_, i, j) => ((i == j) ? 1 : 0) * k)
    }

    static rotation(axis1, axis2, dimension, theta) {
        let rotationMatrix = Matrix.identity(dimension)
        rotatedMatrix.data[axis1][axis1] = Math.cos(theta)
        rotatedMatrix.data[axis1][axis2] = -Math.sin(theta)
        rotatedMatrix.data[axis2][axis1] = Math.sin(theta)
        rotatedMatrix.data[axis2][axis2] = Math.cos(theta)
        return rotationMatrix
    }

    print() {
        console.table(this.data)
        return this
    }

    serialize() {
        return JSON.stringify(this)
    }

    static deserialize(data) {
        if(typeof data == "string") {
            data = JSON.parse(data)
        }

        let matrix = new Matrix(data.rows, data.cols)
        matrix.data = data.data
        return matrix
    }
}

let m = new Matrix(3, 3)
m.data[0] = [1,2,3]
m.data[1] = [4,5,6]
m.data[2] = [7,8,9]
m.print()
let tran = Matrix.transpose(m)
tran.print()
let transposedMatrix = Matrix.multiply(m, tran)
transposedMatrix.print()

//export default Matrix