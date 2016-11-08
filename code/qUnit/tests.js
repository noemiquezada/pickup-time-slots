QUnit.test( "equivalence getPickupTimeIntervals()", function(assert) {
    // Weak robust testing
    assert.deepEqual(getPickupTimeIntervals(new Date("11/08/2016")),["", "11:00 AM", "11:15 AM", "11:30 AM", "11:45 AM",
                                                                        "12:00 PM", "12:15 PM", "12:30 PM", "12:45 PM",
                                                                        "01:00 PM", "01:15 PM", "01:30 PM", "01:45 PM",
                                                                        "02:00 PM", "02:15 PM", "02:30 PM", "02:45 PM",
                                                                        "03:00 PM", "03:15 PM", "03:30 PM", "03:45 PM",
                                                                        "04:00 PM", "04:15 PM", "04:30 PM", "04:45 PM",
                                                                        "05:00 PM", "05:15 PM", "05:30 PM", "05:45 PM",
                                                                        "06:00 PM", "06:15 PM", "06:30 PM", "06:45 PM",
                                                                        "07:00 PM", "07:15 PM", "07:30 PM"],
                                                                        "15 mins interval from 11AM-7:30PM");
    assert.deepEqual(getPickupTimeIntervals(new Date("11/-23/2016")), [""], "Negative Day - Day out of Range");
    assert.deepEqual(getPickupTimeIntervals(new Date("11/31/2016")), [""], "November doesn't have 31 days!");
    assert.deepEqual(getPickupTimeIntervals(new Date("-23/08/2016")), [""], "Negative Month - Month out of Range" );
    assert.deepEqual(getPickupTimeIntervals(new Date("23/08/2016")), [""], "Month out of Range" );
    assert.deepEqual(getPickupTimeIntervals(new Date("11/08/9999")), [""], "Year out of Range" );
    assert.deepEqual(getPickupTimeIntervals(new Date("11/08/-23")), [""], "Negative Year - Year out of Range" );
});

QUnit.test( "mutation equivalence getPickupTimeIntervals()", function(assert) {
    // Weak robust testing
    assert.deepEqual(getPickupTimeIntervalsMutated(new Date("11/08/2016")),["", "11:00 AM", "11:15 AM", "11:30 AM", "11:45 AM",
            "12:00 PM", "12:15 PM", "12:30 PM", "12:45 PM",
            "01:00 PM", "01:15 PM", "01:30 PM", "01:45 PM",
            "02:00 PM", "02:15 PM", "02:30 PM", "02:45 PM",
            "03:00 PM", "03:15 PM", "03:30 PM", "03:45 PM",
            "04:00 PM", "04:15 PM", "04:30 PM", "04:45 PM",
            "05:00 PM", "05:15 PM", "05:30 PM", "05:45 PM",
            "06:00 PM", "06:15 PM", "06:30 PM", "06:45 PM",
            "07:00 PM", "07:15 PM", "07:30 PM"],
        "15 mins interval from 11AM-7:30PM");
    assert.deepEqual(getPickupTimeIntervalsMutated(new Date("11/-23/2016")), [""], "Negative Day - Day out of Range");
    assert.deepEqual(getPickupTimeIntervalsMutated(new Date("11/31/2016")), [""], "November doesn't have 31 days!");
    assert.deepEqual(getPickupTimeIntervalsMutated(new Date("-23/08/2016")), [""], "Negative Month - Month out of Range" );
    assert.deepEqual(getPickupTimeIntervalsMutated(new Date("23/08/2016")), [""], "Month out of Range" );
    assert.deepEqual(getPickupTimeIntervalsMutated(new Date("11/08/9999")), [""], "Year out of Range" );
    assert.deepEqual(getPickupTimeIntervalsMutated(new Date("11/08/-23")), [""], "Negative Year - Year out of Range" );
});

QUnit.test( "Cause and Effect getPickupTimeIntervals()", function(assert) {
    // Case and Effect testing
    // The date it is suppose to be
    var x = new Date(2016, 10, 6, 18, 0, 0);
    assert.deepEqual(getPickupTimeIntervalsCauseEffect(new Date("11/06/2016"), x), [""], "Today is Sunday 6pm and I want cookies to pick up today");
    assert.deepEqual(getPickupTimeIntervalsCauseEffect(new Date("11/07/2016"), x), [""], "Today is Sunday 6pm and I want cookies to pick up for Monday");
    assert.deepEqual(getPickupTimeIntervalsCauseEffect(new Date("11/08/2016"), x), [
        "",
        "11:00 AM",
        "11:15 AM",
        "11:30 AM",
        "11:45 AM",
        "12:00 PM",
        "12:15 PM",
        "12:30 PM",
        "12:45 PM",
        "01:00 PM",
        "01:15 PM",
        "01:30 PM",
        "01:45 PM",
        "02:00 PM",
        "02:15 PM",
        "02:30 PM",
        "02:45 PM",
        "03:00 PM",
        "03:15 PM",
        "03:30 PM",
        "03:45 PM",
        "04:00 PM",
        "04:15 PM",
        "04:30 PM",
        "04:45 PM",
        "05:00 PM",
        "05:15 PM",
        "05:30 PM",
        "05:45 PM",
        "06:00 PM",
        "06:15 PM",
        "06:30 PM",
        "06:45 PM",
        "07:00 PM",
        "07:15 PM",
        "07:30 PM"
    ], "Today is Sunday 6pm and I want cookies to pick up for Tuesday");
    x = new Date(2016, 10, 06, 22, 0, 0);
    assert.deepEqual(getPickupTimeIntervalsCauseEffect(new Date("11/06/2016"), x), [""], "Today is Sunday 10pm and I want cookies to pick up today");
    assert.deepEqual(getPickupTimeIntervalsCauseEffect(new Date("11/07/2016"), x), [""], "Today is Sunday 10pm and I want cookies to pick up for Monday");
    assert.deepEqual(getPickupTimeIntervalsCauseEffect(new Date("11/08/2016"), x), ["", "11:00 AM", "11:15 AM", "11:30 AM", "11:45 AM",
        "12:00 PM", "12:15 PM", "12:30 PM", "12:45 PM",
        "01:00 PM", "01:15 PM", "01:30 PM", "01:45 PM",
        "02:00 PM", "02:15 PM", "02:30 PM", "02:45 PM",
        "03:00 PM", "03:15 PM", "03:30 PM", "03:45 PM",
        "04:00 PM", "04:15 PM", "04:30 PM", "04:45 PM",
        "05:00 PM", "05:15 PM", "05:30 PM", "05:45 PM",
        "06:00 PM", "06:15 PM", "06:30 PM", "06:45 PM",
        "07:00 PM", "07:15 PM", "07:30 PM"], "Today is Sunday 10pm and I want cookies to pick up for Tuesday");
});

QUnit.test( "Cause and Effect Mutated getPickupTimeIntervals()", function(assert) {
    // Case and Effect testing
    // The date it is suppose to be
    var x = new Date(2016, 10, 6, 18, 0, 0);
    assert.deepEqual(getPickupTimeIntervalsCauseEffectMutated(new Date("11/06/2016"), x), [""], "Today is Sunday 6pm and I want cookies to pick up today");
    assert.deepEqual(getPickupTimeIntervalsCauseEffectMutated(new Date("11/07/2016"), x), [""], "Today is Sunday 6pm and I want cookies to pick up for Monday");
    assert.deepEqual(getPickupTimeIntervalsCauseEffectMutated(new Date("11/08/2016"), x), [
        "",
        "11:00 AM",
        "11:15 AM",
        "11:30 AM",
        "11:45 AM",
        "12:00 PM",
        "12:15 PM",
        "12:30 PM",
        "12:45 PM",
        "01:00 PM",
        "01:15 PM",
        "01:30 PM",
        "01:45 PM",
        "02:00 PM",
        "02:15 PM",
        "02:30 PM",
        "02:45 PM",
        "03:00 PM",
        "03:15 PM",
        "03:30 PM",
        "03:45 PM",
        "04:00 PM",
        "04:15 PM",
        "04:30 PM",
        "04:45 PM",
        "05:00 PM",
        "05:15 PM",
        "05:30 PM",
        "05:45 PM",
        "06:00 PM",
        "06:15 PM",
        "06:30 PM",
        "06:45 PM",
        "07:00 PM",
        "07:15 PM",
        "07:30 PM"
    ], "Today is Sunday 6pm and I want cookies to pick up for Tuesday");
    x = new Date(2016, 10, 06, 22, 0, 0);
    assert.deepEqual(getPickupTimeIntervalsCauseEffectMutated(new Date("11/06/2016"), x), [""], "Today is Sunday 10pm and I want cookies to pick up today");
    assert.deepEqual(getPickupTimeIntervalsCauseEffectMutated(new Date("11/07/2016"), x), [""], "Today is Sunday 10pm and I want cookies to pick up for Monday");
    assert.deepEqual(getPickupTimeIntervalsCauseEffectMutated(new Date("11/08/2016"), x), ["", "11:00 AM", "11:15 AM", "11:30 AM", "11:45 AM",
        "12:00 PM", "12:15 PM", "12:30 PM", "12:45 PM",
        "01:00 PM", "01:15 PM", "01:30 PM", "01:45 PM",
        "02:00 PM", "02:15 PM", "02:30 PM", "02:45 PM",
        "03:00 PM", "03:15 PM", "03:30 PM", "03:45 PM",
        "04:00 PM", "04:15 PM", "04:30 PM", "04:45 PM",
        "05:00 PM", "05:15 PM", "05:30 PM", "05:45 PM",
        "06:00 PM", "06:15 PM", "06:30 PM", "06:45 PM",
        "07:00 PM", "07:15 PM", "07:30 PM"], "Today is Sunday 10pm and I want cookies to pick up for Tuesday");
});