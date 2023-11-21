import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() marginLeft: number = 0;
  @Input() marginTop: number = 0;
  @Input() neuronSpacing: number = 150;

  @Output() neuronEvent = new EventEmitter<{action: string, neuron: Neuron}>();

  selected: boolean = false; //Whether user selected the neuron
  potential: number;
	stimulationSubscription: Subscription;

  constructor(private networkConfig: NetworkConfigurationService) {
    this.potential = 0;
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

  ngOnDestroy(): void {
    this.stimulationSubscription.unsubscribe();
  }

  selectNeuron(): void {
    this.selected = !this.selected;
  }

  removeNeuron(): void {
    this.neuronEvent.emit({ action: 'Remove', neuron: this.neuron });
  }
}
