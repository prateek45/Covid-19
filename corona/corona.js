const url ='https://covid19.mathdro.id/api';
const url2 ='https://covid19.mathdro.id/api/countries';
const ctx = document.getElementById('chart').getContext('2d');
const xlabels =['Total Confirmed','Active Cases','Cured','Deaths'];
var count=0;

var charts;

//scroll button
topbutton = document.getElementById("top");
window.onscroll = function(){
    if(document.body.scrollTop >10 || document.documentElement.scrollTop > 10){
        topbutton.style.display = "block";
    }
    else{
        topbutton.style.display = "none";
    }

};

function gototop(){
    document.body.scrollTop = 0;//for safari
    document.documentElement.scrollTop = 0;//for other browsers
};





// getting data

getdata();

async function getdata(){
    var response= await fetch(url);
    var response2 = await fetch(url2);
    var data = await response.json();
    var data2= await response2.json();
    // var country = data2.countries;
    // country.foreach(myfunction);
    // function myfunction(value){
    //     console.log(value.name);
    // }
    function listname(countries){
        for(let i=0;i<countries.length;i++)
        {
            optiontext = countries[i].name;
            optionvalue = countries[i].iso3;
            $('#countries_options').append( $("<option></option>").attr("value",optionvalue).text(optiontext));
        }
    }
    listname(data2.countries);

    console.log(data);
    const {confirmed, deaths, recovered} = data;
    $('#total').each(function() {
        countTo = confirmed.value;
        $({ countNum: 0}).animate({countNum: countTo},  
        { 
          duration: 2000,
          easing:'linear',
          step: function() {
            $('#total').text(Math.floor(this.countNum));
        },
        complete: function() {
            $('#total').text(this.countNum);
            console.log('hi');
            //alert('finished');
        }
      });  
    });
    $('#active').each(function() {
        countTo = confirmed.value-recovered.value-deaths.value;
        $({ countNum: 0}).animate({countNum: countTo},  
        { 
          duration: 2000,
          easing:'linear',
          step: function() {
            $('#active').text(Math.floor(this.countNum));
        },
        complete: function() {
            $('#active').text(this.countNum);
            console.log('hi');
            //alert('finished');
        }
      });  
    });
    $('#cured').each(function() {
        countTo = recovered.value;
        $({ countNum: 0}).animate({countNum: countTo},  
        { 
          duration: 2000,
          easing:'linear',
          step: function() {
            $('#cured').text(Math.floor(this.countNum));
        },
        complete: function() {
            $('#cured').text(this.countNum);
            console.log('hi');
            //alert('finished');
        }
      });  
    });
    $('#death').each(function() {
        countTo = deaths.value;
        $({ countNum: 0}).animate({countNum: countTo},  
        { 
          duration: 2000,
          easing:'linear',
          step: function() {
            $('#death').text(Math.floor(this.countNum));
        },
        complete: function() {
            $('#death').text(this.countNum);
            console.log('hi');
            //alert('finished');
        }
      });  
    });
}


// select option 
$("select#countries_options").change(function(){
    console.log("hithere");
    var selectedCountry = $(this).children("option:selected").text();
    $.getJSON(url2+"/"+selectedCountry, function(data3) {
    
    var confirmed1 = data3.confirmed.value;
    var deaths1 = data3.deaths.value;
    var cured1 =data3.recovered.value;
    var active1 = confirmed1-deaths1-cured1;
    var mydata=[confirmed1,active1,cured1,deaths1];
    var i=0;
    if (count === 0){
        charts= charit(mydata);
    } else{
        do{
            charts.data.datasets.forEach((dataset) => {
            dataset.data.pop();            
            });
            charts.update();
            i++;
        }while(i<4)

        charts.data.datasets.forEach((dataset) => {
            mydata.forEach(myfunc);
            function myfunc(value){
                dataset.data.push(value);
            }
        });
        charts.update();
    }
    console.log(charts);
    

    $('#totalc').each(function() {
        countTo = confirmed1;
        $({ countNum: 0}).animate({countNum: countTo},  
        { 
          duration: 2000,
          easing:'linear',
          step: function() {
            $('#totalc').text(Math.floor(this.countNum));
        },
        complete: function() {
            $('#totalc').text(this.countNum);
            console.log('hi');
            //alert('finished');
        }
      });  
    });
    $('#activec').each(function() {
        countTo = active1;
        $({ countNum: 0}).animate({countNum: countTo},  
        { 
          duration: 2000,
          easing:'linear',
          step: function() {
            $('#activec').text(Math.floor(this.countNum));
        },
        complete: function() {
            $('#activec').text(this.countNum);
            console.log('hi');
            //alert('finished');
        }
      });  
    });
    $('#curedc').each(function() {
        countTo = cured1;
        $({ countNum: 0}).animate({countNum: countTo},  
        { 
          duration: 2000,
          easing:'linear',
          step: function() {
            $('#curedc').text(Math.floor(this.countNum));
        },
        complete: function() {
            $('#curedc').text(this.countNum);
            console.log('hi');
            //alert('finished');
        }
      });  
    });
    $('#deathsc').each(function() {
        countTo = deaths1;
        $({ countNum: 0}).animate({countNum: countTo},  
        { 
          duration: 2000,
          easing:'linear',
          step: function() {
            $('#deathsc').text(Math.floor(this.countNum));
        },
        complete: function() {
            $('#deathsc').text(this.countNum);
            console.log('hi');
            //alert('finished');
        }
      });  
    });
    });
});
    // ///charts//////


    function charit(mydata){
        count = 1;
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: xlabels,
                datasets: [{
                    label: 'Covid-19 Data',
                    data: mydata,
                    backgroundColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 99, 132, 1)',                  
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 99, 132, 1)',
                    ],
                    borderWidth: 1
                }]
                
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                        },
                    }],
                    xAxes: [{
                        gridLines: {
                             display:false,
                             
                        },
                        ticks: {
                            autoSkip: false,
                            
                        }

                    }]
                }
            }
        });
     return myChart;
    }
    

// blocks editing

function about(){
    $('#about').show();
    $('#contact').hide();
    $('#countriesdata').hide();

}
function contact(){
    $('#about').hide();
    $('#contact').show();
    $('#countriesdata').hide();
    
}
function countriesdata(){
    $('#about').hide();
    $('#contact').hide();
    $('#countriesdata').show();
    
}

//graph-chart
