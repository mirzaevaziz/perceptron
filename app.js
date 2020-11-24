var app = new Vue({
  el: "#app",
  data: {
    Result: "",
    patterns: [],
    isEven: 0,
    Tetta: 0.001,
    input: [
      [0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 0, 0],
    ],
    weight: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    newInput: [
      [0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 0, 0],
    ],
  },
  methods: {
    clicked: function (input, row, cell) {
      if (input[row][cell] === 1) input[row][cell] = 0;
      else input[row][cell] = 1;
      this.$forceUpdate();
    },
    clearInput: function (input) {
      for (let index = 0; index < 8; index++) {
        for (let cellindex = 0; cellindex < 8; cellindex++) {
          input[index][cellindex] = 0;
        }
      }
      this.$forceUpdate();
    },
    addInput: function () {
      var newArray = [];
      for (var i = 0; i < this.input.length; i++)
        newArray[i] = this.input[i].slice();
      this.patterns.push([newArray, Number(this.isEven)]);
      console.log(this.patterns);
    },
    clearWeight: function () {
      for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
        for (let colIndex = 0; colIndex < 8; colIndex++) {
          this.weight[rowIndex][colIndex] = 0;
        }
      }
      this.$forceUpdate();
    },
    calculateWeight: function () {
      console.log(this.weight);
      console.log(this.patterns);
      let isWeightChanged = 1;

      while (isWeightChanged == 1) {
        //   for (let index = 0; index < 3; index++)
        isWeightChanged = 0;

        for (let objIndex = 0; objIndex < this.patterns.length; objIndex++) {
          console.log("Object #" + objIndex + "================");
          let obj = this.patterns[objIndex][0];
          let objResult = this.patterns[objIndex][1];

          while (true) {
            sum = this.calcSum(obj);
            fx = this.calcFx(sum);
            console.log(sum, fx);

            if (objResult != fx) {
              isWeightChanged = 1;
              if (objResult === 0) {
                console.log("Weight minused");
                for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
                  for (let colIndex = 0; colIndex < 8; colIndex++) {
                    this.weight[rowIndex][colIndex] =
                      this.weight[rowIndex][colIndex] - obj[rowIndex][colIndex];
                  }
                }
              } else {
                console.log("Weight plused");
                for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
                  for (let colIndex = 0; colIndex < 8; colIndex++) {
                    this.weight[rowIndex][colIndex] =
                      this.weight[rowIndex][colIndex] + obj[rowIndex][colIndex];
                  }
                }
              }
            } else {
              break;
            }
          }
        }
      }

      this.$forceUpdate();
    },

    calcSum: function (x) {
      result = 0;
      for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
        for (let colIndex = 0; colIndex < 8; colIndex++) {
          result +=
            this.weight[rowIndex][colIndex] * x[rowIndex][colIndex] -
            Number(this.Tetta);
        }
      }
      return result;
    },

    calcFx: function (sum) {
      if (sum > 0) return 1;
      return 0;
    },

    calcNewInput: function () {
      this.Result = "Xisoblanmoqda...";
      let sum = this.calcSum(this.newInput);
      let fx = this.calcFx(sum);

      if (fx == 0) {
        this.Result = "Toq";
      } else {
        this.Result = "Juft";
      }
    },
  },
});
