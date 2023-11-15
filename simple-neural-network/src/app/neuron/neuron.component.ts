import { Component } from '@angular/core';
import { NetworkConfigurationService } from '../network-configuration.service';

@Component({
  selector: 'neuron',
  templateUrl: './neuron.component.html',
  styleUrls: ['./neuron.component.css']
})
export class NeuronComponent {
  potential: number;
  neuronNumber: number;
  impulseDropoff: number;
  constructor(networkConfig: NetworkConfigurationService) {
    this.potential = 0;
    this.neuronNumber = 1;
    this.impulseDropoff = networkConfig.impulseDropoff;
  }
}
