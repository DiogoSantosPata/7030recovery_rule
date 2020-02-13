

// Baseline = randi(66,1,80);
var sample_n = 80;
var range = 66;
var Baseline_tmp = Array.from({length: sample_n}, () => Math.floor(Math.random() * range));

// Baseline(Baseline<20)=[];
var Baseline = [];
for (i = 0; i < Baseline_tmp.length; i++) {
  if(Baseline_tmp[i]>=20){ Baseline.push( Baseline_tmp[i] ) }
}


var Recovery_seeds = [];
var Recovery = [];
for (i = 0; i < Baseline.length; i++) {
  var tmp = Math.random();
  Recovery_seeds.push(tmp);
  Recovery[i] = Math.floor( tmp * (67 - Baseline[i]) )
}


// PropRecovery= (Recovery-Baseline)./(66-Recovery-Baseline);
var PropRecovery = [];
for (i = 0; i < Baseline.length; i++) {
  PropRecovery[i] = (Recovery[i]-Baseline[i])/(66-(Recovery[i]-Baseline[i]));
}



// NonRecoverers = ((Baseline+Recovery)<40);
var NonRecoverers = [];
for (i = 0; i < Baseline.length; i++) {
  if( ((Baseline[i]+Recovery[i])<40)  ) {
    NonRecoverers[i] = 1;
  }
  else{
    NonRecoverers[i] = 0;
  }

}



data_tmp = [];
data_tmp.push( ['Baseline','Recovery'] );
x = [];
y = [];
for (i = 0; i < Baseline.length; i++) {
  if( NonRecoverers[i] == 0 ){
    data_tmp.push( [66-Baseline[i],Recovery[i]] );
    x.push(66-Baseline[i]);
    y.push(Recovery[i]);
  }
}



data_tmp_nr = [];
data_tmp_nr.push( ['Baseline','Recovery seeds'] );
for (i = 0; i < Baseline.length; i++) {
  if( NonRecoverers[i] == 0 ){
    data_tmp_nr.push( [Baseline[i],Recovery_seeds[i]] );
  }
}


google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

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

