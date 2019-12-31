import { Component, OnInit, AfterContentInit } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { AppService } from '../app.service';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd } from '@angular/router';

declare const $: any;
declare const Morris: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterContentInit {

  public myDatePickerOptions: IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'yyyy-mm-dd',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    inline: false
  };

  public projects = [];
  public clients = [];
  public invoices = [];
  public payments = [];

  // Initialized to specific date (09.10.2018).
  public model: any = { date: { year: 2018, month: 10, day: 9 } };
  public dash: any = { 'employees': 218 , 'payroll': 44, 'present': 37, 'leave': 112};

  constructor(private appService: AppService, private router: Router) {
    this.projects = appService.projects;
    this.clients = appService.clients;
    this.invoices = appService.invoices;
    this.payments = appService.payments;
  }

  ngAfterContentInit() {

  }

  ngOnInit() {

    var pro_heights = $(".panel-eqHeight-clients").map(function () {
      return $(this).height();
    }).get(),
      pro_maxHeight = Math.max.apply(null, pro_heights);
    $(".panel-eqHeight-projects").height(pro_maxHeight);
    $(".panel-eqHeight-clients").height(pro_maxHeight);

    var pay_heights = $(".panel-eqHeight-invoices").map(function () {
      return $(this).height();
    }).get(),
      pay_maxHeight = Math.max.apply(null, pay_heights);
    $(".panel-eqHeight-payments").height(pay_maxHeight);
    $(".panel-eqHeight-invoices").height(pay_maxHeight);
  
    //  Department wise employee count
    
    Morris.Bar({
      element: 'department-wise-count',
      data: [
        { y: 'Support', a: 100 },
        { y: 'Sales', a: 75 },
        { y: 'R&D', a: 50 },
        { y: 'IT', a: 75 },
        { y: 'Production', a: 50 },
        { y: 'Marketing', a: 75 },
        { y: 'Hr', a: 100 }
      ],
      xkey: 'y',
      ykeys: ['a'],
      labels: ['Number of Employees'],
      lineColors: ['#ff9b44'],
      lineWidth: '3px',
      barColors: ['#ff9b44'],
      resize: true,
      redraw: true,
      xLabelMargin : 1,
      xLabelAngle: 60
    });
    
    // sex ratio
    
    Morris.Donut({
      element: 'sex-ratio',
      data: [
        {value: 70, label: 'Male'},
        {value: 15, label: 'Female'},
      ],
      formatter: function (x) { return x + "%"},
      resize: true,
      redraw: true
    }).on('click', function(i, row){
      console.log(i, row);
    });

  }

}
