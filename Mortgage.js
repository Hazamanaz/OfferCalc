var cashInterest = 0.05;
var mortInterest = 0.035;


$( document ).ready( function(){

    $('#asking').keyup(function(){ DoCalc(); });
    $('#monthlylease').keyup(function(){ DoCalc(); });
    DoCalc();

});

function DoCalc(){

    let asking = $('#asking').val();

    let charges = $('#monthlylease').val();

    asking = parseFloat(asking.replace(/[^0-9]*/g, ''));
    charges = parseFloat(charges.replace(/[^0-9]*/g, ''));

    if ( asking > 0 ){

        $(".section").show();

        var first = WeirdRounding((asking * 1.03) * 0.90) * 1000;

        var best = WeirdRounding((asking * 1.03) * 0.95) * 1000;

        var cashMonthly = parseFloat(MonthlyPaymentCalc((best) - 100000, cashInterest));
     
        var mortMonthly = parseFloat(MonthlyPaymentCalc((best) - 100000, mortInterest));
     
        var equivHousePrice = ReversePaymentCalc((cashMonthly + charges), cashInterest) + 100000;

        $('#asking').html(asking);
        $('#first').html(FormatThousands(first));
        $('#best').html(FormatThousands(best));

        $('#cashMonthly').html(Math.round(cashMonthly));     
        $('#mortMonthly').html(Math.round(mortMonthly));   

        $('#equivHousePrice').html(FormatThousands(equivHousePrice));         

    }
    else{
        $(".section").hide();
    }

    if ( charges > 0 ){
        $("#equivHousePriceCont").show();        
    }
    else{
        $("#equivHousePriceCont").hide();
    }

}

function FormatThousands(number){

    number = Math.round(number / 1000) * 1000;

    number = number.toLocaleString('en-GB'); 

    return(number);
}


function MonthlyPaymentCalc( amount, interest, term = 25){
    
    var r = interest / 12;

    var P = amount;
    
    var n = term * 12;

    var top = r * Math.pow(1 + r, n);

    var bottom = Math.pow(1 + r, n) - 1;

    return P * (top / bottom);

}

function ReversePaymentCalc(monthly, interest, term = 25){

    var r = interest / 12;

    var x = monthly;
    
    var n = term * 12;

    var top = r * Math.pow(1 + r, n);

    var bottom = Math.pow(1 + r, n) - 1;

    
    return x / (top / bottom);
    

}

function WeirdRounding (number){

    number = Math.floor(number).toString();

    var numbers = number.split(''); 

    var obj = {
        '0123': '0',
        '456': '5',
        '78': '8',
        '9': '9'
    };

    $.each(obj, function(i,x){
        if ( i.includes(numbers[numbers.length -1]) ){
            numbers[numbers.length -1] = x;
        }        
    });


    return numbers.join('');
}
