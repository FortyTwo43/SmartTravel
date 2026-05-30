import { Component } from '@angular/core';
import { Navbar } from '../../layouts/navbar/navbar';
import { Footer } from '../../layouts/footer/footer';
import { HomeHero } from '../../components/home/home-hero/home-hero';
import { HomeFeatures } from '../../components/home/home-features/home-features';
import { HomeInfo } from '../../components/home/home-info/home-info';
import { HomeDestinations } from '../../components/home/home-destinations/home-destinations';
import { HomeCta } from '../../components/home/home-cta/home-cta';

@Component({
  selector: 'app-home',
  imports: [
    Navbar,
    Footer,
    HomeHero,
    HomeFeatures,
    HomeInfo,
    HomeDestinations,
    HomeCta
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
