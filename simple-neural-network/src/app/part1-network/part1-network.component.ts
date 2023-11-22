import { Component } from '@angular/core';
import { NetworkConfigurationService } from '../network-configuration.service';
import { Neuron } from '../neuron';
import { Connection } from '../connection';
import { Layer } from '../layer';

@Component({
  selector: 'part1-network',
  templateUrl: './part1-network.component.html',
  styleUrls: ['./part1-network.component.css']
})
export class Part1Network {
  baseWeight: number; //weight between button and neuron0
  neurons: Array<Neuron> = []
  connections: Array<Connection> = [];
  layers: Array<Layer> = [];
  loaded: boolean = false;
  constructor(public networkConfig: NetworkConfigurationService) {
    networkConfig.clearNetwork();
    networkConfig.setMargins(-50, 220);
    this.baseWeight = 1;

    //Create 4 layers
    this.layers.push(networkConfig.addLayer(1));
    this.layers.push(networkConfig.addLayer(2));
    this.layers.push(networkConfig.addLayer(3));
    this.layers.push(networkConfig.addLayer(4));

    //Add 8 neurons
    this.neurons.push(networkConfig.addNeuron(1, this.layers[0])); //Starting neuron
    this.neurons.push(networkConfig.addNeuron(2, this.layers[1]));
    this.neurons.push(networkConfig.addNeuron(3, this.layers[1]));
    this.neurons.push(networkConfig.addNeuron(4, this.layers[1]));
    this.neurons.push(networkConfig.addNeuron(5, this.layers[2]));
    this.neurons.push(networkConfig.addNeuron(6, this.layers[2]));
    this.neurons.push(networkConfig.addNeuron(7, this.layers[2]));
    this.neurons.push(networkConfig.addNeuron(8, this.layers[3]));

    //Add counts to layers
    this.layers[0].neuronCount = 1;
    this.layers[1].neuronCount = 3;
    this.layers[2].neuronCount = 3;
    this.layers[3].neuronCount = 1;

    //Add connections from 1st layer to 1st layer
    this.connections.push(networkConfig.addConnection(1, this.neurons[0], this.neurons[1], 1));
    this.connections.push(networkConfig.addConnection(2, this.neurons[0], this.neurons[2], 1));
    this.connections.push(networkConfig.addConnection(3, this.neurons[0], this.neurons[3], 1));

    //Add connections from 1st layer to 2nd layer
    this.connections.push(networkConfig.addConnection(4, this.neurons[1], this.neurons[4], 1));
    this.connections.push(networkConfig.addConnection(5, this.neurons[1], this.neurons[5], 1));
    this.connections.push(networkConfig.addConnection(6, this.neurons[2], this.neurons[4], 1));
    this.connections.push(networkConfig.addConnection(7, this.neurons[2], this.neurons[5], 1));
    this.connections.push(networkConfig.addConnection(8, this.neurons[2], this.neurons[6], 1));
    this.connections.push(networkConfig.addConnection(9, this.neurons[3], this.neurons[5], 1));
    this.connections.push(networkConfig.addConnection(10, this.neurons[3], this.neurons[6], 1));

    //Add connections from 2nd layer to 3rd layer
    this.connections.push(networkConfig.addConnection(11, this.neurons[4], this.neurons[7], 1));
    this.connections.push(networkConfig.addConnection(12, this.neurons[5], this.neurons[7], 1));
    this.connections.push(networkConfig.addConnection(13, this.neurons[6], this.neurons[7], 1));

    this.loaded = true;
  }

  stimulateBaseNeuron(event: any) {
    this.networkConfig.stimulateBase(this.baseWeight);
  }
}
