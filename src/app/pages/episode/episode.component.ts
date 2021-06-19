import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { EpisodeObject } from 'src/app/models/episode';
import { EpisodesService } from 'src/app/services/episodes.service';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css'],
})
export class EpisodeComponent implements OnInit {
  private episodes: EpisodeObject;

  constructor(
    public auth: AuthService,
    private episodesService: EpisodesService
  ) {
    this.getAllEpisodes();
  }

  ngOnInit(): void {}

  getAllEpisodes() {
    this.episodesService.getEpisodes().subscribe(
      (data) => {
        this.episodes = data.results;
      },
      (err) => {
        console.log('Se produjo error: ' + err);
      }
    );
  }
}
