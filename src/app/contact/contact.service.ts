import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { IGame } from "../shared/models/game";

@Injectable({
  providedIn: "root"
})
export class ContactService {
  constructor(private http: HttpClient) {}

  /**
   * Option 1: Simple service method, used to fetch all the games in one invocation.
   * @returns
   */
  postContactForm(data): Observable<Object> {
    // If the server can whitelist the frontend URL then this is the way to go.
    // return this.http.get<IGame[]>(this.baseUrl + '/applicant-test');
    return this.http.post(environment.postUrl, data);

    // Since your server does not whitelist localhost:4200, we can look at using jsonp.
    // return this.http.jsonp(this.baseUrl + '/applicant-test', 'callback');
  }
}
