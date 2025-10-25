import { Injectable } from "@angular/core";
import { CanActivate,Router } from "@angular/router";
import { WeCareService } from "./we-care-services.service";

@Injectable({
  providedIn: "root"
})
export class LoginGuardService implements CanActivate {
  constructor(private service: WeCareService, private router: Router) { }
  canActivate(): boolean {
    if (this.service.isUserLoggedIn()) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}
