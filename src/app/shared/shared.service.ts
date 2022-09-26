import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { filter, map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IGame } from "./models/game";
import { IPagination } from "./models/pagination";

/** A utility function to implement dynamic sorting. */
function dynamicSort(property) {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    /* next line works with strings and numbers, */
    var result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

@Injectable({
  providedIn: "root"
})
export class SharedService {
  // baseUrl = "https://public.connectnow.org.uk";

  constructor(private http: HttpClient) {}

  filterAndSortGames(games: IGame[], { name, minRating } = { name: null, minRating: null }, orderBy: string = null): IGame[] {
    // Apply the filters first.
    let modifiedGamesArr = games.filter(game => {
      // If name filter specified, however the game name does not contain the specified name, then the match fails.
      let nameMatch = true;
      // Case insensitive search.
      if (name && !game.name.toLowerCase().includes(name.toLowerCase())) {
        nameMatch = false;
      }
      // Case sensitive search.
      // if (name && !game.name.includes(name)) {
      //   nameMatch = false;
      // }
      // If rating filter specified, however the game rating is less than the specified number, then the match fails.
      let minRatingMatch = true;
      if (minRating && game.score < minRating) {
        minRatingMatch = false;
      }

      // if both criteria match, then this game is allowed through the filters.
      return nameMatch && minRatingMatch;
    });

    // Now apply the sort.
    if (orderBy) {
      if (orderBy === "first_release_date:asc") {
        modifiedGamesArr = modifiedGamesArr.sort(dynamicSort("first_release_date"));
      }
      if (orderBy === "first_release_date:desc") {
        modifiedGamesArr = modifiedGamesArr.sort(dynamicSort("-first_release_date"));
      }
      if (orderBy === "rating:asc") {
        modifiedGamesArr = modifiedGamesArr.sort(dynamicSort("rating"));
      }
      if (orderBy === "rating:desc") {
        modifiedGamesArr = modifiedGamesArr.sort(dynamicSort("-rating"));
      }
      if (orderBy === "name:asc") {
        modifiedGamesArr = modifiedGamesArr.sort(dynamicSort("name"));
      }
      if (orderBy === "name:desc") {
        modifiedGamesArr = modifiedGamesArr.sort(dynamicSort("-name"));
      }
    }

    return modifiedGamesArr;
  }

  /**
   * Option 1: Simple service method, used to fetch all the games in one invocation.
   * @returns
   */
  getGames(): Observable<IGame[]> {
    // If the server can whitelist the frontend URL then this is the way to go.
    // return this.http.get<IGame[]>(this.baseUrl + '/applicant-test/');
    return this.http.get(`${environment.getUrl}/applicant-test/`).pipe(
      map((games: IGame[]) => {
        return games.map(g => {
          return { ...g, first_release_date_as_date: new Date(g.first_release_date), score: Math.ceil(g.rating / 10) };
        });
      })
    );

    // Since your server does not whitelist localhost:4200, we can look at using jsonp.
    // return this.http.jsonp(this.baseUrl + '/applicant-test/', 'callback');
  }

  /**
   * Option 2: if pagination was enabled, then we could potentially take this approach.
   * We understand that these are not applicable as of now as the API probably does not support these, however if the API did support we could use them like so.
   * @param pageIndex
   * @param pageSize
   * @returns
   */
  getGamesPaginated(pageIndex, pageSize = 100): Observable<IPagination> {
    let params = new HttpParams();
    params = params.append("sort", "id:desc");
    params = params.append("pageIndex", pageIndex);
    params = params.append("pageSize", pageSize);

    return this.http
      .get<IPagination>(`${environment.getUrl}/applicant-test/`, {
        observe: "response",
        params: params
      })
      .pipe(
        // delay(1000),
        map(response => {
          return response.body;
        })
      );
  }
}
