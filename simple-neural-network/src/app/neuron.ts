import { INeuron } from "./neuron.interface";

//Defines a connection between two neurons
export class Neuron implements INeuron {
	id: number; //Distinct number given to neuron
  layer: number; //What layer the neuron is in
  position: number; //The neuron position within the layer
  constructor(id: number, layer: number, position: number) {
    this.id = id;
    this.layer = layer;
    this.position = position;
  }
}
