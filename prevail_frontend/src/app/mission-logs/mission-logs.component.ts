import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Data2Service } from '../services/data2.service';
import { LogDataSource } from './log-data-source';
import { CookieService } from '../services//cookie.service';

@Component({
  selector: 'app-mission-logs',
  templateUrl: './mission-logs.component.html',
  styleUrls: ['./mission-logs.component.scss']
})
export class MissionLogsComponent implements OnInit {
  displayedColumns: string[] = ['Mission', 'Activity', 'Entries', 'Users', 'Date and Author'];
  dataSource: LogDataSource = <any>[];

  constructor(
    private data: DataService,
    private data2: Data2Service,
    private ls: CookieService
  ) { }

  ngOnInit(): void {
    this.dataSource = new LogDataSource(this.data);
    this.dataSource.getLogs();

    console.log(this.dataSource)
  }

  join_mission(uuid: string) {
    this.data2.join_mission(uuid).subscribe(async (data: any) => {
      this.dataSource.getLogs();
    }, error => {console.log(error)});
  }

  create_mission(description: string, tags: string) {
    this.data2.create_mission(description, tags).subscribe(async (data: any) => {
      this.dataSource.getLogs();
    }, error => {console.log(error)});
  }

  async log_out() {
    await this.ls.remove('token')
    await this.ls.remove('username')
    location.reload()
  }
}
