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
  maxNeuronsInLayer: number;
  loaded: boolean = false;
  constructor(private networkConfig: NetworkConfigurationService) {
    networkConfig.clearNetwork();
    this.maxNeuronsInLayer = 3;

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

  removeNeuron(removeNeuron: INeuron) {
  }
}
