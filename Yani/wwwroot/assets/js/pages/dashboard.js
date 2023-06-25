function timeElapsedString(timeElapsed) {
    var seconds = Math.floor(timeElapsed);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);

    if (days > 0) {
        return days + " روز پیش";
    } else if (hours > 0) {
        return hours + " ساعت پیش";
    } else if (minutes > 0) {
        return minutes + " دقیقه پیش";
    } else {
        return seconds + " ثانیه پیش";
    }
}

function drawDailyVisitChart(data) {
    var labels = data.map(function (item) { return item.day; });
    var series = data.map(function (item) { return item.visits; });
    new Chartist.Line('#dailyVisitChart', {
        labels: labels,
        series: [series]
    }, {
        low: 0,
        showArea: true
    });
}

function drawMonthlySales(data) {
    var labels = data.map(function (item) { return item.month; });
    var series = data.map(function (item) { return item.totalCost; });
    new Chartist.Bar('#monthlySales', {
        labels: labels,
        series: [series]
    }, {
        stackBars: true,
        seriesBarDistance: 10,
        reverseData: true,
        horizontalBars: true,
        axisY: {
            offset: 70
        },
        axisX: {
            offset: 70,
            labelInterpolationFnc: function (value) {
                if (value >= 1000000000) {
                    return (value / 1000000000) + ' میلیارد';
                } else if (value >= 1000000) {
                    return (value / 1000000) + ' میلیون';
                } else if (value >= 1000) {
                    return (value / 1000) + ' هزار';
                } else {
                    return value;
                }
            }
        }
    });
}

function updateProductList() {
    $.ajax({
        url: '/dashboard/getPendingOrders',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            // get the container element for the product list
            var container = $('.product-div');
            // clear the previous content of the container
            container.empty();

            // iterate over the data and append each product to the container
            $.each(data, function (index, item) {
                // create a new product element and append it to the container
                var productElement = $('<div class="d-flex align-items-center mb-30">\
                                <div class="me-15 bg-lightest h-50 w-50 l-h-50 rounded text-center">\
                                    <img src="' + item.productImageUrl + '" class="h-30" alt="">\
                                </div>\
                                <div class="d-flex flex-column flex-grow-1 me-2 fw-500">\
                                    <a href="#" class="text-dark hover-primary mb-0 fs-16">' + item.userName + '</a>\
                                    <span class="text-fade fs-12">' + timeElapsedString(item.timeElapsed) + '</span>\
                                </div>\
                                <span class="badge badge badge-danger-light"><span class="fw-600">' + item.totalPrice / 10 + ' تومان</span></span>\
                            </div>');
                container.append(productElement);
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(textStatus, errorThrown);
        }
    });
}

$(document).ready(function () {
    $.ajax({
        url: '/dashboard/getDailyVisits',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            drawDailyVisitChart(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(textStatus, errorThrown);
        }
    });

    $.ajax({
        url: '/dashboard/getMonthlySales',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            drawMonthlySales(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(textStatus, errorThrown);
        }
    });
    updateProductList();
    setInterval(updateProductList, 90000);
});