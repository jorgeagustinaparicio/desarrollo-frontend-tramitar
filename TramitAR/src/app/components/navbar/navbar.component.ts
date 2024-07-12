import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { SearchService } from '../../services/search.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  buscar = "";
  showLoginButton = true;

  constructor(private router: Router, private searchService: SearchService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateLoginButtonVisibility();
      }
    });
  }

  ngOnInit() {
    this.updateLoginButtonVisibility();
  }

  updateLoginButtonVisibility() {
    const currentUrl = this.router.url;
    this.showLoginButton = currentUrl === '' || currentUrl === '/';
  }

  search(e: any) {

    this.searchService.setSearch(e.target.value);

  }


  showLoginAlert() {
    Swal.fire({
      title: 'Iniciar sesión',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Usuario">' +
        '<input id="swal-input2" class="swal2-input" type="password" placeholder="Contraseña">',
      showCancelButton: true,
      confirmButtonText: 'Iniciar sesión',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const username = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const password = (document.getElementById('swal-input2') as HTMLInputElement).value;
        if (username === 'admin' && password === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          Swal.showValidationMessage('Usuario o contraseña incorrectos');
        }
      }
    });
  }
}
