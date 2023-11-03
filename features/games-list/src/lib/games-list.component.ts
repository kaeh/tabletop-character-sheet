import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoutesConfigs } from '@kaeh/configs';

@Component({
  selector: 'kaeh-games-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss'],
})
export class GamesListComponent {
  protected readonly games = [
    {
      label: 'byzantine',
      route: RoutesConfigs.byzantine,
    },
  ];
}
