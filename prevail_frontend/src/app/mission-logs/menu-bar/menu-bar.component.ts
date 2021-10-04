import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

interface Name {
  value: string;
}

interface Role {
  value: string;
}

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {
  names: Name[] = [
    {value: 'shawn'},
    {value: 'nayla'},
    {value: 'heather'},
    {value: 'eric'},
    {value: 'neil'},
    {value: 'armstrong'},
    {value: 'vader'},
    {value: 'solo'},
  ];

  roles: Role[] = [
    {value: 'Admin'},
    {value: 'Mission Control'},
    {value: 'Scientist'},
    {value: 'General'},
  ];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  })

  switchView: string = 'Timeline view';
  color: ThemePalette = 'primary';

  constructor() { }

  ngOnInit(): void {
  }

}
