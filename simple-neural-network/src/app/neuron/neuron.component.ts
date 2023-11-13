import { Component } from '@angular/core';

@Component({
  selector: 'app-neuron',
  templateUrl: './neuron.component.html',
  styleUrls: ['./neuron.component.css']
})
export class NeuronComponent {
  potential: number;
  neuronNumber: number;
  constructor() {
    this.potential = 0;
    this.neuronNumber = 1;
  }
}
