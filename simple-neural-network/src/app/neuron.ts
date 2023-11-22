import { Layer } from "./layer";
import { INeuron } from "./neuron.interface";

//Defines a connection between two neurons
export class Neuron implements INeuron {
	id: number; //Distinct number given to neuron
  layer: Layer; //What layer the neuron is in
  position: number; //The neuron position within the layer
  selected: boolean; //Whether the user selected the neuron
  positionX: number; //Coordinates in the UI
  positionY: number;
  marginLeft: number;
  marginTop: number;
  constructor(id: number, layer: Layer, position: number, marginLeft: number, marginTop: number, neuronSpacing: number) {
    this.id = id;
    this.layer = layer;
    this.position = position;
    this.selected = false;
    this.marginLeft = marginLeft;
    this.marginTop = marginTop;
    this.updateNeuronSVG(neuronSpacing)
  }

  updateNeuronSVG(neuronSpacing: number): void {
    this.positionX = neuronSpacing*this.layer.position + this.marginLeft;
    this.positionY = neuronSpacing*this.position + this.marginTop + this.layer.spacing;
  }
}
