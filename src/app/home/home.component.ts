import { Component, input } from '@angular/core';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { ContentComponent } from '../components/content/content.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, ContentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  groupId = input.required<string>();
}
