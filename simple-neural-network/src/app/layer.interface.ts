//Defines a connection between two neurons
export interface ILayer {
	id: number; //Distinct number given to layer
  neuronCount: number; //Number of neurons in the layer
  spacing: number; //Spacing before neurons start being displayed in layer (visual purposes)
}
