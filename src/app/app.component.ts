import { Component, OnInit } from '@angular/core';


export interface Ficha {
  jugador: boolean,
  positionX: number,
  positionY: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  respuestas = new Array<String>()
  fichas = new Array<Ficha>();


  ngOnInit() {
    this.calcuarFichas()
  }

  calcuarFichas() {
    for (let turno: number = 0; turno < 12; turno++) {
      let numeroX: number = this.RandomNumber(1, 5)
      let numeroY: number = 0;
      let numeroYObtenido: boolean = false;
      while (numeroYObtenido === false) {
        numeroYObtenido === false
        if (this.fichas.filter(x => x.positionX === numeroX).length !== 0) {
          if (Math.max(...this.fichas.filter(x => x.positionX === numeroX).map(x => x.positionY)) === 3) {
            // En caso de que la columna este completa
            numeroY = 1;
            numeroX = this.RandomNumber(1, 5)
          } else {
            // En caso de que la columna este incompleta
            numeroY = Math.max(...this.fichas.filter(x => x.positionX === numeroX).map(x => x.positionY)) + 1;
          }
          if (this.fichas.filter(x => x.positionX === numeroX && x.positionY === numeroY).length === 0) {
            numeroYObtenido = true;
          }
        } else {
          numeroYObtenido = true;
          // En caso de qu ela columna ni exista
          numeroY = 1
        }
      }
      const jugador: boolean = turno % 2 === 0;


      const ficha: Ficha = { jugador: jugador, positionX: numeroX, positionY: numeroY }
      this.fichas.push(ficha)
    }
    this.sistemaWinning()
  }

  primeraFila() {
    return this.fichas.filter(x => x.positionY === 1).sort((a, b) => a.positionX - b.positionX)
  }

  segundaFila() {
    return this.fichas.filter(x => x.positionY === 2).sort((a, b) => a.positionX - b.positionX)
  }

  terceraFila() {
    return this.fichas.filter(x => x.positionY === 3).sort((a, b) => a.positionX - b.positionX)
  }

  RandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min
  }

  sistemaWinning() {
    const respuesta = this.ganarHorizontal()
    if (respuesta === "") {
      this.ganarVertical();
      this.ganarDiagonal();
    } else {
      this.respuestas.push(respuesta)
    }
    if (this.respuestas.length === 0) {
      this.respuestas.push("Habria empate, no hay ninguna combinación ganadora posible")
    }
  }

  ganarHorizontal() {
    if (this.comprobarHorizontal(1, true)) {
      return "Gana el Jugador en la primera linea"
    } else if (this.comprobarHorizontal(1, false)) {
      return "Gana la Maquina en la primera linea"
    } else if (this.comprobarHorizontal(2, true)) {
      return "Gana el Jugador en la segunda linea"
    } else if (this.comprobarHorizontal(2, false)) {
      return "Gana la Maquina en la segunda linea"
    } else if (this.comprobarHorizontal(3, true)) {
      return "Gana el Jugador en la tercera linea"
    } else if (this.comprobarHorizontal(3, false)) {
      return "Gana la Maquina en la tercera linea"
    } else {
      return "";
    }
  }

  comprobarHorizontal(positionY: number, jugador: boolean) {
    return this.fichas.filter(x => x.jugador === jugador).filter(x => x.positionY === positionY).length === 4
  }

  ganarVertical() {
    if (this.comprobarVertical(1, true)) {
      this.respuestas.push("Ganador jugador en caso de ponerla arriba a la izquierda, por verticalidad")
    }
    if (this.comprobarVertical(2, true)) {
      this.respuestas.push("Ganador jugador en caso de ponerla arriba, en medio a la izquierda, por verticalidad")
    }
    if (this.comprobarVertical(3, true)) {
      this.respuestas.push("Ganador Jugador en caso de ponerla arriba, en medio a la derecha, por verticalidad")
    }
    if (this.comprobarVertical(4, true)) {
      this.respuestas.push("Ganador Jugador en caso de ponerla arriba a la derecha, por verticalidad")
    }
    if (this.comprobarVertical(1, false)) {
      this.respuestas.push("Ganador maquina en caso de ponerla arriba a la izquierda, por verticalidad")
    }
    if (this.comprobarVertical(2, false)) {
      this.respuestas.push("Ganador maquina en caso de ponerla arriba, en medio a la izquierda, por verticalidad")
    }
    if (this.comprobarVertical(3, false)) {
      this.respuestas.push("Ganador maquina en caso de ponerla arriba, en medio a la derecha, por verticalidad")
    }
    if (this.comprobarVertical(4, false)) {
      this.respuestas.push("Ganador maquina en caso de ponerla arriba a la derecha, por verticalidad")
    }
  }

  comprobarVertical(positionX: number, jugador: boolean) {
    return this.fichas.filter(x => x.jugador === jugador).filter(x => x.positionX === positionX).length === 3
  }

  ganarDiagonal() {

    const diagonalabajo1 = this.comprobarDiagonal(1, 1).jugador;
    const diagonalmedia1 = this.comprobarDiagonal(2, 2).jugador;
    const diagonalsuperior1 = this.comprobarDiagonal(3, 3).jugador;

    const diagonalabajo2 = this.comprobarDiagonal(4, 1).jugador;
    const diagonalmedia2 = this.comprobarDiagonal(3, 2).jugador;
    const diagonalsuperior2 = this.comprobarDiagonal(2, 3).jugador;
    //jugador
   if (diagonalabajo1 === diagonalmedia1 && diagonalsuperior1 === diagonalmedia1) {
     this.respuestas.push("Gana " +  (diagonalmedia1 ? "jugador" : "maquina") + " por diagonal izquierda a derecha")
   } 

   if (diagonalabajo2 === diagonalmedia2 && diagonalsuperior2 === diagonalmedia2) {
    this.respuestas.push("Gana " +  (diagonalmedia2 ? "jugador" : "maquina") + " por diagonal derecha a izquierda")
  } 
  }

  comprobarDiagonal(PosicionX: number, PosicionY: number) {
    return this.fichas.find(x => x.positionX === PosicionX && x.positionY === PosicionY)
  }
}
