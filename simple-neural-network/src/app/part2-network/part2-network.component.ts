import { Component } from '@angular/core';
import { NetworkConfigurationService } from '../network-configuration.service';
import { INeuron } from '../neuron.interface';
import { IConnection } from '../connection.interface';
import { ILayer } from '../layer.interface';

@Component({
  selector: 'part2-network',
  templateUrl: './part2-network.component.html',
  styleUrls: ['./part2-network.component.css']
})
export class Part2Network {
  buttonNeuron: INeuron;
  baseConnection: IConnection; //connection between button and neuron0
  baseWeight: number; //weight between button and neuron0
  neurons: Array<INeuron> = []
  connections: Array<IConnection> = [];
  layers: Array<ILayer> = [];
  neuronSpacing: number;
  loaded: boolean = false;
  maxNeuronId: number;
  maxNeuronsInOneLayer: number; //Max neurons present in one layer
  toggleConnections: boolean = false; //Toggle to refresh connection components (update with new data)

  constructor(private networkConfig: NetworkConfigurationService) {
    networkConfig.clearNetwork();
    this.neuronSpacing = 150;
    this.maxNeuronId = 8;
    this.maxNeuronsInOneLayer = 3;

    //Create 4 layers
    this.layers.push(networkConfig.addLayer());
    this.layers.push(networkConfig.addLayer());
    this.layers.push(networkConfig.addLayer());
    this.layers.push(networkConfig.addLayer());

    //Create button to stimulate first neuron
    this.buttonNeuron = networkConfig.addNeuron(0, this.layers[0], 0);
    this.baseWeight = 1;

    //Add 8 neurons
    this.neurons.push(networkConfig.addNeuron(1, this.layers[0],1)); //Starting neuron
    this.neurons.push(networkConfig.addNeuron(2, this.layers[1],1));
    this.neurons.push(networkConfig.addNeuron(3, this.layers[1],2));
    this.neurons.push(networkConfig.addNeuron(4, this.layers[1],3));
    this.neurons.push(networkConfig.addNeuron(5, this.layers[2],1));
    this.neurons.push(networkConfig.addNeuron(6, this.layers[2],2));
    this.neurons.push(networkConfig.addNeuron(7, this.layers[2],3));
    this.neurons.push(networkConfig.addNeuron(8, this.layers[3],1));

    //Add counts to layers
    this.layers[0].neuronCount = 1;
    this.layers[1].neuronCount = 3;
    this.layers[2].neuronCount = 3;
    this.layers[3].neuronCount = 1;

    //Add Spacing between neurons in layer
    this.layers[0].spacing = this.neuronSpacing;
    this.layers[1].spacing = 0;
    this.layers[2].spacing = 0;
    this.layers[3].spacing = this.neuronSpacing;

    //Add connection to stimlate base neuron with a button
    this.baseConnection = networkConfig.addConnection(this.buttonNeuron, this.neurons[0], this.baseWeight);

    //Add connections from 1st layer to 2nd layer
    this.connections.push(networkConfig.addConnection(this.neurons[0], this.neurons[1], 1));
    this.connections.push(networkConfig.addConnection(this.neurons[0], this.neurons[2], 1));
    this.connections.push(networkConfig.addConnection(this.neurons[0], this.neurons[3], 1));

    //Add connections from 2nd layer to 3rd layer
    this.connections.push(networkConfig.addConnection(this.neurons[1], this.neurons[4], 1));
    this.connections.push(networkConfig.addConnection(this.neurons[1], this.neurons[5], 1));
    this.connections.push(networkConfig.addConnection(this.neurons[2], this.neurons[4], 1));
    this.connections.push(networkConfig.addConnection(this.neurons[2], this.neurons[5], 1));
    this.connections.push(networkConfig.addConnection(this.neurons[2], this.neurons[6], 1));
    this.connections.push(networkConfig.addConnection(this.neurons[3], this.neurons[5], 1));
    this.connections.push(networkConfig.addConnection(this.neurons[3], this.neurons[6], 1));

    //Add connections from 3rd layer to 4th layer
    this.connections.push(networkConfig.addConnection(this.neurons[4], this.neurons[7], 1));
    this.connections.push(networkConfig.addConnection(this.neurons[5], this.neurons[7], 1));
    this.connections.push(networkConfig.addConnection(this.neurons[6], this.neurons[7], 1));

    this.loaded = true;
  }

  updateBaseWeight(event: any) {
    this.networkConfig.updateConnectionWeight(this.baseConnection, this.baseWeight)
  }

  stimulateBaseNeuron(event: any) {
    this.networkConfig.fireNeuron(this.buttonNeuron.id)
  }

  addLayer(event: any) {
    this.layers.push(this.networkConfig.addLayer());
  }

  removeLayer(removeLayer: ILayer) {
    //Remove neurons in the current layer
    this.neurons.forEach((neuron) => {
      if (neuron.layer.id === removeLayer.id) {
        this.removeNeuron(neuron)
      }
    });
    this.layers = this.layers.filter((layer) => layer.id != removeLayer.id);
    //Substract id of layers after remove layer to keep track of layer location
    this.layers.forEach((layer) => {
      if (layer.id > removeLayer.id) {
        layer.id -= 1;
      }
    })
  }

  addNeuron(neuronLayer: ILayer) {
    debugger;
    neuronLayer.neuronCount += 1;
    this.maxNeuronId += 1;
    let layerNeurons = this.neurons.filter((neuron) => neuron.layer.id == neuronLayer.id);

    //Need to change spacing of all other neurons in network if this layer holds the max number of neurons
    if (layerNeurons.length === this.maxNeuronsInOneLayer) {
      this.maxNeuronsInOneLayer += 1;
      this.layers.forEach((layer) => {
        layer.spacing = this.getNeuronSpacing(layer)
      });
    } else {
      neuronLayer.spacing = this.getNeuronSpacing(neuronLayer);
    }
    this.neurons.push(this.networkConfig.addNeuron(this.maxNeuronId, neuronLayer, neuronLayer.neuronCount));
    this.toggleConnections = !this.toggleConnections;
  }

  removeNeuron(removeNeuron: INeuron) {
    removeNeuron.layer.neuronCount -= 1;
    if (this.maxNeuronId === removeNeuron.id) this.maxNeuronId -= 1;
    this.neurons.forEach((neuron) => {
      if (neuron.layer.id === removeNeuron.layer.id && neuron.position > removeNeuron.position) {
        neuron.position -= 1;
      }
    });

    //Change the spacing in the network if removing from max neuron's layer
    if (removeNeuron.layer.neuronCount + 1 === this.maxNeuronsInOneLayer &&
        !this.layers.some((layer) => layer.neuronCount === this.maxNeuronsInOneLayer)) {
      this.maxNeuronsInOneLayer -= 1;
      this.layers.forEach((layer) => {
        layer.spacing = this.getNeuronSpacing(layer)
      });
    } else {
      removeNeuron.layer.spacing = this.getNeuronSpacing(removeNeuron.layer);
    }

    //Remove the connection to and from this neuron
    let neuronConnections = this.connections
      .filter((connection) =>
        removeNeuron.id === connection.inputNeuron.id || removeNeuron.id === connection.outputNeuron.id
      );
    neuronConnections.forEach((connection) => this.removeConnection(connection));
    this.neurons = this.neurons.filter((neuron) => neuron.id != removeNeuron.id);
    this.toggleConnections = !this.toggleConnections;
  }

  removeConnection(connection: IConnection) {

  }

  neuronEvent(event: any) {
    if (event.action === 'Remove') {
      this.removeNeuron(event.neuron);
    }
  }

  getNeuronSpacing(layer: ILayer): number {
    return layer.neuronCount === this.maxNeuronsInOneLayer
      ? 0
      : (this.maxNeuronsInOneLayer - 1)/(layer.neuronCount + 1)*this.neuronSpacing;
  }
}
