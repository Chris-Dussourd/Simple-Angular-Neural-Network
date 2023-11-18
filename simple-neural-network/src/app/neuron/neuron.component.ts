import { Component, Input } from '@angular/core';
import { NetworkConfigurationService } from '../network-configuration.service';
import { Subscription } from 'rxjs';
import { Connection } from '../connection';
import { Neuron } from '../neuron';

@Component({
  selector: 'neuron',
  templateUrl: './neuron.component.html',
  styleUrls: ['./neuron.component.css']
})
export class NeuronComponent {
  @Input() neuron: Neuron;
  potential: number;
  neuronNumber: number;
  impulseDropoff: number;
	stimulationSubscription: Subscription;
  constructor(private networkConfig: NetworkConfigurationService) {
    this.potential = 0;
    this.neuronNumber = 1;
    this.impulseDropoff = networkConfig.impulseDropoff;
  }

	ngOnInit(): void {
		this.stimulationSubscription = this.networkConfig.neuronStimulation$.subscribe((connection: Connection) => {
				if (connection.outputNeuron.id === this.neuron.id) {
          this.potential = this.potential + connection.weight*100;
          setTimeout(() => {
              if (this.potential >= 100) {
                this.potential = 0;
                this.networkConfig.fireNeuron(this.neuron.id);
            }
          }, 500);
        }
			});
    }
}
