import * as fs from 'fs';
import chalk from 'chalk';
import { Carta, checkUserDirectory, Mostrarporpantalla, Tipo, Color, Rareza } from './Carta.js';

/**
 * Clase que representa una colección de cartas mágicas.
 */
export class ColecciondeCartas {
  public coleccion: Carta[]; // Una colección de cartas para los usuarios

  /**
   * Constructor de la clase ColecciondeCartas.
   * Inicializa la colección de cartas vacía.
   */
  constructor(){
    this.coleccion = [];
  }

  /**
   * Método para agregar una carta a la colección de un usuario.
   * @param usuario Nombre del usuario.
   * @param nuevaCarta Carta que se desea agregar.
   */
  public agregarcarta(usuario: string , nuevaCarta: Carta): Promise<string> {
    const userDirectory = checkUserDirectory(usuario);
    const filePath = userDirectory + nuevaCarta.id + '.json';
    return new Promise<string>((resolve, reject) => {
      fs.access(userDirectory, fs.constants.R_OK, (err) => {
        if(err){
          reject(`La carta no se ha podido agregar`)
        } else {
          resolve(`La carta se ha agregado`)
          fs.writeFile(filePath, JSON.stringify(nuevaCarta), (err) => {
            if(err){
              console.log("fallo al escribir")
            } 
          })
        }
      })
    })
  }

  /**
   * Método para eliminar una carta de la colección de un usuario.
   * @param usuario Nombre del usuario.
   * @param id ID de la carta que se desea eliminar.
   */
  public eliminarcarta(usuario: string, id: number): Promise<string> {
    const userDirectory = checkUserDirectory(usuario);
    const filePath = userDirectory + id + '.json';
    return new Promise<string>((resolve, reject) => {
      fs.access(filePath, fs.constants.R_OK, (err) => {
        if(err){
          reject(`La carta no se ha podido borrar`)
        } else {
          resolve(`La carta se ha borrado`)
          fs.unlink(filePath, (err) => {
            if(err){
              console.log("fallo al borrar")
            }
          })
        }
      })
    })
  }
}

// Ejemplos de cartas
const NuevaColeccion = new ColecciondeCartas;

const nuevaCarta1: Carta = {
  id: 1,
  nombre: "Black Lotus",
  mana: 0,
  color: "Incoloro" as Color,
  tipo: "Artefacto" as Tipo,
  rareza: "Mítica" as Rareza,
  reglas: "Puedes sacrificar el Black Lotus para añadir tres manás de cualquier color.",
  valor_mercado: 100000
};

const nuevaCarta2: Carta = {
  id: 2,
  nombre: "Lightning Bolt",
  mana: 1,
  color: "Rojo" as Color,
  tipo: "Conjuro" as Tipo,
  rareza: "Común" as Rareza,
  reglas: "Lightning Bolt hace 3 puntos de daño a cualquier objetivo.",
  valor_mercado: 1
};

const nuevaCarta3: Carta = {
  id: 3,
  nombre: "Jace, the Mind Sculptor",
  mana: 4,
  color: "Azul" as Color,
  tipo: "Planeswalker" as Tipo,
  rareza: "Mítica" as Rareza,
  reglas: "+2: Miras las tres primeras cartas de la biblioteca de un oponente, y las pones en cualquier orden.\n-1: Regresas la carta objetivo a la mano de su propietario.\n-12: Exilias todas las cartas en la mano y en la biblioteca de un oponente, y ganas 7 vidas por cada carta exiliada de esta manera.",
  lealtad: 3,
  valor_mercado: 80
};



NuevaColeccion.agregarcarta("loren", nuevaCarta1).then((result) => {
  console.log(result);
}) .catch((error) => {
  console.log(error);
});

NuevaColeccion.eliminarcarta("loren", nuevaCarta1.id).then((result) => {
  console.log(result);
}) .catch((error) => {
  console.log(error);
});