//helper file

export function getIlmoitustyyppiById(id) {
  //hardcoded ilmoitustyyppi iideet
  let type;
  switch (id) {
    case 1:
        type = "Vikailmoitus";
      break;
    case 2:
        type = "Avaimet";
      break;
    case 3:
        type = "Autopaikat";
      break;
    case 4:
        type = "Saunavuorot";
      break;
    case 5:
        type = "Lähtöilmoitus";
      break;
    case 6:
        type = "Vastikeasiat";
      break;
    case 7:
        type = "Häiriöilmoitus";
      break;
    case 8:
        type = "Reklamaatio";
      break;
    case 9:
        type = "Muu palaute";
      break;
    case 10:
        type = "Yhteydenotto";
      break;
    default:
      type = "";
  }
  return type;
}

export function notificationStatusText(status) {
  //hardcoded status tekstit - used in etusivu.js
  let text;
  switch (status) {
    case 1:
        text = "lukematon";
      break;
    case 2:
        text = "luettu";
      break;
    case 3:
        text = "työn alla";
      break;
    case 4:
        text = "odotustilassa";
      break;
    case 5:
        text = "valmis";
      break;
    default:
        text = "";
  }
  return text;
}
