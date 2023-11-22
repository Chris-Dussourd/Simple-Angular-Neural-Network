import { Injectable } from "@angular/core";
import { Neuron } from "./neuron";
import { BehaviorSubject } from "rxjs";
import { Connection } from "./connection";
import { Layer } from "./layer";

@Injectable({
	providedIn: 'root',
})
/**
 * Constants used in defining how the network operates
 */
export class NetworkConfigurationService {
  neuronSpacing = 150;
  marginLeft: number = -50;
  marginTop: number = 70;
  private baseNeuron: Neuron;
  private layersArray: Array<Layer> = new Array<Layer>(); //neurons in Neural Network
  private neuronsArray: Array<Neuron> = new Array<Neuron>(); //neurons in Neural Network
  private connectionsArray: Array<Connection> = new Array<Connection>(); //connections in Neural Network
  //Neighbors are used to determine which selected neurons are not yet connected so a button to add connection can be added to UI
  private neighborsArray: Array<{neuron1: Neuron, neuron2: Neuron}> = new Array<{neuron1: Neuron, neuron2: Neuron}>();
  private maxNeuronsInOneLayer: number = 0; //Max neurons present in one layer
  //Send out which neurons are being stimulated
	private neuronStimulationSubject$ = new BehaviorSubject<Connection>(new Connection(-1, new Neuron(-1, new Layer(-1, -1), -1, -1, -1, -1), new Neuron(-1, new Layer(-1, -1), -1, -1, -1, -1),  0, -1, -1, -1));
	neuronStimulation$ = this.neuronStimulationSubject$.asObservable();
  //Send out udpates to layers, neurons, and connections
	private layerSubject$ = new BehaviorSubject<Array<Layer>>([]);
	layers$ = this.layerSubject$.asObservable();
	private neuronSubject$ = new BehaviorSubject<Array<Neuron>>([]);
	neurons$ = this.neuronSubject$.asObservable();
	private connectionSubject$ = new BehaviorSubject<Array<Connection>>([]);
	connections$ = this.connectionSubject$.asObservable();
	private unconnectedNeighborsSubject$ = new BehaviorSubject<Array<{ neuron1: Neuron, neuron2: Neuron }>>([]);
	unconnectedNeighbors$ = this.unconnectedNeighborsSubject$.asObservable();
	constructor() {
    this.baseNeuron = new Neuron(-1, new Layer(-1, -1), -1, -1, -1, -1);
	}

  setMargins(marginLeft: number, marginTop: number) {
    this.marginLeft = marginLeft;
    this.marginTop = marginTop;
  }

  addLayer(id: number) {
    let layer = new Layer(id, this.layersArray.length + 1);
    this.layersArray.push(layer);
    this.layerSubject$.next(this.layersArray);
    return layer;
  }

  removeLayer(removeLayer: Layer) {
    this.layersArray = this.layersArray.filter((layer) => layer.id != removeLayer.id);
    //Substract id of layers after remove layer to keep track of layer location
    this.layersArray.forEach((layer) => {
      if (layer.position > removeLayer.position) {
        layer.position -= 1;
      }
    });
    //Remove neurons in the current layer
    this.neuronsArray.forEach((neuron) => {
      if (neuron.layer.id === removeLayer.id) {
        this.removeNeuron(neuron);
      }
    });
    this.layerSubject$.next(this.layersArray);
    this.neuronSubject$.next(this.neuronsArray);
    this.connectionSubject$.next(this.connectionsArray);
  }

  addNeuron(id: number, neuronLayer: Layer): Neuron {
    neuronLayer.neuronCount += 1;
    let neuron = new Neuron(id, neuronLayer, neuronLayer.neuronCount, this.marginLeft, this.marginTop, this.neuronSpacing);


    let layerNeurons = this.neuronsArray.filter((neuron) => neuron.layer.id == neuronLayer.id);
    //Need to change spacing of all other neurons in network if this layer holds the max number of neurons
    if (layerNeurons.length === this.maxNeuronsInOneLayer) {
      this.maxNeuronsInOneLayer += 1;
      this.layersArray.forEach((layer) => {
        layer.spacing = this.getNeuronSpacing(layer)
      });
    } else {
      neuronLayer.spacing = this.getNeuronSpacing(neuronLayer);
    }

    this.neuronsArray.push(neuron);
    this.neuronsArray.forEach((neuron) => neuron.updateNeuronSVG(this.neuronSpacing));
    this.connectionsArray.forEach((connection) => connection.updateConnectionLine(this.neuronSpacing));

    this.neuronSubject$.next(this.neuronsArray);
    this.connectionSubject$.next(this.connectionsArray);
    return neuron;
  }

  removeNeuron(removeNeuron: Neuron, sendMessage: boolean = false) {
    removeNeuron.layer.neuronCount -= 1;
    this.neuronsArray.forEach((neuron) => {
      if (neuron.layer.id === removeNeuron.layer.id && neuron.position > removeNeuron.position) {
        neuron.position -= 1;
      }
    });

    //Change the spacing in the network if removing from max neuron's layer
    if (removeNeuron.layer.neuronCount + 1 === this.maxNeuronsInOneLayer &&
        !this.layersArray.some((layer) => layer.neuronCount === this.maxNeuronsInOneLayer)) {
      this.maxNeuronsInOneLayer -= 1;
      this.layersArray.forEach((layer) => {
        layer.spacing = this.getNeuronSpacing(layer)
      });
    } else {
      removeNeuron.layer.spacing = this.getNeuronSpacing(removeNeuron.layer);
    }

    //Remove the connection to and from this neuron
    this.connectionsArray = this.connectionsArray
      .filter((connection) =>
        removeNeuron.id !== connection.inputNeuron.id && removeNeuron.id !== connection.outputNeuron.id
      );
    this.neuronsArray = this.neuronsArray.filter((neuron) => neuron.id !== removeNeuron.id);
    this.neuronsArray.forEach((neuron) => neuron.updateNeuronSVG(this.neuronSpacing));
    this.connectionsArray.forEach((connection) => connection.updateConnectionLine(this.neuronSpacing));

    if (sendMessage) {
      this.neuronSubject$.next(this.neuronsArray);
      this.connectionSubject$.next(this.connectionsArray);
    }
  }

  selectNeuron(selectNeuron: Neuron) {
    selectNeuron.selected = !selectNeuron.selected;
    if (selectNeuron.selected) {
      //Find neighbors also selected
      let newNeighbors = this.neuronsArray.filter((neuron) => neuron.selected && neuron.id !== selectNeuron.id
          && !this.connectionsArray.some((connection) => (connection.inputNeuron.id === selectNeuron.id && connection.outputNeuron.id === neuron.id)
              || (connection.inputNeuron.id === neuron.id && connection.outputNeuron.id === selectNeuron.id)))
        .map((neuron) => { return { neuron1: neuron, neuron2: selectNeuron } } )
      this.neighborsArray = [...this.neighborsArray, ...newNeighbors];
      this.unconnectedNeighborsSubject$.next(this.neighborsArray);
    } else {
      //Remove neighbors
      this.neighborsArray = this.neighborsArray.filter((neighbor) =>
        neighbor.neuron1.id !== selectNeuron.id && neighbor.neuron2.id !== selectNeuron.id);
      this.unconnectedNeighborsSubject$.next(this.neighborsArray);
    }
  }

  addConnection(id: number, inputNeuron: Neuron, outputNeuron: Neuron, weight: number): Connection {
    let connection = new Connection(id, inputNeuron, outputNeuron, weight, this.marginLeft, this.marginTop, this.neuronSpacing);
    this.neighborsArray = this.neighborsArray.filter((neighbor) => !(neighbor.neuron1.id === inputNeuron.id && neighbor.neuron2.id === outputNeuron.id)
      && !(neighbor.neuron1.id === outputNeuron.id && neighbor.neuron2.id === inputNeuron.id));
    this.connectionsArray.push(connection);
    this.connectionSubject$.next(this.connectionsArray);
    this.unconnectedNeighborsSubject$.next(this.neighborsArray);
    return connection;
  }

  removeConnection(removeConnection: Connection, sendMessage: boolean = false) {
    this.connectionsArray = this.connectionsArray.filter((connection) => connection.id !== removeConnection.id);
    if (sendMessage) this.connectionSubject$.next(this.connectionsArray);
  }

  updateConnectionWeight(connection: Connection, newWeight: number) {
    if (connection != undefined) connection.weight = +newWeight;
  }

  stimulateBase(weight: number) {
    this.neuronsArray.filter((neuron) => neuron.layer.position === 1)
      .forEach((neuron) => {
        this.neuronStimulationSubject$.next(new Connection(0, this.baseNeuron, neuron, weight, this.marginLeft, this.marginTop, this.neuronSpacing));
      })
  }

  fireNeuron(neuronId: number) {
    this.connectionsArray
      .filter((connection) => connection.inputNeuron.id === neuronId)
      .forEach((connection) => {
        this.neuronStimulationSubject$.next(connection);
      });
  }

  clearNetwork() {
    this.layersArray = new Array<Layer>(); //neurons in Neural Network
    this.neuronsArray = new Array<Neuron>(); //neurons in Neural Network
    this.connectionsArray = new Array<Connection>(); //connections in Neural Network
  }

  getNeuronSpacing(layer: Layer): number {
    return layer.neuronCount === this.maxNeuronsInOneLayer
      ? 0
      : (this.maxNeuronsInOneLayer - 1)/(layer.neuronCount + 1)*this.neuronSpacing;
  }
}
