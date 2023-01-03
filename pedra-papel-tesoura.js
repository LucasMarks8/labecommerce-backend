const handType = process.argv[2];
const pedra = 1;
const papel = 2;
const tesoura = 3;

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const numeroAleatorioEntreZeroeTres = getRndInteger(0, 3);
console.log(`O computador escolher o número ${numeroAleatorioEntreZeroeTres}`);

if (handType === "pedra" && numeroAleatorioEntreZeroeTres === 1) {
  console.log(
    `Você escolher ${handType} e o computador escolher pedra. Empatou!!`
  );
} else if (handType === "pedra" && numeroAleatorioEntreZeroeTres === 2) {
  console.log(
    `Você escolher ${handType} e o computador escolher papel. Computrador ganhou!!`
  );
} else if (handType === "pedra" && numeroAleatorioEntreZeroeTres === 3) {
  console.log(
    `Você escolher ${handType} e o computador escolher tesoura. Você ganhou!!`
  );
} else if (handType === "papel" && numeroAleatorioEntreZeroeTres === 1) {
  console.log(
    `Você escolher ${handType} e o computador escolher pedra. Você ganhou!!`
  );
} else if (handType === "papel" && numeroAleatorioEntreZeroeTres === 2) {
  console.log(
    `Você escolher ${handType} e o computador escolher papel. Empatou!!`
  );
} else if (handType === "papel" && numeroAleatorioEntreZeroeTres === 3) {
  console.log(
    `Você escolher ${handType} e o computador escolher tesoura. Computador ganhou!!`
  );
} else if (handType === "tesoura" && numeroAleatorioEntreZeroeTres === 1) {
  console.log(
    `Você escolher ${handType} e o computador escolher pedra. Computadpr ganhou!!`
  );
} else if (handType === "tesoura" && numeroAleatorioEntreZeroeTres === 2) {
  console.log(
    `Você escolher ${handType} e o computador escolher papel. Você ganhou!!`
  );
} else if (handType === "tesoura" && numeroAleatorioEntreZeroeTres === 3) {
  console.log(
    `Você escolher ${handType} e o computador escolher tesoura. Empatou!!`
  );
} else {
  console.log("Algo deu errado");
}
