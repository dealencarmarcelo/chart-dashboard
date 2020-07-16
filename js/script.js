var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, dataService) {
    $scope.data = dataService;
    
    $scope.countries = [];
    $scope.causes = [];
    $scope.genders = [];
    $scope.months = ['JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL']
    
    prepareFilters();
    
    $scope.addFilter = function(key, value) {
        $scope.filters[key] = value;
        setFilters();
    };
    
    function prepareFilters() {
        angular.forEach($scope.data, function(values, key) {
            if($scope.countries.indexOf(values.country) == -1) {
                $scope.countries.push(values.country)
            }
            if($scope.causes.indexOf(values.cause) == -1) {
                $scope.causes.push(values.cause)
            }
            if($scope.genders.indexOf(values.gender) == -1) {
                $scope.genders.push(values.gender)
            }
        });
        
        $scope.selectedCountry = $scope.countries[0];
        $scope.selectedCause = $scope.causes[0];
        $scope.selectedGender = $scope.genders[0];

        $scope.filters = {country: $scope.selectedCountry, cause: $scope.selectedCause, gender: $scope.selectedGender}

        setFilters();
    }

    function setFilters() {
        $scope.chartData = []
        var hash = {}

        angular.forEach($scope.months, function(month) {
            hash[month] = 0;
        });

        angular.forEach($scope.data, function(values) {
            if (values.country == $scope.selectedCountry && values.cause == $scope.selectedCause && values.gender == $scope.selectedGender) {
                hash[values.month] += values.deaths;
            }
        });

        angular.forEach($scope.months, function(month) {
            $scope.chartData.push(hash[month])
        });

        setChart();
    };

    function setChart() {
        if ($scope.myChart) {$scope.myChart.destroy();}
        var ctx = document.getElementById("myChart");
        var data = {
            labels: ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL"],
            datasets: [
                {
                    backgroundColor: "#46D6F9",
                    data: $scope.chartData
                },
            ]
        }

        $scope.myChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                title: {
                    display: true,
                    text: 'Gráfico de Mortes/Causa/Gênero por País'
                },
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        barThickness: 50,
                        maxBarThickness: 60
                    }]
                },
                tooltips: {
                    callbacks: {
                      title: (items, data) => data.datasets[items[0].datasetIndex].data[items[0].index] + ' mortes',
                      label: (item, data) => data.labels[item.index]
                    }
                }
            }
        });
    }

    
});

app.service('dataService', function(){
    data = [
        { "country": "BRASIL", "deaths": 52, "month": "JANEIRO", "gender": "FEMININO", "cause": "COVID-19" },
        { "country": "BRASIL", "deaths": 89, "month": "JANEIRO", "gender": "MASCULINO", "cause": "COVID-19" },
        { "country": "BRASIL", "deaths": 77, "month": "JANEIRO", "gender": "MASCULINO", "cause": "CÂNCER" },
        { "country": "BRASIL", "deaths": 89, "month": "ABRIL", "gender": "MASCULINO", "cause": "CÂNCER" },
        { "country": "BRASIL", "deaths": 86, "month": "ABRIL", "gender": "MASCULINO", "cause": "COVID-19" },
        { "country": "BRASIL", "deaths": 59, "month": "ABRIL", "gender": "MASCULINO", "cause": "COVID-19" },
        { "country": "BRASIL", "deaths": 32, "month": "ABRIL", "gender": "MASCULINO", "cause": "COVID-19" },
        { "country": "BRASIL", "deaths": 96, "month": "ABRIL", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "BRASIL", "deaths": 95, "month": "JANEIRO", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "BRASIL", "deaths": 55, "month": "JANEIRO", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "BRASIL", "deaths": 78, "month": "JANEIRO", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "BRASIL", "deaths": 64, "month": "JANEIRO", "gender": "MASCULINO", "cause": "INFARTO" },
        { "country": "BRASIL", "deaths": 83, "month": "JANEIRO", "gender": "MASCULINO", "cause": "INFARTO" },
        { "country": "BRASIL", "deaths": 77, "month": "JANEIRO", "gender": "MASCULINO", "cause": "INFARTO" },
        { "country": "BRASIL", "deaths": 5, "month": "JANEIRO", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "BRASIL", "deaths": 69, "month": "JANEIRO", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "BRASIL", "deaths": 9, "month": "FEVEREIRO", "gender": "MASCULINO", "cause": "COVID-19" },
        { "country": "BRASIL", "deaths": 95, "month": "FEVEREIRO", "gender": "MASCULINO", "cause": "COVID-19" },
        { "country": "BRASIL", "deaths": 88, "month": "FEVEREIRO", "gender": "MASCULINO", "cause": "COVID-19" },
        { "country": "BRASIL", "deaths": 36, "month": "FEVEREIRO", "gender": "FEMININO", "cause": "COVID-19" },
        { "country": "BRASIL", "deaths": 25, "month": "FEVEREIRO", "gender": "FEMININO", "cause": "CÂNCER" },
        { "country": "BRASIL", "deaths": 0, "month": "FEVEREIRO", "gender": "FEMININO", "cause": "CÂNCER" },
        { "country": "BRASIL", "deaths": 87, "month": "FEVEREIRO", "gender": "FEMININO", "cause": "CÂNCER" },
        { "country": "BRASIL", "deaths": 68, "month": "FEVEREIRO", "gender": "FEMININO", "cause": "CÂNCER" },
        { "country": "BRASIL", "deaths": 99, "month": "FEVEREIRO", "gender": "FEMININO", "cause": "CÂNCER" },
        { "country": "BRASIL", "deaths": 62, "month": "FEVEREIRO", "gender": "MASCULINO", "cause": "CÂNCER" },
        { "country": "BRASIL", "deaths": 54, "month": "FEVEREIRO", "gender": "MASCULINO", "cause": "CÂNCER" },
        { "country": "BRASIL", "deaths": 49, "month": "FEVEREIRO", "gender": "MASCULINO", "cause": "CÂNCER" },
        { "country": "BRASIL", "deaths": 73, "month": "FEVEREIRO", "gender": "MASCULINO", "cause": "CÂNCER" },
        { "country": "BRASIL", "deaths": 35, "month": "FEVEREIRO", "gender": "MASCULINO", "cause": "COVID-19" },
        { "country": "BRASIL", "deaths": 51, "month": "FEVEREIRO", "gender": "MASCULINO", "cause": "COVID-19" },
        { "country": "BRASIL", "deaths": 51, "month": "MARÇO", "gender": "MASCULINO", "cause": "COVID-19" },
        { "country": "BRASIL", "deaths": 77, "month": "MARÇO", "gender": "FEMININO", "cause": "COVID-19" },
        { "country": "BRASIL", "deaths": 99, "month": "MARÇO", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "BRASIL", "deaths": 56, "month": "MARÇO", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "BRASIL", "deaths": 84, "month": "MARÇO", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "BRASIL", "deaths": 14, "month": "MARÇO", "gender": "FEMININO", "cause": "COVID-19" },
        { "country": "BRASIL", "deaths": 65, "month": "MARÇO", "gender": "FEMININO", "cause": "COVID-19" },
        { "country": "BRASIL", "deaths": 87, "month": "MARÇO", "gender": "FEMININO", "cause": "COVID-19" },
        { "country": "BRASIL", "deaths": 3, "month": "MARÇO", "gender": "MASCULINO", "cause": "COVID-19" },
        { "country": "BRASIL", "deaths": 21, "month": "MARÇO", "gender": "MASCULINO", "cause": "CÂNCER" },
        { "country": "ALEMANHA", "deaths": 58, "month": "MARÇO", "gender": "MASCULINO", "cause": "CÂNCER" },
        { "country": "ALEMANHA", "deaths": 40, "month": "MARÇO", "gender": "MASCULINO", "cause": "CÂNCER" },
        { "country": "ALEMANHA", "deaths": 25, "month": "MARÇO", "gender": "MASCULINO", "cause": "CÂNCER" },
        { "country": "ALEMANHA", "deaths": 54, "month": "MARÇO", "gender": "MASCULINO", "cause": "INFARTO" },
        { "country": "ALEMANHA", "deaths": 63, "month": "MARÇO", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "ALEMANHA", "deaths": 12, "month": "MARÇO", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "ALEMANHA", "deaths": 45, "month": "MARÇO", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "ALEMANHA", "deaths": 78, "month": "MARÇO", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "ALEMANHA", "deaths": 33, "month": "MARÇO", "gender": "FEMININO", "cause": "CÂNCER" },
        { "country": "ALEMANHA", "deaths": 94, "month": "MARÇO", "gender": "FEMININO", "cause": "CÂNCER" },
        { "country": "ALEMANHA", "deaths": 26, "month": "MARÇO", "gender": "MASCULINO", "cause": "CÂNCER" },
        { "country": "ALEMANHA", "deaths": 45, "month": "MARÇO", "gender": "MASCULINO", "cause": "CÂNCER" },
        { "country": "ALEMANHA", "deaths": 69, "month": "MARÇO", "gender": "MASCULINO", "cause": "CÂNCER" },
        { "country": "ALEMANHA", "deaths": 75, "month": "MARÇO", "gender": "FEMININO", "cause": "CÂNCER" },
        { "country": "ALEMANHA", "deaths": 84, "month": "MARÇO", "gender": "FEMININO", "cause": "CÂNCER" },
        { "country": "ALEMANHA", "deaths": 95, "month": "MARÇO", "gender": "FEMININO", "cause": "COVID-19" },
        { "country": "ALEMANHA", "deaths": 85, "month": "MARÇO", "gender": "FEMININO", "cause": "COVID-19" },
        { "country": "ALEMANHA", "deaths": 94, "month": "MARÇO", "gender": "FEMININO", "cause": "COVID-19" },
        { "country": "ALEMANHA", "deaths": 44, "month": "MARÇO", "gender": "FEMININO", "cause": "COVID-19" },
        { "country": "ALEMANHA", "deaths": 4, "month": "MARÇO", "gender": "MASCULINO", "cause": "COVID-19" },
        { "country": "ALEMANHA", "deaths": 77, "month": "MARÇO", "gender": "MASCULINO", "cause": "COVID-19" },
        { "country": "ALEMANHA", "deaths": 92, "month": "MARÇO", "gender": "MASCULINO", "cause": "COVID-19" },
        { "country": "ALEMANHA", "deaths": 72, "month": "ABRIL", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "ALEMANHA", "deaths": 36, "month": "ABRIL", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "ALEMANHA", "deaths": 48, "month": "ABRIL", "gender": "MASCULINO", "cause": "COVID-19" },
        { "country": "ALEMANHA", "deaths": 46, "month": "ABRIL", "gender": "MASCULINO", "cause": "COVID-19" },
        { "country": "ALEMANHA", "deaths": 58, "month": "ABRIL", "gender": "MASCULINO", "cause": "CÂNCER" },
        { "country": "ALEMANHA", "deaths": 92, "month": "ABRIL", "gender": "MASCULINO", "cause": "CÂNCER" },
        { "country": "ALEMANHA", "deaths": 26, "month": "ABRIL", "gender": "MASCULINO", "cause": "CÂNCER" },
        { "country": "ALEMANHA", "deaths": 92, "month": "ABRIL", "gender": "MASCULINO", "cause": "CÂNCER" },
        { "country": "ALEMANHA", "deaths": 45, "month": "ABRIL", "gender": "MASCULINO", "cause": "CÂNCER" },
        { "country": "ALEMANHA", "deaths": 23, "month": "ABRIL", "gender": "FEMININO", "cause": "CÂNCER" },
        { "country": "ALEMANHA", "deaths": 99, "month": "ABRIL", "gender": "FEMININO", "cause": "CÂNCER" },
        { "country": "ALEMANHA", "deaths": 51, "month": "ABRIL", "gender": "FEMININO", "cause": "CÂNCER" },
        { "country": "ALEMANHA", "deaths": 71, "month": "ABRIL", "gender": "MASCULINO", "cause": "INFARTO" },
        { "country": "ALEMANHA", "deaths": 6, "month": "ABRIL", "gender": "MASCULINO", "cause": "INFARTO" },
        { "country": "ALEMANHA", "deaths": 47, "month": "ABRIL", "gender": "MASCULINO", "cause": "INFARTO" },
        { "country": "ALEMANHA", "deaths": 60, "month": "ABRIL", "gender": "MASCULINO", "cause": "INFARTO" },
        { "country": "ALEMANHA", "deaths": 78, "month": "ABRIL", "gender": "MASCULINO", "cause": "INFARTO" },
        { "country": "ALEMANHA", "deaths": 57, "month": "ABRIL", "gender": "MASCULINO", "cause": "INFARTO" },
        { "country": "ALEMANHA", "deaths": 61, "month": "ABRIL", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "ALEMANHA", "deaths": 94, "month": "ABRIL", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "ALEMANHA", "deaths": 24, "month": "ABRIL", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "ALEMANHA", "deaths": 39, "month": "ABRIL", "gender": "FEMININO", "cause": "CÂNCER" },
        { "country": "ALEMANHA", "deaths": 25, "month": "ABRIL", "gender": "MASCULINO", "cause": "CÂNCER" },
        { "country": "ALEMANHA", "deaths": 38, "month": "ABRIL", "gender": "MASCULINO", "cause": "CÂNCER" },
        { "country": "ALEMANHA", "deaths": 69, "month": "ABRIL", "gender": "MASCULINO", "cause": "CÂNCER" },
        { "country": "ALEMANHA", "deaths": 83, "month": "ABRIL", "gender": "MASCULINO", "cause": "CÂNCER" },
        { "country": "ALEMANHA", "deaths": 86, "month": "ABRIL", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "ALEMANHA", "deaths": 63, "month": "ABRIL", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "EUA", "deaths": 38, "month": "ABRIL", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "EUA", "deaths": 27, "month": "ABRIL", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "EUA", "deaths": 49, "month": "ABRIL", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "EUA", "deaths": 81, "month": "ABRIL", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "EUA", "deaths": 85, "month": "ABRIL", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "EUA", "deaths": 45, "month": "JANEIRO", "gender": "MASCULINO", "cause": "INFARTO" },
        { "country": "EUA", "deaths": 89, "month": "JANEIRO", "gender": "MASCULINO", "cause": "INFARTO" },
        { "country": "EUA", "deaths": 57, "month": "JANEIRO", "gender": "MASCULINO", "cause": "INFARTO" },
        { "country": "EUA", "deaths": 45, "month": "JANEIRO", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "EUA", "deaths": 34, "month": "JANEIRO", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "EUA", "deaths": 61, "month": "JANEIRO", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "EUA", "deaths": 33, "month": "JANEIRO", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "EUA", "deaths": 5, "month": "ABRIL", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "EUA", "deaths": 53, "month": "ABRIL", "gender": "MASCULINO", "cause": "INFARTO" },
        { "country": "EUA", "deaths": 13, "month": "ABRIL", "gender": "MASCULINO", "cause": "INFARTO" },
        { "country": "EUA", "deaths": 40, "month": "ABRIL", "gender": "MASCULINO", "cause": "INFARTO" },
        { "country": "EUA", "deaths": 21, "month": "ABRIL", "gender": "MASCULINO", "cause": "INFARTO" },
        { "country": "EUA", "deaths": 38, "month": "ABRIL", "gender": "FEMININO", "cause": "CÂNCER" },
        { "country": "EUA", "deaths": 41, "month": "ABRIL", "gender": "FEMININO", "cause": "CÂNCER" },
        { "country": "EUA", "deaths": 62, "month": "ABRIL", "gender": "FEMININO", "cause": "CÂNCER" },
        { "country": "EUA", "deaths": 14, "month": "ABRIL", "gender": "FEMININO", "cause": "CÂNCER" },
        { "country": "EUA", "deaths": 31, "month": "ABRIL", "gender": "FEMININO", "cause": "CÂNCER" },
        { "country": "EUA", "deaths": 8, "month": "ABRIL", "gender": "MASCULINO", "cause": "CÂNCER" },
        { "country": "EUA", "deaths": 73, "month": "ABRIL", "gender": "MASCULINO", "cause": "CÂNCER" },
        { "country": "EUA", "deaths": 13, "month": "FEVEREIRO", "gender": "MASCULINO", "cause": "CÂNCER" },
        { "country": "EUA", "deaths": 48, "month": "FEVEREIRO", "gender": "MASCULINO", "cause": "CÂNCER" },
        { "country": "EUA", "deaths": 85, "month": "FEVEREIRO", "gender": "MASCULINO", "cause": "CÂNCER" },
        { "country": "EUA", "deaths": 32, "month": "FEVEREIRO", "gender": "MASCULINO", "cause": "CÂNCER" },
        { "country": "EUA", "deaths": 15, "month": "FEVEREIRO", "gender": "FEMININO", "cause": "CÂNCER" },
        { "country": "EUA", "deaths": 32, "month": "FEVEREIRO", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "EUA", "deaths": 13, "month": "FEVEREIRO", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "EUA", "deaths": 43, "month": "FEVEREIRO", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "EUA", "deaths": 69, "month": "FEVEREIRO", "gender": "MASCULINO", "cause": "INFARTO" },
        { "country": "EUA", "deaths": 48, "month": "MARÇO", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "EUA", "deaths": 7, "month": "MARÇO", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "EUA", "deaths": 82, "month": "MARÇO", "gender": "FEMININO", "cause": "COVID-19" },
        { "country": "EUA", "deaths": 17, "month": "MARÇO", "gender": "FEMININO", "cause": "COVID-19" },
        { "country": "EUA", "deaths": 84, "month": "MARÇO", "gender": "FEMININO", "cause": "COVID-19" },
        { "country": "EUA", "deaths": 82, "month": "MARÇO", "gender": "FEMININO", "cause": "COVID-19" },
        { "country": "EUA", "deaths": 15, "month": "MARÇO", "gender": "MASCULINO", "cause": "COVID-19" },
        { "country": "EUA", "deaths": 16, "month": "MARÇO", "gender": "MASCULINO", "cause": "COVID-19" },
        { "country": "EUA", "deaths": 17, "month": "MARÇO", "gender": "MASCULINO", "cause": "COVID-19" },
        { "country": "EUA", "deaths": 82, "month": "MARÇO", "gender": "MASCULINO", "cause": "COVID-19" },
        { "country": "EUA", "deaths": 84, "month": "MARÇO", "gender": "MASCULINO", "cause": "COVID-19" },
        { "country": "EUA", "deaths": 48, "month": "MARÇO", "gender": "FEMININO", "cause": "COVID-19" },
        { "country": "EUA", "deaths": 64, "month": "MARÇO", "gender": "FEMININO", "cause": "COVID-19" },
        { "country": "EUA", "deaths": 43, "month": "MARÇO", "gender": "FEMININO", "cause": "COVID-19" },
        { "country": "EUA", "deaths": 54, "month": "MARÇO", "gender": "MASCULINO", "cause": "COVID-19" },
        { "country": "EUA", "deaths": 82, "month": "MARÇO", "gender": "FEMININO", "cause": "COVID-19" },
        { "country": "EUA", "deaths": 19, "month": "MARÇO", "gender": "FEMININO", "cause": "COVID-19" },
        { "country": "EUA", "deaths": 89, "month": "MARÇO", "gender": "MASCULINO", "cause": "COVID-19" },
        { "country": "EUA", "deaths": 89, "month": "MARÇO", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "EUA", "deaths": 73, "month": "MARÇO", "gender": "MASCULINO", "cause": "INFARTO" },
        { "country": "EUA", "deaths": 53, "month": "MARÇO", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "EUA", "deaths": 96, "month": "MARÇO", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "EUA", "deaths": 52, "month": "MARÇO", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "EUA", "deaths": 59, "month": "MARÇO", "gender": "FEMININO", "cause": "CÂNCER" },
        { "country": "EUA", "deaths": 24, "month": "MARÇO", "gender": "FEMININO", "cause": "INFARTO" },
        { "country": "EUA", "deaths": 43, "month": "MARÇO", "gender": "FEMININO", "cause": "INFARTO" }
       ]

    return data;
})