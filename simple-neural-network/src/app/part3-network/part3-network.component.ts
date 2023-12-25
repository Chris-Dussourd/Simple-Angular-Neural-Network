import { Component, OnInit } from '@angular/core';
import { NetworkConfigurationService } from '../network-configuration.service';
import { Neuron } from '../neuron';
import { Layer } from '../layer';

@Component({
  selector: 'part3-network',
  templateUrl: './part3-network.component.html',
  styleUrls: ['./part3-network.component.css']
})
export class Part3Network implements OnInit {
  buttonNeuron: Neuron;
  baseWeight: number; //weight between button and neuron0
  maxLayerId: number;
  maxNeuronId: number;
  maxConnectionId: number;

  constructor(public networkConfig: NetworkConfigurationService) {
  }

  ngOnInit(): void {
    this.networkConfig.clearNetwork();
    this.initializeNetwork();
  }

  initializeNetwork() {
    this.networkConfig.setMargins(-50, -50);
    this.maxLayerId = 4;
    this.maxNeuronId = 8;
    this.maxConnectionId = 13;
    this.baseWeight = 1;

    //Create 4 layers
    let layer1 = this.networkConfig.addLayer(1);
    let layer2 = this.networkConfig.addLayer(2);
    let layer3 = this.networkConfig.addLayer(3);
    let layer4 = this.networkConfig.addLayer(4);

    //Add 8 neurons
    let neuron1 = this.networkConfig.addNeuron(1, layer1); //Starting neuron
    let neuron2 = this.networkConfig.addNeuron(2, layer2);
    let neuron3 = this.networkConfig.addNeuron(3, layer2);
    let neuron4 = this.networkConfig.addNeuron(4, layer2);
    let neuron5 = this.networkConfig.addNeuron(5, layer3);
    let neuron6 = this.networkConfig.addNeuron(6, layer3);
    let neuron7 = this.networkConfig.addNeuron(7, layer3);
    let neuron8 = this.networkConfig.addNeuron(8, layer4);

    //Add connections from 1st layer to 2nd layer
    this.networkConfig.addConnection(1, neuron1, neuron2, 1);
    this.networkConfig.addConnection(2, neuron1, neuron3, 1);
    this.networkConfig.addConnection(3, neuron1, neuron4, 1);

    //Add connections from 2nd layer to 3rd layer
    this.networkConfig.addConnection(4, neuron2, neuron5, 1);
    this.networkConfig.addConnection(5, neuron2, neuron6, 1);
    this.networkConfig.addConnection(6, neuron3, neuron5, 1);
    this.networkConfig.addConnection(7, neuron3, neuron6, 1);
    this.networkConfig.addConnection(8, neuron3, neuron7, 1);
    this.networkConfig.addConnection(9, neuron4, neuron6, 1);
    this.networkConfig.addConnection(10, neuron4, neuron7, 1);

    //Add connections from 3rd layer to 4th layer
    this.networkConfig.addConnection(11, neuron5, neuron8, 1);
    this.networkConfig.addConnection(12, neuron6, neuron8, 1);
    this.networkConfig.addConnection(13, neuron7, neuron8, 1);
  }

  stimulateBaseNeuron(event: any) {
    this.networkConfig.stimulateBase(this.baseWeight);
  }

  addLayer(event: any) {
    this.maxLayerId += 1;
    this.networkConfig.addLayer(this.maxLayerId);
  }

  removeLayer(removeLayer: Layer) {
    if (removeLayer.id === this.maxLayerId) this.maxLayerId -= 1;
    this.networkConfig.removeLayer(removeLayer);
  }

  addNeuron(neuronLayer: Layer) {
    this.maxNeuronId += 1;
    this.networkConfig.addNeuron(this.maxNeuronId, neuronLayer);
  }

  addConnection(neuron1: Neuron, neuron2: Neuron) {
    this.maxConnectionId += 1;
    let inputNeuron = neuron1.layer.position <= neuron2.layer.position ? neuron1 : neuron2;
    let outputNeuron = neuron1.layer.position <= neuron2.layer.position ? neuron2 : neuron1;
    this.networkConfig.addConnection(this.maxConnectionId, inputNeuron, outputNeuron, 1);
  }

  neuronEvent(event: any) {
    if (event.action === 'Remove') {
      if (this.maxNeuronId === event.neuron.id) this.maxNeuronId -= 1;
      this.networkConfig.removeNeuron(event.neuron, true);
    }
    if (event.action === 'Selected') {
      this.networkConfig.selectNeuron(event.neuron);;
    }
  }

  connectionEvent(event: any) {
    if (event.action === 'Remove') {
      if (event.connection.id === this.maxConnectionId) this.maxConnectionId -= 1;
      this.networkConfig.removeConnection(event.connection, true);
    }
  }

  getLayerHeight(layers: Array<Layer>): number {
    //Use max neurons in a layer to get the height
    let count = layers.reduce((prev, current) => {
      return ( prev.neuronCount > current.neuronCount ? prev : current );
    }).neuronCount;
    //Return at least 1
    return count === 0 ? 150 : count*150;
  }
}
