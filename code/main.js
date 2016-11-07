$( document ).ready(function() {

    // Business hours used for generating the Pickup Time Intervals
    var businessHours = [
        ['12:00', '16:30'],
        [],
        ['11:00', '19:30'],
        ['11:00', '19:30'],
        ['11:00', '19:30'],
        ['11:00', '22:30'],
        ['11:00', '22:30']
    ];

    // Helper function for getPickupTimeIntervals
    addMinutes = function (date, minutes) {
        return new Date(date.getTime() + minutes * 60000);
    };

    // Method takes in a date and calculates 15 minute increment time slots.
    getPickupTimeIntervals = function (tDay) {
        var t = new Date();
        var d = new Date();
        var endBusinessTime = "";
        var startBusinessTime = "";
        var result = [];
        var firstPass = false;

        // Add Default option
        result.push("");

        // If tDay is specified, initialize d with date
        if (tDay != undefined && tDay != "Invalid Date"  && tDay != null) {
            if (Object.prototype.toString.call(tDay) === '[object Date]') {
                d = tDay;
            } else {
                return result;
            }


        } else {
            console.log(result);
            return result;
        }

        do {
            if (firstPass == false) {
                firstPass = true;
                var day = d.getDay();
                console.log("Day: " + day);
                var today = t.getDay();
                console.log("Today: " + today);
                var businessHoursForD = businessHours[day];
                // If no business hours
                if (businessHoursForD.length == 0) {
                    break;
                }
                startBusinessTime = businessHoursForD[0];
                endBusinessTime = businessHoursForD[1];

                var parsedDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
                var todayDate = new Date(t.getFullYear(), t.getMonth(), t.getDate(), 0, 0, 0);
                var todayTime = new Date(2000, 1, 1, t.getHours(), t.getMinutes(), 0);
                var splitEndTime = endBusinessTime.split(':');
                var endTime = new Date(2000, 1, 1, splitEndTime[0], splitEndTime[1], 0);
                var splitStartTime = startBusinessTime.split(':');
                var startTime = new Date(2000, 1, 1, splitStartTime[0], splitStartTime[1], 0);
                // If we are analyzing today else skip this check
                if (parsedDate.getTime() == todayDate.getTime()) {
                    // Set to T because it holds the time
                    d = new Date(t)
                    if (todayTime.getTime() > endTime.getTime()) {
                        break;
                    }
                    // Increment date one hour from now
                    d = this.addMinutes(d, 60);
                } else {
                    // Set the time to the start of the store
                    var splitTime = startBusinessTime.split(':');
                    d.setHours(splitTime[0]);
                    d.setMinutes(splitTime[1]);
                }
            }

            parsedDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
            var parsedTime = new Date(2000, 1, 1, d.getHours(), d.getMinutes(), 0);
            if (parsedDate.getTime() == todayDate.getTime()) {
                if (parsedTime.getTime() < startTime.getTime()) {
                    var splitTime = startBusinessTime.split(':');
                    d.setHours(splitTime[0]);
                    d.setMinutes(splitTime[1]);
                    continue;
                }
            }

            var m = (((d.getMinutes() + 7.5) / 15 | 0) * 15) % 60;
            var h = ((((d.getMinutes() / 105) + .5) | 0) + d.getHours()) % 24;
            d = new Date(d.getFullYear(), d.getMonth(), d.getDate(), h, m, 0, 0);

            var ampm = h >= 12 ? 'PM' : 'AM';
            h = h % 12;
            h = h ? h : 12;
            var time = ("0" + h).slice(-2) + ":" + ("0" + m).slice(-2) + " " + ampm;
            result.push(time);
            d = this.addMinutes(d, 15);
        }
        while (parsedTime.getTime() < endTime.getTime());

        console.log(result.toString());
        return result;
    };


    // On change event to populate the select statememnt with the getPickupTimeIntervals
    $('#datetimepicker11').on('dp.change', function(e) {
        $("#selectpicker").empty();

        var d = e.date.toDate();
        var results = getPickupTimeIntervals(new Date(d));

        results.forEach(function(result) {
            var option = '<option value="'+ result +'">' + (result == "" ? "Please select pickup time slot" : result) + "</option>";
            $("#selectpicker").append(option);
        });

    });

});