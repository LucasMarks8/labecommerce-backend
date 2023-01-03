const number = Number(process.argv[2]);
const parOuImpar = process.argv[3];

console.log(`Você escolher o número ${number}`);

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const numeroAleatorioEntreZeroeDez = getRndInteger(0, 10);
console.log(`O computador escolher o número ${numeroAleatorioEntreZeroeDez}`);


let total = number + numeroAleatorioEntreZeroeDez;

if (total % 2 === 0 && parOuImpar === "par") {
  console.log(
    `Você escolheu ${parOuImpar} e o resulado foi ${total}. Você ganhou!`
  );
} else if (total % 2 === 1 && parOuImpar !== "par") {
  console.log(
    `Você escolheu ${parOuImpar} e o resultado foi ${total}. VocÊ ganhou!`
  );
} else if (total % 2 === 0 && parOuImpar !== "par") {
  console.log(
    `Você escolheu ${parOuImpar} e o resultado foi ${total}. O computador ganhou!`
  );
} else if (total % 2 === 1 && parOuImpar === "par") {
  console.log(
    `Você escolheu ${parOuImpar} e o resultado foi ${total}. O computador ganhou!`
  );
} else {
    console.log("Algo deu errado!");
}
