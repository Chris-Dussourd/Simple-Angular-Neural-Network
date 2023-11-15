import { Component, Input } from '@angular/core';
import { IConnection } from '../connection.interface';

@Component({
  selector: 'connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent {
  @Input() neuronConnection: IConnection;
}
