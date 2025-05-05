import { Component } from '@angular/core';
import { HomeComponent } from '../home.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ViewportScroller } from '@angular/common';


@Component({
  selector: 'app-header',
  imports: [RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router: Router, private viewportScroller: ViewportScroller) {

  }


  scrollTo(sectionId: string): void {
    const currentUrl = this.router.url.split('#')[0];
    let a: number = 23;
    let b: number = 34;
    let soma: number = 3;

    soma = a * 2 - b;
    console.log(`O resultado da soma é de ${soma}`)

    if (currentUrl === '/home') {
      this.viewportScroller.scrollToAnchor(sectionId);
    } else {
      this.router.navigate(['/home'], { fragment: sectionId });
    }
  }


  clickMenu() {
    const titulos: null | HTMLElement = document.getElementById('header-titulos-menu-mobile');
    const btn = document.getElementById('btn-login-menu-mobile');

    if (titulos) {
      titulos.classList.toggle('active');
    }

    if (btn) {
      btn.classList.toggle('active');
    }

  }

}

