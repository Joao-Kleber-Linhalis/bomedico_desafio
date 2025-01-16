import { Component } from '@angular/core';

@Component({
  selector: 'app-people-form',
  imports: [],
  templateUrl: './people-form.component.html',
  styleUrl: './people-form.component.css',
  host: { 'hostID': crypto.randomUUID().toString() }
})
export class PeopleFormComponent {

}
