import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

@Component({
    selector: 'app-members',
    templateUrl: './members.component.html',
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MembersComponent { }