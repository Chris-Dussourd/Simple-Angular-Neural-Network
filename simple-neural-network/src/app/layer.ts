import { ILayer } from "./layer.interface";

//Defines a connection between two neurons
export class Layer implements ILayer {
	id: number; //Distinct number given to layer
  position: number; //Ordering of layers
  neuronCount: number; //Number of neurons in layer
  spacing: number; //Spacing before neurons start being displayed in layer (visual purposes)
  constructor(id: number, position: number) {
    this.id = id;
    this.position = position;
    this.neuronCount = 0;
    this.spacing = 0;
  }
}
