

// Baseline = randi(66,1,80);
var sample_n = 80;
var Baseline_tmp = Array.from({length: sample_n}, () => Math.floor(Math.random() * sample_n));

// Baseline(Baseline<20)=[];
var Baseline = [];
for (i = 0; i < Baseline_tmp.length; i++) {
  if(Baseline_tmp[i]>=20){ Baseline[i] = Baseline_tmp[i]  }
}



// for jj=1:length(Baseline)
//     Recovery(jj) = randi(67-Baseline(jj))
// end
var Recovery = [];
for (i = 0; i < Baseline.length; i++) {
  Recovery[i] = Math.floor(Math.random() * sample_n - Baseline[i])
}


// PropRecovery= (Recovery-Baseline)./(66-Recovery-Baseline);
var PropRecovery = [];
for (i = 0; i < Baseline.length; i++) {
  PropRecovery[i] = (Recovery[i]-Baseline[i])/(66-Recovery[i]-Baseline[i]);
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



//
// %Plotting part with fit
//
// figure;
//
// x=(66-Baseline(find(NonRecoverers==0)));
//
// y1= (Recovery(find(NonRecoverers==0)));
//


data_tmp = [];
data_tmp.push( ['Baseline','Recovery'] );
x = [];
y = [];
for (i = 0; i < Baseline.length; i++) {
  if( NonRecoverers[i] == 1 ){
    x.push(  66-Baseline[i]  );
    y.push(  66-Recovery[i]  );
    data_tmp.push( [66-Baseline[i],66-Recovery[i]] );

  }
}


//
google.charts.load('current', {'packages':['corechart']});
     google.charts.setOnLoadCallback(drawChart);

     function drawChart() {
       // var data = google.visualization.arrayToDataTable([
       //   ['Age', 'Weight'],
       //   [ 8,      12],
       //   [ 4,      5.5],
       //   [ 11,     14],
       //   [ 4,      5],
       //   [ 3,      3.5],
       //   [ 6.5,    7]
       // ]);
       var data = google.visualization.arrayToDataTable(data_tmp);

       var options = {
         title: 'Baseline vs. Recovery',
         hAxis: {title: 'Baseline', minValue: 0, maxValue: 100},
         vAxis: {title: 'Recovery', minValue: 0, maxValue: 100},
         legend: 'none'
       };

       var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));

       chart.draw(data, options);
     }

// scatter(x,y1,'b','*')
//
// P = polyfit(x,y1,1);
//
// slope = P(1)
//
// intercept = P(2)
//
// yfit = P(1)*x+P(2);  % P(1) is the slope and P(2) is the intercept
//
// hold on;
//
// plot(x,yfit,'r-.')
//
// hold on; plot((66-Baseline(find(NonRecoverers))), (Recovery(find(NonRecoverers))), 'or')
//
// text(10,30,num2str(slope))
