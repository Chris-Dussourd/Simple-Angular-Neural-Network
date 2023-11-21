import { ILayer } from "./layer.interface";

//Defines a connection between two neurons
export class Layer implements ILayer {
	id: number; //Distinct number given to alyer
  neuronCount: number; //Number of neurons in layer
  spacing: number; //Spacing before neurons start being displayed in layer (visual purposes)
  constructor(id: number) {
    this.id = id;
    this.neuronCount = 0;
    this.spacing = 0;
  }
}
