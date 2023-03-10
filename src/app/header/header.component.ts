import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import { User } from '../shared/user.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ['a{cursor: pointer}']
})

export class HeaderComponent implements OnInit, OnDestroy {

  isAutheticated: boolean = false;
  private userSub!: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user: User): void => {
      this.isAutheticated = !user ? false : true;
      // this.isAutheticated = !!user; js trick 
    });
  }

  onSaveData(): void {
    this.dataStorageService.storeRecipes();
  }

  onFetchData(): void {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
