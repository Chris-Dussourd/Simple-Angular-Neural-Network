import { IConnection } from "./connection.interface";
import { Neuron } from "./neuron";

//Defines a connection between two neurons
export class Connection implements IConnection {
  id: number;
	inputNeuron: Neuron;
  outputNeuron: Neuron;
  weight: number; //How strong the connection is between the two neurons
  marginLeft: number;
  marginTop: number;
  positionX1: number;
  positionX2: number;
  positionY1: number;
  positionY2: number;
  lineWidth: number;
  lineButtonX: number
  lineButtonTransform: string;

  constructor(id: number, inputNeuron: Neuron, outputNeuron: Neuron, weight: number, marginLeft: number, marginTop: number, neuronSpacing: number) {
    this.id = id;
    this.inputNeuron = inputNeuron;
    this.outputNeuron = outputNeuron;
    this.weight = weight;
    this.marginLeft = marginLeft;
    this.marginTop = marginTop;
    this.updateConnectionLine(neuronSpacing);
  }

  updateConnectionLine(neuronSpacing: number): void {
    this.positionX1 = neuronSpacing*this.inputNeuron.layer.position+this.marginLeft+30;
    this.positionX2 = neuronSpacing*this.outputNeuron.layer.position+this.marginLeft-30;
    this.positionY1 = neuronSpacing*this.inputNeuron.position+this.marginTop
      +this.inputNeuron.layer.spacing;
    this.positionY2 = neuronSpacing*this.outputNeuron.position+this.marginTop+this.outputNeuron.layer.spacing;
    this.lineWidth = Math.sqrt(Math.pow(this.positionX2-this.positionX1, 2) + Math.pow(this.positionY2 - this.positionY1,2));
    this.lineButtonTransform = this.positionX2 - this.positionX1 === 0 ? 'rotate(0.5turn)'
      : 'rotate(' + Math.atan((this.positionY2 - this.positionY1)/(this.positionX2-this.positionX1)) + 'rad)';
    // The transform moves the line and this is to correct for it
    this.lineButtonX = this.positionX1 - (this.lineWidth - (this.positionX2 - this.positionX1))/2;
  }
}
