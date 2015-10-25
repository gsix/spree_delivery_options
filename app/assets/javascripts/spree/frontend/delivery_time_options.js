function SpreeDeliveryOptions() {

  var that = this;

  this.initializeDatePicker = function() {

    var dNow = new Date();
    var utcdate= (dNow.getMonth()+ 1) + '/' + dNow.getDate() + '/' + dNow.getFullYear();
     $('#order_delivery_date').text(utcdate);
  };

  this.parseDeliveryOptions = function(deliveryDate) {
    var deliveryTimeGroups = $.parseJSON($('.delivery-time-options').attr("data"));
    var result;

    var baselineTime = moment().format('H:mm');

    var tomorrow = moment().add('days', 1);
    if (moment(deliveryDate, "DD-MM-YYYY").isAfter(tomorrow)) {
      baselineTime = "00:01";
    }

    $.each(deliveryTimeGroups[0], function(index, value) {
      if (baselineTime < index)
        {
          result = value;
          return false;
        }
    });
    return result;
  };

  this.update_delivery_time_options = function() {
    var deliveryDate = $('#order_delivery_date').val();
    var deliveryTimeOptions = this.parseDeliveryOptions(deliveryDate);

    if (deliveryTimeOptions) {
      weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

      var dayOptions = [];

      if (deliveryTimeOptions[deliveryDate]) {
        dayOptions = deliveryTimeOptions[deliveryDate];
      } else {
        var dateParts = deliveryDate.split('/')
        var dayIndex = new Date(dateParts[2], dateParts[1]-1, dateParts[0]).getDay();
        weekday = weekdays[dayIndex];

        dayOptions = deliveryTimeOptions[weekday];
      }
      this.populate_delivery_time(dayOptions);
    }
  };

  this.populate_delivery_time = function(options) {
    if (options && options.length > 0) {
      var selected_delivery_time = $('.selected-delivery-time').attr("data");
      var arLen = options.length;
      var newList = "";
      for ( var i=0, len=arLen; i<len; ++i ){
        if (options[i] == selected_delivery_time) {
          newList = newList + '<option selected=true value="' + options[i] + '">' + options[i]+'</option>';
        } else {
          newList = newList + "<option value='" + options[i] + "'>" + options[i]+'</option>';
        }
      }
      $('#order_delivery_time').html(newList);
    } else {
      $('#order_delivery_time').html("<option>Not available</option>");
    }
  };

}

$(document).ready(function() {
  var deliveryOptions = new SpreeDeliveryOptions();
  deliveryOptions.initializeDatePicker();
});
