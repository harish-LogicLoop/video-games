import { Component, Input, OnInit } from '@angular/core';
import { IGame } from 'src/app/shared/models/game';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent implements OnInit {
  @Input() game: IGame;
  @Input() index: IGame;

  constructor() { }

  ngOnInit(): void {
  }

}
