function GetNewOTP() {
    var $phoneNumberInput = $('input[name="PhoneNumber"]');
    $('#phoneSubmit').prop('disabled', true);
    $('.timer-xs').prop('disabled', true);
    $('.timer-xs').css('cursor', 'not-allowed');
    $.post('/account/sendOtp', { PhoneNumber: $phoneNumberInput.val() }, function (data) {
        $('#phoneSubmit').prop('disabled', false);
        if (data) {
            $('#phoneValidator').hide();
            // change submit button text to "ورود"
            $('#phoneSubmit').text('ورود');
            $('.form-group:eq(0)').hide();
            $('.form-group:eq(1)').show();
            // show timer for 5 minutes
            var countDownDate = new Date().getTime() + 5 * 60 * 1000;
            var x = setInterval(function () {
                var now = new Date().getTime();
                var distance = countDownDate - now;
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                $('.timer-xs').text(minutes + ":" + (seconds < 10 ? "0" : "") + seconds);

                if (distance < 0) {
                    clearInterval(x);
                    $('.timer-xs').text('ارسال مجدد کد');
                    $('.timer-xs').prop('disabled', false);
                    $('.timer-xs').css('cursor', 'pointer');
                }
            }, 1000);
        } else {
            $('#phoneValidator').show();
        }
    });
}
$(document).ready(function () {
    // hide OTP and timer initially
    $('.form-group:eq(1)').hide();
    $('#phoneValidator').hide();

    // handle form submission
    $('#loginWithPhone').on('submit', function (e) {
        e.preventDefault();
        var $phoneNumberInput = $('input[name="PhoneNumber"]');
        var $otpInput = $('input[name="Otp"]');

        // if phone number is entered, send OTP
        if ($phoneNumberInput.val() !== '' && $('#phoneSubmit').text() == 'ارسال کد') {
            GetNewOTP();
        }
        // if OTP is entered, login with phone number
        else if ($otpInput.val() !== '') {
            $.post('/account/loginWithPhoneNumber', { PhoneNumber: $phoneNumberInput.val(), Otp: $otpInput.val() }, function (data) {
                // handle login response
            });
        }
    });

    $('.timer-xs').on('click', function () {
        if ($(this).text() === 'ارسال مجدد کد') {
            GetNewOTP();
        }
    });
}); 