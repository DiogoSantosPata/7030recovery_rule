var sample_n = 80;
var range = 66;
var Baseline_tmp;
var Baseline = [];
var Recovery_seeds = [];
var Recovery = [];
var PropRecovery = [];
var NonRecoverers = [];
var data_tmp = [];
var data_tmp_nr = [];



function generate_data_compute_recovery(){

  Baseline_tmp = [];
  Baseline = [];
  Recovery_seeds = [];
  Recovery = [];
  PropRecovery = [];
  NonRecoverers = [];
  data_tmp = [];
  data_tmp_nr = [];



  Baseline_tmp = Array.from({length: sample_n}, () => Math.floor(Math.random() * range));




  for (i = 0; i < Baseline_tmp.length; i++) {
    if(Baseline_tmp[i]>=20){ Baseline.push( Baseline_tmp[i] ) }
  }




  for (i = 0; i < Baseline.length; i++) {
    var tmp = Math.random();
    Recovery_seeds.push(tmp);
    Recovery[i] = Math.floor( tmp * (67 - Baseline[i]) )
  }



  for (i = 0; i < Baseline.length; i++) {
    PropRecovery[i] = (Recovery[i]-Baseline[i])/(66-(Recovery[i]-Baseline[i]));
  }




  for (i = 0; i < Baseline.length; i++) {
    if( ((Baseline[i]+Recovery[i])<40)  ) {
      NonRecoverers[i] = 1;
    }
    else{
      NonRecoverers[i] = 0;
    }

  }






  data_tmp.push( ['Baseline','Recovery'] );
  for (i = 0; i < Baseline.length; i++) {
    if( NonRecoverers[i] == 0 ){
      data_tmp.push( [Baseline[i],Recovery[i]] );
    }
  }




  data_tmp_nr.push( ['Baseline','Recovery seeds'] );
  for (i = 0; i < Baseline.length; i++) {
    if( NonRecoverers[i] == 0 ){
      data_tmp_nr.push( [Baseline[i],Recovery_seeds[i]] );
    }
  }

}




function drawChart() {

  // Random data
  var data = google.visualization.arrayToDataTable(data_tmp_nr);
  var options = {
    title: 'Baseline (random) vs. Recovery seed (random)',
    hAxis: {title: 'Baseline'},
    vAxis: {title: 'Recovery seed'},
    legend: 'none'
  };

  var chart = new google.visualization.ScatterChart(document.getElementById('chart_div_random'));
  chart.draw(data, options);



  // Recovery correlation data
  var data = google.visualization.arrayToDataTable(data_tmp);
  var options = {
    title: 'Baseline vs. Recovery',
    hAxis: {title: 'Baseline', minValue: 0, maxValue: 65 } ,
    vAxis: {title: 'Computed Recovery', minValue: -10, maxValue: 45},
    legend: 'none',
  };

  var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}



function run_it_all() {
  generate_data_compute_recovery();
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);
}


run_it_all();

