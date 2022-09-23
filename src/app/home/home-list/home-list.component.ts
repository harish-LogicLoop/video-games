import { Component, OnInit } from "@angular/core";
import { IGame } from "src/app/shared/models/game";
import { ToastrService } from "ngx-toastr";
import { SharedService } from "src/app/shared/shared.service";
import { BusyService } from "src/app/shared/busy.service";

@Component({
  selector: "app-home-list",
  templateUrl: "./home-list.component.html",
  styleUrls: ["./home-list.component.css"]
})
export class HomeListComponent implements OnInit {
  games: IGame[];
  modifiedGames: IGame[];

  filterObject: {
    name: string;
    minRating: number;
    orderBy: string;
  };

  constructor(private sharedService: SharedService, private toastr: ToastrService, private busyService: BusyService) {
  }

  ngOnInit(): void {
    this.filterObject = {
      name: "",
      minRating: null,
      orderBy: ""
    };
    this.busyService.busy();
    this.sharedService.getGames().subscribe({
      next: games => {
        this.games = games;
        this.modifiedGames = this.sharedService.filterAndSortGames(games);
        this.busyService.idle();
      },
      error: error => {
        // TODO: Toastr
        console.log(error);
        this.busyService.idle();

        this.toastr.error(error.message);
      }
    });
  }

  doFilter(): void {
    this.modifiedGames = this.sharedService.filterAndSortGames(
      this.games,
      { name: this.filterObject.name, minRating: this.filterObject.minRating },
      this.filterObject.orderBy
    );
  }

  clearFilters(): void {
    this.filterObject = {
      name: "",
      minRating: null,
      orderBy: ""
    };
    this.doFilter();
  }
}
