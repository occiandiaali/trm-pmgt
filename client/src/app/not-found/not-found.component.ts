import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NotFoundComponent { }