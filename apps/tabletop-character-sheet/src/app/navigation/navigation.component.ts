import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoutesConfigs } from '@kaeh/configs';

@Component({
  selector: 'kaeh-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  protected readonly navigationItems = [
    {
      label: 'Mes personnages',
      path: RoutesConfigs.charactersList,
    },
    {
      label: 'Mes parties',
      path: RoutesConfigs.partiesList,
    },
  ];
}
