import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import {HEROES} from '../mock-heroes';
import {HeroDetailComponent} from '../hero-detail/hero-detail.component';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [FormsModule,HeroDetailComponent, CommonModule],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css',
  template: `
      <input [(ngModel)]="hero.name">
  `,
})
export class HeroesComponent implements OnInit {

  selectedHero?: Hero;

  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }
}