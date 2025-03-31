const squares = document.getElementsByClassName("square");
const playerInfo = document.getElementsByClassName("player")[0];
const coordinates = document.getElementsByClassName("coordinates");
const circlePiece = document.getElementsByClassName("circle-piece");
const crossPiece = document.getElementsByClassName("cross-piece");
const circleBlur = document.getElementById("circle-blur");
const crossBlur = document.getElementById("cross-blur");
const toggleStart = document.getElementById("start-game");
const startLabel = document.getElementById("start-text");
const system_default = document.getElementById("default");
const body = document.querySelector("body");
const color_scheme = document.getElementsByName("color-scheme");
let field = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

toggleStart.addEventListener("input", () => {
  if (toggleStart.checked) {
    class Play {
      constructor() {
        for (let index = 0; index < 9; index++) {
          circlePiece[index].style.display = "none";
          crossPiece[index].style.display = "none";
        }
        this.player1 = {
          id: 1,
        };
        this.player2 = {
          id: 2,
        };
        this.player = this.player1.id;
        this.emptySpace = 9;
        this.switchPlayers = function () {
          if (this.player == this.player1.id) {
            this.player = this.player2.id;
            crossBlur.style.display = "none";
            circleBlur.style.display = "inline";
          } else {
            this.player = this.player1.id;
            crossBlur.style.display = "inline";
            circleBlur.style.display = "none";
          }
        };

        this.createWinningPaterns = function () {
          const rows = field.length;
          const cols = field[0].length;

          this.winningPatterns = [];

          // Rows
          for (let i = 0; i < rows; i++) {
            for (let j = 0; j <= cols - 3; j++) {
              this.winningPatterns.push([
                [i, j],
                [i, j + 1],
                [i, j + 2],
              ]);
            }
          }

          // Columns
          for (let i = 0; i <= rows - 3; i++) {
            for (let j = 0; j < cols; j++) {
              this.winningPatterns.push([
                [i, j],
                [i + 1, j],
                [i + 2, j],
              ]);
            }
          }

          // Diagonals
          for (let i = 0; i <= rows - 3; i++) {
            for (let j = 0; j <= cols - 3; j++) {
              this.winningPatterns.push([
                [i, j],
                [i + 1, j + 1],
                [i + 2, j + 2],
              ]);

              this.winningPatterns.push([
                [i, j + 2],
                [i + 1, j + 1],
                [i + 2, j],
              ]);
            }
          }
        };
        this.createWinningPaterns();

        this.checkWin = function () {
          for (let i = 0; i < this.winningPatterns.length; i++) {
            const [a, b, c] = this.winningPatterns[i];
            if (
              field[a[0]][a[1]] !== 0 &&
              field[a[0]][a[1]] === field[b[0]][b[1]] &&
              field[a[0]][a[1]] === field[c[0]][c[1]]
            ) {
              return true;
            }
          }
          return false;
        };
        this.clearField = function () {
          this.emptySpace = 9;
          for (let i = 0; i < field.length; i++) {
            for (let j = 0; j < field.length; j++) {
              field[i][j] = 0;
            }
          }
        };

        playerInfo.textContent = "Player " + this.player + " turn";
        for (let i = 0; i < squares.length; i++) {
          squares[i].addEventListener("click", () => {
            if (toggleStart.checked) {
              let coordinate = coordinates[i].textContent;
              this.x = parseInt(coordinate.charAt(1));
              this.y = parseInt(coordinate.charAt(3));
              if (field[this.x][this.y] == 0) {
                field[this.x][this.y] = this.player;
                this.emptySpace -= 1;
                if (this.player == 1) {
                  crossPiece[i].style.display = "inline";
                } else {
                  circlePiece[i].style.display = "inline";
                }
                if (this.checkWin()) {
                  this.clearField();
                  playerInfo.textContent = "Player " + this.player + " wins!";
                  this.switchPlayers();

                  toggleStart.checked = false;
                } else if (this.emptySpace == 0) {
                  this.clearField();
                  playerInfo.textContent = "Draw!";
                  toggleStart.checked = false;
                } else {
                  this.switchPlayers();
                  playerInfo.textContent = "Player " + this.player + " turn";
                }
              }
            }
          });
        }
      }
    }
    const game = new Play();
  } else {
    location.reload();
  }
});

class ColorScheme {
  constructor() {
    window.onload = function () {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
      }
    };

    for (let index = 0; index < 3; index++) {
      color_scheme[index].addEventListener("change", function () {
        if (color_scheme[0].checked) {
          document.documentElement.setAttribute("data-theme", "light");
        } else if (color_scheme[1].checked) {
          document.documentElement.setAttribute("data-theme", "dark");
        } else {
          if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.documentElement.setAttribute("data-theme", "dark");
          } else {
            document.documentElement.setAttribute("data-theme", "light");
          }
        }
      });
    }
  }
}
const scheme = new ColorScheme();
