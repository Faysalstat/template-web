import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
      },
      {
        label: 'Features',
        icon: 'pi pi-star',
      },
      {
        label: 'Projects',
        icon: 'pi pi-search',
        items: [
          {
            label: 'Core',
            icon: 'pi pi-bolt',
          },
          {
            label: 'Blocks',
            icon: 'pi pi-server',
          },
          {
            label: 'UI Kit',
            icon: 'pi pi-pencil',
          },
          {
            separator: true,
          },
          {
            label: 'Templates',
            icon: 'pi pi-palette',
            items: [
              {
                label: 'Apollo',
                icon: 'pi pi-palette',
                badge: '2',
              },
              {
                label: 'Ultima',
                icon: 'pi pi-palette',
                badge: '3',
              },
            ],
          },
        ],
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
        badge: '3',
      },
    ];
  }
}
